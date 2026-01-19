#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl, query) {
  return new Promise(resolve => rl.question(query, resolve));
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

async function setupWizard() {
  log('\n' + '='.repeat(60), 'cyan');
  log('  🚀 AI Resume Website Template - Setup Wizard', 'cyan');
  log('='.repeat(60), 'cyan');
  log('\nThis wizard will help you configure your AI resume website.', 'blue');
  log('You can always edit config.json and data/resume.json later.\n', 'blue');

  const rl = createInterface();
  const answers = {};

  try {
    // Personal Information
    log('📝 Personal Information\n', 'yellow');

    answers.name = await question(rl, '  Your full name: ');
    while (!answers.name) {
      log('  Name is required!', 'red');
      answers.name = await question(rl, '  Your full name: ');
    }

    answers.title = await question(rl, '  Your job title (e.g., Senior Software Engineer): ');
    while (!answers.title) {
      log('  Job title is required!', 'red');
      answers.title = await question(rl, '  Your job title: ');
    }

    answers.email = await question(rl, '  Your email: ');
    while (!validateEmail(answers.email)) {
      log('  Invalid email format!', 'red');
      answers.email = await question(rl, '  Your email: ');
    }

    answers.phone = await question(rl, '  Your phone number (e.g., +1 234 567 8900): ');
    answers.location = await question(rl, '  Your location (e.g., San Francisco, CA): ');

    // Social Links
    log('\n🔗 Social Links\n', 'yellow');

    answers.linkedin = await question(rl, '  LinkedIn URL (full URL): ');
    while (answers.linkedin && !validateURL(answers.linkedin)) {
      log('  Invalid URL format!', 'red');
      answers.linkedin = await question(rl, '  LinkedIn URL: ');
    }

    answers.github = await question(rl, '  GitHub URL (full URL): ');
    while (answers.github && !validateURL(answers.github)) {
      log('  Invalid URL format!', 'red');
      answers.github = await question(rl, '  GitHub URL: ');
    }

    answers.website = await question(rl, '  Website/Portfolio URL (optional): ');

    // Theme Selection
    log('\n🎨 Theme Selection\n', 'yellow');
    log('  Available themes:', 'blue');
    log('    1. Professional (Teal) - Clean and professional', 'cyan');
    log('    2. Modern (Blue) - Bold and contemporary', 'cyan');
    log('    3. Minimal (B&W) - Simple and elegant', 'cyan');
    log('    4. Creative (Pink) - Vibrant and creative', 'cyan');

    const themeChoice = await question(rl, '\n  Choose theme (1-4) [1]: ');
    const themeMap = { '1': 'professional', '2': 'modern', '3': 'minimal', '4': 'creative' };
    answers.theme = themeMap[themeChoice] || 'professional';

    // Features
    log('\n⚙️  Features\n', 'yellow');

    const enableChat = await question(rl, '  Enable AI Chat feature? (y/n) [y]: ');
    answers.enableChat = !enableChat || enableChat.toLowerCase() !== 'n';

    const enableJobFit = await question(rl, '  Enable Job Fit Assessment? (y/n) [y]: ');
    answers.enableJobFit = !enableJobFit || enableJobFit.toLowerCase() !== 'n';

    const enableMultilingual = await question(rl, '  Enable multilingual support? (y/n) [n]: ');
    answers.enableMultilingual = enableMultilingual.toLowerCase() === 'y';

    // AI Provider Selection
    if (answers.enableChat || answers.enableJobFit) {
      log('\n🤖 AI Provider Selection\n', 'yellow');
      log('  Choose an AI provider for chatbot functionality:', 'blue');
      log('    1. Groq (Recommended) - Free, fast, good quality', 'cyan');
      log('    2. OpenAI - Best quality, paid ($5 free credit)', 'cyan');
      log('    3. Google Gemini - Free tier, good quality', 'cyan');
      log('    4. Anthropic Claude - Excellent quality, paid', 'cyan');
      log('    5. Other (configure manually later)', 'cyan');

      const providerChoice = await question(rl, '\n  Choose provider (1-5) [1]: ');
      const providerMap = {
        '1': 'groq',
        '2': 'openai',
        '3': 'google',
        '4': 'anthropic',
        '5': 'other'
      };
      answers.aiProvider = providerMap[providerChoice] || 'groq';

      // Get appropriate API key
      log('\n🔑 API Configuration\n', 'yellow');

      if (answers.aiProvider === 'groq') {
        log('  Get your free Groq API key at: https://console.groq.com', 'blue');
        answers.apiKey = await question(rl, '  Groq API Key (leave empty to configure later): ');
      } else if (answers.aiProvider === 'openai') {
        log('  Get your OpenAI API key at: https://platform.openai.com', 'blue');
        answers.apiKey = await question(rl, '  OpenAI API Key (leave empty to configure later): ');
      } else if (answers.aiProvider === 'google') {
        log('  Get your free Google API key at: https://makersuite.google.com/app/apikey', 'blue');
        answers.apiKey = await question(rl, '  Google API Key (leave empty to configure later): ');
      } else if (answers.aiProvider === 'anthropic') {
        log('  Get your Anthropic API key at: https://console.anthropic.com', 'blue');
        answers.apiKey = await question(rl, '  Anthropic API Key (leave empty to configure later): ');
      } else {
        log('  Configure your AI provider manually in backend/.env', 'blue');
        answers.apiKey = '';
      }
    }

    // Domain (optional)
    log('\n🌐 Domain (optional)\n', 'yellow');
    answers.domain = await question(rl, '  Your custom domain (leave empty for localhost): ');

    rl.close();

    // Generate configuration files
    log('\n📦 Generating configuration files...\n', 'cyan');

    generateConfigFiles(answers);

    log('✅ Setup complete!\n', 'green');
    log('Next steps:', 'yellow');
    log('  1. Edit data/resume.json with your work experience and skills', 'blue');
    log('  2. Run "npm install" to install dependencies', 'blue');
    log('  3. Run "npm run dev" to start the development server', 'blue');
    log('  4. Visit http://localhost:5173 to see your resume\n', 'blue');

    if (!answers.apiKey && answers.aiProvider && answers.aiProvider !== 'other') {
      const providerNames = {
        groq: 'Groq',
        openai: 'OpenAI',
        google: 'Google',
        anthropic: 'Anthropic'
      };
      log(`⚠️  Remember to add your ${providerNames[answers.aiProvider]} API key to backend/.env`, 'yellow');
      log(`   See .env.example for configuration details\n`, 'yellow');
    }

  } catch (error) {
    rl.close();
    log(`\n❌ Setup failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

function generateConfigFiles(answers) {
  // Generate config.json
  const config = {
    site: {
      name: answers.name,
      title: `${answers.name} - ${answers.title}`,
      domain: answers.domain || 'http://localhost:5173',
      description: `Professional resume and portfolio of ${answers.name}, ${answers.title}`,
      language: 'en',
      ogImage: '/og-image.png',
      favicon: '/favicon.ico',
    },
    contact: {
      email: answers.email,
      phone: answers.phone,
      location: answers.location,
      linkedin: answers.linkedin,
      github: answers.github,
    },
    theme: answers.theme,
    features: {
      enableChat: answers.enableChat,
      enableJobFit: answers.enableJobFit,
      enableMultilingual: answers.enableMultilingual,
      enableResumePDF: false,
    },
    branding: getThemeBranding(answers.theme),
    languages: {
      default: 'en',
      supported: answers.enableMultilingual ? ['en', 'ru'] : ['en'],
      enableLanguageSwitcher: answers.enableMultilingual,
    },
    ai: {
      provider: answers.aiProvider || 'groq',
      model: getDefaultModel(answers.aiProvider || 'groq'),
      temperature: 0.7,
      maxTokens: 1024,
    },
    deployment: {
      platform: 'render',
      autoScale: false,
      region: 'oregon',
    },
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'config.json'),
    JSON.stringify(config, null, 2)
  );
  log('  ✓ Created config.json', 'green');

  // Update resume.json with personal info
  const resumePath = path.join(process.cwd(), 'data', 'resume.json');
  if (fs.existsSync(resumePath)) {
    const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
    resume.personalInfo = {
      name: answers.name,
      title: answers.title,
      location: answers.location,
      phone: answers.phone,
      email: answers.email,
      linkedin: answers.linkedin,
      github: answers.github,
      website: answers.website || answers.domain,
    };
    fs.writeFileSync(resumePath, JSON.stringify(resume, null, 2));
    log('  ✓ Updated data/resume.json', 'green');
  }

  // Create backend .env if API key provided
  if (answers.apiKey && answers.aiProvider) {
    const backendDir = path.join(process.cwd(), 'backend');
    if (!fs.existsSync(backendDir)) {
      fs.mkdirSync(backendDir, { recursive: true });
    }

    let envContent = `# AI Service Configuration (works for all providers)\n`;

    // Use generic AI_API_KEY
    envContent += `AI_API_KEY=${answers.apiKey}\n`;
    envContent += `AI_PROVIDER=${answers.aiProvider}
AI_MODEL=${getDefaultModel(answers.aiProvider)}

# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
`;

    fs.writeFileSync(path.join(backendDir, '.env'), envContent);
    log('  ✓ Created backend/.env', 'green');
  }

  // Create frontend .env
  const frontendDir = path.join(process.cwd(), 'frontend');
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  const frontendEnvContent = `# API Configuration
VITE_API_URL=http://localhost:3001
`;

  fs.writeFileSync(path.join(frontendDir, '.env'), frontendEnvContent);
  log('  ✓ Created frontend/.env', 'green');
}

function getDefaultModel(provider) {
  const models = {
    groq: 'llama-3.3-70b-versatile',
    openai: 'gpt-4o-mini',
    google: 'gemini-1.5-flash',
    anthropic: 'claude-3-5-sonnet-20241022',
    other: 'default',
  };
  return models[provider] || models.groq;
}

function getThemeBranding(themeName) {
  const themes = {
    professional: {
      primaryColor: '#14b8a6',
      accentColor: '#0d9488',
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    modern: {
      primaryColor: '#3b82f6',
      accentColor: '#2563eb',
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    minimal: {
      primaryColor: '#000000',
      accentColor: '#525252',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      fontFamily: 'system-ui, sans-serif',
    },
    creative: {
      primaryColor: '#ec4899',
      accentColor: '#db2777',
      backgroundColor: '#1e1b4b',
      textColor: '#faf5ff',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  };

  return themes[themeName] || themes.professional;
}

// Run setup
if (require.main === module) {
  setupWizard();
}

module.exports = { setupWizard };
