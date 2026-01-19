#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validatePhone(phone) {
  // Basic international phone validation
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function checkPlaceholderValue(value, fieldName) {
  const placeholders = [
    'your name',
    'your professional title',
    'yourdomain.com',
    'you@example.com',
    'yourprofile',
    'yourusername',
    'city, country',
    '+1 234 567 8900',
    'job title',
    'company name',
  ];

  const lowerValue = String(value).toLowerCase();
  return placeholders.some(placeholder => lowerValue.includes(placeholder));
}

function validateConfig() {
  const errors = [];
  const warnings = [];

  log('\n🔍 Validating configuration files...\n', 'cyan');

  // Check if config.json exists
  const configPath = path.join(process.cwd(), 'config.json');
  if (!fs.existsSync(configPath)) {
    errors.push('config.json not found. Run "npm run setup" to create it.');
    return { errors, warnings };
  }

  // Load config
  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    errors.push(`Failed to parse config.json: ${e.message}`);
    return { errors, warnings };
  }

  // Validate site configuration
  if (checkPlaceholderValue(config.site?.name, 'name')) {
    errors.push('Site name is still a placeholder value in config.json');
  }

  if (checkPlaceholderValue(config.site?.title, 'title')) {
    warnings.push('Site title appears to be a placeholder value');
  }

  if (checkPlaceholderValue(config.site?.domain, 'domain')) {
    warnings.push('Domain is still a placeholder value');
  }

  // Validate contact information
  if (config.contact) {
    if (!validateEmail(config.contact.email)) {
      errors.push(`Invalid email format: ${config.contact.email}`);
    } else if (checkPlaceholderValue(config.contact.email, 'email')) {
      errors.push('Email is still a placeholder value');
    }

    if (!validateURL(config.contact.linkedin)) {
      errors.push('Invalid LinkedIn URL');
    } else if (checkPlaceholderValue(config.contact.linkedin, 'linkedin')) {
      warnings.push('LinkedIn URL is still a placeholder value');
    }

    if (!validateURL(config.contact.github)) {
      errors.push('Invalid GitHub URL');
    } else if (checkPlaceholderValue(config.contact.github, 'github')) {
      warnings.push('GitHub URL is still a placeholder value');
    }

    if (!validatePhone(config.contact.phone)) {
      errors.push('Invalid phone number format');
    } else if (checkPlaceholderValue(config.contact.phone, 'phone')) {
      warnings.push('Phone number is still a placeholder value');
    }
  }

  // Validate theme
  const validThemes = ['professional', 'modern', 'minimal', 'creative'];
  if (!validThemes.includes(config.theme)) {
    errors.push(`Invalid theme "${config.theme}". Must be one of: ${validThemes.join(', ')}`);
  } else {
    const themePath = path.join(process.cwd(), 'themes', `${config.theme}.json`);
    if (!fs.existsSync(themePath)) {
      errors.push(`Theme file not found: themes/${config.theme}.json`);
    }
  }

  // Check resume data
  const resumePath = path.join(process.cwd(), 'data', 'resume.json');
  if (!fs.existsSync(resumePath)) {
    errors.push('data/resume.json not found');
  } else {
    try {
      const resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'));

      if (checkPlaceholderValue(resumeData.personalInfo?.name, 'name')) {
        errors.push('Resume name is still a placeholder value in data/resume.json');
      }

      if (!resumeData.experience || resumeData.experience.length === 0) {
        warnings.push('No work experience entries found in resume data');
      }

      if (!resumeData.skills || Object.keys(resumeData.skills).length === 0) {
        warnings.push('No skills found in resume data');
      }

      if (!resumeData.summary || checkPlaceholderValue(resumeData.summary, 'summary')) {
        warnings.push('Professional summary is missing or is a placeholder');
      }
    } catch (e) {
      errors.push(`Failed to parse data/resume.json: ${e.message}`);
    }
  }

  // Check .env files
  const backendEnvPath = path.join(process.cwd(), 'backend', '.env');
  const frontendEnvPath = path.join(process.cwd(), 'frontend', '.env');

  if (fs.existsSync(backendEnvPath)) {
    const envContent = fs.readFileSync(backendEnvPath, 'utf8');

    // Check for AI_API_KEY (generic) or any provider-specific key
    const hasGenericKey = envContent.includes('AI_API_KEY=') && !envContent.includes('AI_API_KEY=your-');
    const hasProviderKey =
      (envContent.includes('GROQ_API_KEY=') && !envContent.includes('GROQ_API_KEY=your-')) ||
      (envContent.includes('OPENAI_API_KEY=') && !envContent.includes('OPENAI_API_KEY=sk-your-')) ||
      (envContent.includes('GOOGLE_API_KEY=') && !envContent.includes('GOOGLE_API_KEY=your-')) ||
      (envContent.includes('ANTHROPIC_API_KEY=') && !envContent.includes('ANTHROPIC_API_KEY=sk-ant-'));

    if (!hasGenericKey && !hasProviderKey) {
      warnings.push('AI_API_KEY (or provider-specific key) not configured in backend/.env');
    }
  } else {
    warnings.push('backend/.env file not found');
  }

  return { errors, warnings };
}

function main() {
  log('='.repeat(60), 'cyan');
  log('  AI Resume Template - Configuration Validator', 'cyan');
  log('='.repeat(60), 'cyan');

  const { errors, warnings } = validateConfig();

  // Display results
  if (errors.length === 0 && warnings.length === 0) {
    log('\n✅ All validations passed!', 'green');
    log('Your configuration looks good.\n', 'green');
    process.exit(0);
  }

  if (errors.length > 0) {
    log('\n❌ Validation Errors:\n', 'red');
    errors.forEach((error, i) => {
      log(`  ${i + 1}. ${error}`, 'red');
    });
  }

  if (warnings.length > 0) {
    log('\n⚠️  Warnings:\n', 'yellow');
    warnings.forEach((warning, i) => {
      log(`  ${i + 1}. ${warning}`, 'yellow');
    });
  }

  if (errors.length > 0) {
    log('\n❌ Validation failed. Please fix the errors above.\n', 'red');
    log('Run "npm run setup" to configure your site.\n', 'blue');
    process.exit(1);
  } else {
    log('\n✅ No critical errors found.', 'green');
    log('⚠️  However, there are some warnings to address.\n', 'yellow');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateConfig, validateEmail, validateURL, validatePhone };
