# Plan: Productize AI Resume Website as Reusable Template

## Goal

Transform the personal AI resume website into a template that anyone can clone from GitHub, customize with their own data, and deploy their own AI-powered resume website.

## Current State Analysis

### Resume Data Locations
- **Frontend**: TypeScript files (`resume.en.ts`, `resume.ru.ts`) with full structured data
- **Backend**: Markdown file (`resume.md`) parsed for AI context
- **Components**: About, Experience, Skills, Education, Footer consume resume data
- **AI Service**: System prompts reference hardcoded name "Alexander Kirillov"

### Hardcoded Personal Information
- Name in multiple files (resume, HTML meta tags, AI prompts, package.json)
- Contact info (email, phone, location) in resume data files
- Social links (LinkedIn, GitHub) in resume data
- Domain URLs in index.html meta tags (`alex-kirillov.gotdns.ch`)
- OG image with personal information

### Configuration
- Environment variables: GROQ_API_KEY, VITE_API_URL, CORS_ORIGIN, PORT, NODE_ENV
- Some hardcoded: ports (5173, 3001), rate limits, session timeout
- i18n configured for English/Russian
- render.yaml for deployment

## Recommended Approach: Hybrid Configuration Strategy

Combine multiple strategies for maximum flexibility:

1. **User Data in JSON** - Easy to edit, validate, version control
2. **Secrets in .env** - Secure, standard practice
3. **Optional Setup Wizard** - Guides new users, validates data
4. **Direct File Editing** - For experienced developers

### Why This Approach?
- Serves both novice users (wizard) and experienced developers (manual editing)
- Keeps sensitive data separate from content
- Easy to validate and test
- Familiar patterns (JSON, .env files)

## Implementation Plan

### Phase 1: Create Configuration Files

**1.1 Configuration Schema (`/config.schema.json`)**

Create central configuration for site metadata and branding:

```json
{
  "siteConfig": {
    "domain": "https://yourdomain.com",
    "title": "Your Name - Professional Title",
    "description": "Your professional summary...",
    "ogImage": "/og-image.png",
    "favicon": "/favicon.ico"
  },
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Job Title",
    "location": "City, Country",
    "phone": "+1 234 567 8900",
    "email": "you@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "languages": {
    "default": "en",
    "supported": ["en", "ru"],
    "enableMultilingual": true
  },
  "features": {
    "enableChat": true,
    "enableJobFit": true,
    "enableResumePDF": false
  },
  "branding": {
    "primaryColor": "#14b8a6",
    "accentColor": "#0d9488",
    "fontFamily": "Inter, system-ui, sans-serif"
  }
}
```

**1.2 Resume Data Template (`/data/resume-data.json`)**

Externalize all resume content:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "location": "City, Country",
    "phone": "+1 234 567 8900",
    "email": "you@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "summary": "Your professional summary here...",
  "highlights": [
    "First key highlight",
    "Second key highlight"
  ],
  "skills": {
    "categoryOne": ["Skill 1", "Skill 2"],
    "categoryTwo": ["Skill 3", "Skill 4"]
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, Country",
      "startDate": "Month Year",
      "endDate": "Month Year or Present",
      "current": false,
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ],
  "education": [],
  "certifications": [],
  "languages": [],
  "patents": []
}
```

**1.3 Translations Template (`/data/translations.json`)**

Customizable UI strings for multilingual support:

```json
{
  "en": {
    "hero": {
      "statusBadge": "Available for Hire",
      "greeting": "Hi, I'm",
      "subtitle": "Your tagline here"
    },
    "nav": {
      "about": "About",
      "experience": "Experience"
    }
  },
  "ru": {
    "hero": {
      "statusBadge": "Открыт к предложениям",
      "greeting": "Привет, я"
    }
  }
}
```

### Phase 2: Refactor Code to Use Configuration

**2.1 Configuration Loader (`/frontend/src/config/siteConfig.ts`)**

```typescript
import siteConfig from '../../../config.schema.json'
import resumeData from '../../../data/resume-data.json'

export const getSiteConfig = () => siteConfig
export const getResumeData = () => resumeData

export const validateConfig = () => {
  // Validate required fields
  // Return validation errors if any
}
```

**2.2 Update Resume Data Loading**

Modify `/frontend/src/data/resume.ts` to load from JSON instead of TypeScript files.

**2.3 Update Components**

Modify these components to use configuration:
- `/frontend/src/components/Hero.tsx` - Use `config.personalInfo.name`
- `/frontend/src/components/Footer.tsx` - Use config for contact info
- `/frontend/index.html` - Template with build-time variable replacement

**2.4 Parameterize AI System Prompts**

Modify `/backend/src/config/gemini.ts`:

```typescript
import siteConfig from '../../../config.schema.json'

const CANDIDATE_NAME = siteConfig.personalInfo.name

export const SYSTEM_PROMPTS = {
  general: (resumeContext: string, isRussian: boolean) => {
    return `You are an AI assistant helping visitors learn about ${CANDIDATE_NAME}'s professional experience...`
  }
}
```

**2.5 Update Backend Resume Parser**

Modify `/backend/src/services/resumeParser.ts` to load from JSON config instead of markdown (or keep markdown as alternative format).

### Phase 3: Create Setup Wizard

**3.1 Interactive Setup Script (`/scripts/setup.js`)**

Node.js CLI tool using inquirer for interactive prompts:

```javascript
const inquirer = require('inquirer')
const fs = require('fs')

async function setup() {
  console.log('Welcome to AI Resume Website Setup!\n')

  // Step 1: Personal Information
  const personal = await inquirer.prompt([
    { name: 'name', message: 'Your full name:' },
    { name: 'title', message: 'Your job title:' },
    { name: 'email', message: 'Your email:', validate: validateEmail },
    { name: 'linkedin', message: 'LinkedIn URL:' },
    { name: 'github', message: 'GitHub URL:' }
  ])

  // Step 2: Language Settings
  const languages = await inquirer.prompt([
    {
      type: 'list',
      name: 'default',
      message: 'Primary language:',
      choices: ['English', 'Russian', 'Both']
    }
  ])

  // Step 3: Features
  const features = await inquirer.prompt([
    { type: 'confirm', name: 'enableChat', message: 'Enable AI Chat?', default: true },
    { type: 'confirm', name: 'enableJobFit', message: 'Enable Job Fit Assessment?', default: true }
  ])

  // Step 4: API Key
  const api = await inquirer.prompt([
    { type: 'password', name: 'groqKey', message: 'Groq API Key:' }
  ])

  // Generate configuration files
  generateConfig({ personal, languages, features, api })

  console.log('\n✓ Configuration complete! Run "npm run dev" to start.')
}
```

**3.2 Wizard Features**

- Validate email format, URLs, phone numbers
- Check for placeholder values still in config
- Create `.env` files from templates
- Generate `config.schema.json` and `resume-data.json`
- Optional: Generate OG image with user's name
- Test API key validity

**3.3 Add NPM Scripts**

Update root `package.json`:

```json
{
  "scripts": {
    "setup": "node scripts/setup.js",
    "setup:quick": "node scripts/setup.js --quick",
    "validate": "node scripts/validate-config.js",
    "dev": "npm run validate && concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\"",
    "build": "npm run validate && cd frontend && npm run build && cd ../backend && npm run build"
  }
}
```

### Phase 4: Documentation Updates

**4.1 Update README.md**

Complete rewrite for template users:

```markdown
# AI Resume Website Template

## Quick Start (5 minutes)

1. Clone this repository
2. Run setup: `npm run setup`
3. Follow the prompts
4. Start dev server: `npm run dev`
5. Visit http://localhost:5173

## Manual Setup

For experienced developers who prefer direct editing:

1. Copy `config.schema.template.json` to `config.schema.json`
2. Copy `data/resume-data.template.json` to `data/resume-data.json`
3. Edit files with your information
4. Configure `.env` files in frontend/ and backend/
5. Run `npm run install-all && npm run dev`

## Configuration Files

- `config.schema.json` - Site metadata, branding, features
- `data/resume-data.json` - Your resume content
- `data/translations.json` - UI text (optional)
- `backend/.env` - API keys and secrets
- `frontend/.env` - Frontend configuration

## Features

- ✅ AI chatbot (answers questions about your experience)
- ✅ Job fit assessment
- ✅ Bilingual support (optional)
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Free tier deployment ready

## Deployment

See [docs/DEPLOYMENT-GUIDE.md](./docs/DEPLOYMENT-GUIDE.md)

Quick deploy to Render.com:
1. Push to GitHub
2. Sign up at Render.com
3. Connect repository
4. Set environment variables
5. Deploy!
```

**4.2 Create Setup Guide (`/docs/SETUP-GUIDE.md`)**

Detailed explanation of:
- Each configuration option
- Resume data structure
- Multilingual setup
- Branding customization
- Common issues and solutions

**4.3 Create Example Configurations (`/examples/`)**

Provide templates for different roles:
- `software-engineer.json`
- `product-manager.json`
- `designer.json`
- `multilingual-example.json`

**4.4 Update Deployment Guide**

Create platform-specific guides:
- Render.com (current setup)
- Vercel
- Netlify
- Railway
- Self-hosted Docker

### Phase 5: Validation and Testing

**5.1 Configuration Validator (`/scripts/validate-config.js`)**

```javascript
function validateConfig() {
  const config = require('../config.schema.json')
  const resumeData = require('../data/resume-data.json')

  const errors = []

  // Check for placeholder values
  if (config.personalInfo.name === 'Your Name') {
    errors.push('Name is still placeholder value')
  }

  // Validate email format
  if (!isValidEmail(config.personalInfo.email)) {
    errors.push('Invalid email format')
  }

  // Validate URLs
  if (!isValidURL(config.personalInfo.linkedin)) {
    errors.push('Invalid LinkedIn URL')
  }

  // Check required resume fields
  if (!resumeData.experience || resumeData.experience.length === 0) {
    errors.push('No experience entries found')
  }

  return errors
}
```

**5.2 Pre-build Validation**

Add validation to build scripts to prevent deploying with placeholder data.

**5.3 Testing Checklist (`/docs/TESTING-CHECKLIST.md`)**

- [ ] All personal data displays correctly
- [ ] AI chat uses correct name
- [ ] Job fit assessment works
- [ ] Languages switch properly (if enabled)
- [ ] Contact links work
- [ ] Meta tags are correct
- [ ] OG image displays on LinkedIn/Twitter
- [ ] Mobile responsive
- [ ] No placeholder data visible

### Phase 6: Asset Management

**6.1 Asset Templates (`/assets/templates/`)**

Provide templates for:
- OG image (Photoshop, Figma, Canva)
- Favicon generator
- Logo guidelines

**6.2 Asset Generator Script (Optional)**

Create `/scripts/generate-og-image.js`:
- Auto-generate OG image from config
- Use user's name and title
- Match branding colors
- Output to `frontend/public/og-image.png`

**6.3 Asset Guide (`/docs/ASSET-GUIDE.md`)**

Documentation for:
- OG image specs (1200x630px)
- Favicon requirements
- Logo creation
- Color palette selection

## Migration Strategy

### Extract Current Data

Create `/scripts/extract-data.js` to generate config files from existing hardcoded data:

1. Parse existing `resume.en.ts` and `resume.ru.ts`
2. Extract personal info from multiple locations
3. Generate `config.schema.json` with current values
4. Generate `resume-data.json` with resume content
5. Create backup of original files

### Refactor Process

1. Create new branch: `git checkout -b productize`
2. Run extraction: `node scripts/extract-data.js`
3. Refactor components one by one
4. Test after each change
5. Verify AI prompts work correctly
6. Create template version with placeholders

### Release Template

1. Replace personal data with placeholders
2. Add example configurations
3. Write comprehensive documentation
4. Create demo site with example data
5. Record setup video walkthrough
6. Publish to GitHub as template repository

## Critical Files to Modify

- **Frontend**:
  - `/frontend/src/data/resume.ts` - Change to load from JSON
  - `/frontend/src/data/resume.en.ts` - Remove (data moves to JSON)
  - `/frontend/src/data/resume.ru.ts` - Remove (data moves to JSON)
  - `/frontend/src/components/Hero.tsx` - Use config for personal info
  - `/frontend/src/components/Footer.tsx` - Use config for contact
  - `/frontend/index.html` - Template with build-time replacement
  - `/frontend/src/i18n/config.ts` - Load from translations.json

- **Backend**:
  - `/backend/src/config/gemini.ts` - Parameterize prompts with config name
  - `/backend/src/services/resumeParser.ts` - Load from JSON or keep markdown option
  - `/backend/src/data/resume.md` - Optional: keep as alternative format

- **Configuration**:
  - Create `/config.schema.json` - Central site configuration
  - Create `/data/resume-data.json` - Resume content
  - Create `/data/translations.json` - UI strings
  - Update `render.yaml` - Template with placeholders

- **Scripts**:
  - Create `/scripts/setup.js` - Interactive setup wizard
  - Create `/scripts/validate-config.js` - Configuration validator
  - Create `/scripts/extract-data.js` - Extract from existing code

- **Documentation**:
  - Update `/README.md` - Template-focused instructions
  - Create `/docs/SETUP-GUIDE.md` - Detailed configuration guide
  - Create `/docs/DEPLOYMENT-GUIDE.md` - Platform-specific deployment
  - Create `/docs/ASSET-GUIDE.md` - Asset creation instructions
  - Create `/examples/` - Example configurations

## Design Decisions & Trade-offs

### Configuration Format: JSON vs YAML vs TypeScript

**Chosen: JSON**
- ✅ Easy to edit for non-technical users
- ✅ Wide tool support (validators, editors)
- ✅ No compilation required
- ✅ Native JavaScript parsing
- ❌ No comments support
- ❌ Can be verbose

**Alternatives Considered:**
- YAML: More readable but requires parsing library
- TypeScript: Type-safe but requires compilation step
- TOML: Good for config but less common

### Setup Flow: Wizard vs Manual vs Hybrid

**Chosen: Hybrid (wizard + manual)**
- ✅ Serves both beginners and experts
- ✅ Optional automation
- ✅ Can skip wizard for direct editing
- ❌ More code to maintain

**Why:** Different skill levels need different approaches. Beginners benefit from guided setup, while experienced developers prefer direct file editing.

### Multilingual: Required vs Optional

**Chosen: Optional bilingual support**
- ✅ Supports single language (simpler)
- ✅ Supports dual language (current functionality)
- ✅ Maintains flexibility
- ❌ More complex configuration

**Why:** Most users need English only, but international users benefit from bilingual support.

### Data Storage: JSON file vs Database vs CMS

**Chosen: JSON file**
- ✅ Simple, portable, version-controllable
- ✅ No server setup required
- ✅ Works with static hosting
- ❌ Manual editing required
- ❌ No rich text formatting

**Alternatives:**
- Database: Overkill for static data
- CMS (Sanity.io): Too complex for simple use case
- Markdown: Better for long text but harder to parse

**Future Enhancement:** Could add optional CMS integration for non-technical users.

## Verification Steps

### Automated Tests

1. Run configuration validator: `npm run validate`
2. Check for placeholder values in config
3. Verify required fields are present
4. Validate email, URL, phone formats
5. Test JSON schema compliance

### Manual Testing

1. Clone fresh repository
2. Run setup wizard with test data
3. Verify generated config files
4. Start development server
5. Check all pages render correctly
6. Test AI chat with new name
7. Test job fit assessment
8. Verify language switching (if enabled)
9. Check meta tags in page source
10. Test social media preview (LinkedIn Post Inspector)
11. Build for production
12. Deploy to test environment
13. Verify deployment works correctly

### User Acceptance Testing

1. Have non-technical user run setup
2. Time setup process (should be <10 minutes)
3. Collect feedback on clarity
4. Identify pain points
5. Improve documentation based on feedback

## Success Criteria

- [ ] Setup completes in under 10 minutes
- [ ] All personal data configurable without code changes
- [ ] Validation catches common errors
- [ ] Documentation clear for beginners
- [ ] AI chat works with new name
- [ ] Multilingual support optional but working
- [ ] Deployment guides for multiple platforms
- [ ] Example configurations for common roles
- [ ] No hardcoded personal data in template
- [ ] GitHub template repository created
- [ ] Demo site deployed with example data
- [ ] Video walkthrough recorded

## User Preferences - CONFIRMED

1. **Multilingual**: English-only default, bilingual as opt-in
2. **Resume Format**: JSON only (simpler, easier to validate)
3. **Setup Wizard**: CLI + Web UI (both options)
4. **Initial Features**: Custom themes (multiple color schemes)
5. **Repository Strategy**: Create NEW template repository (keep current site intact)

## Revised Strategy: New Template Repository

**Key Insight**: Instead of refactoring the current personal site, create a fresh template repository using the current site as reference. This approach:

- ✅ Keeps your personal site unchanged and stable
- ✅ Allows clean template structure from scratch
- ✅ Uses current site as reference/example
- ✅ Can apply best practices without migration concerns
- ✅ Template can be more opinionated and streamlined

### Repository Structure

**Current Repository** (alex-kirillov CV site):
- Remains your personal site
- No changes needed
- Serves as live example

**New Repository** (ai-resume-template):
- Fresh codebase designed as template
- Pre-built with configuration system
- Placeholder data by default
- Setup wizard included
- Documentation for template users
- Published as GitHub template

## Revised Implementation Plan

### Phase 1: Create New Template Repository

**1.1 Initialize Template Project**

Create new repository: `ai-resume-template`

```
ai-resume-template/
├── config.json              # Central configuration
├── data/
│   ├── resume.json         # Resume data
│   └── translations.json   # UI strings (optional)
├── frontend/               # React + Vite
├── backend/                # Express + AI
├── scripts/
│   ├── setup-cli.js       # CLI wizard
│   ├── setup-web/         # Web UI for setup
│   └── validate.js        # Config validator
├── docs/                   # Comprehensive guides
├── examples/               # Example configs
└── themes/                 # Pre-built themes
```

**1.2 Copy and Refactor Code**

Start from your current codebase but refactor for template use:

1. Copy frontend and backend code
2. Remove personal data immediately
3. Add configuration system from start
4. Implement theme system
5. Add validation layer
6. Create setup wizards

**1.3 Configuration System (Built-in from Start)**

`/config.json`:
```json
{
  "site": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "domain": "https://yourdomain.com",
    "language": "en"
  },
  "contact": {
    "email": "you@example.com",
    "phone": "+1 234 567 8900",
    "location": "City, Country",
    "linkedin": "linkedin.com/in/yourprofile",
    "github": "github.com/yourusername"
  },
  "theme": "professional",
  "features": {
    "enableChat": true,
    "enableJobFit": true,
    "enableMultilingual": false
  }
}
```

### Phase 2: Theme System

**2.1 Pre-built Themes**

Create `/themes/` directory:

```typescript
// themes/professional.ts
export const professional = {
  name: 'Professional',
  colors: {
    primary: '#14b8a6',      // Teal (current)
    accent: '#0d9488',
    background: '#0a0a0a',
    text: '#ffffff'
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter'
  }
}

// themes/modern.ts
export const modern = {
  name: 'Modern',
  colors: {
    primary: '#3b82f6',      // Blue
    accent: '#2563eb',
    background: '#0f172a',
    text: '#f8fafc'
  }
}

// themes/minimal.ts
export const minimal = {
  name: 'Minimal',
  colors: {
    primary: '#000000',      // Black & White
    accent: '#525252',
    background: '#ffffff',
    text: '#000000'
  }
}

// themes/creative.ts
export const creative = {
  name: 'Creative',
  colors: {
    primary: '#ec4899',      // Pink
    accent: '#db2777',
    background: '#1e1b4b',
    text: '#faf5ff'
  }
}
```

**2.2 Theme Loader**

```typescript
// frontend/src/styles/themeLoader.ts
import { professional } from '../../themes/professional'
import { modern } from '../../themes/modern'
import { minimal } from '../../themes/minimal'
import { creative } from '../../themes/creative'
import config from '../../config.json'

const themes = { professional, modern, minimal, creative }

export const loadTheme = () => {
  const selectedTheme = themes[config.theme] || themes.professional

  // Apply CSS variables
  document.documentElement.style.setProperty('--color-primary', selectedTheme.colors.primary)
  document.documentElement.style.setProperty('--color-accent', selectedTheme.colors.accent)
  // ... apply other theme variables
}
```

### Phase 3: Dual Setup Wizards

**3.1 CLI Wizard (`scripts/setup-cli.js`)**

Interactive terminal-based setup:

```javascript
const inquirer = require('inquirer')
const fs = require('fs')

async function cliSetup() {
  console.log('🚀 AI Resume Template Setup\n')

  const answers = await inquirer.prompt([
    { name: 'name', message: 'Your full name:' },
    { name: 'title', message: 'Job title:' },
    { name: 'email', message: 'Email:', validate: validateEmail },
    {
      type: 'list',
      name: 'theme',
      message: 'Choose a theme:',
      choices: ['Professional (Teal)', 'Modern (Blue)', 'Minimal (B&W)', 'Creative (Pink)']
    },
    { type: 'confirm', name: 'enableChat', message: 'Enable AI Chat?', default: true },
    { type: 'password', name: 'groqKey', message: 'Groq API Key:' }
  ])

  generateConfig(answers)
  console.log('\n✓ Setup complete! Run "npm run dev"')
}
```

**3.2 Web UI (`scripts/setup-web/`)**

Browser-based setup wizard:

```
scripts/setup-web/
├── index.html              # Setup UI
├── setup.css               # Styling
├── setup.js                # Logic
└── server.js               # Local server
```

Run with: `npm run setup:web` opens http://localhost:3030

Features:
- Multi-step form with progress indicator
- Live preview of changes
- Theme selector with visual previews
- Drag-and-drop for OG image
- Validation with immediate feedback
- Generate config and download

### Phase 4: Template-First Documentation

**4.1 README.md for Template Users**

```markdown
# AI Resume Website Template

Create your own AI-powered resume website in minutes!

## 🎯 Features

- ✅ AI chatbot that answers questions about your experience
- ✅ Job fit assessment tool
- ✅ 4 beautiful pre-built themes
- ✅ Fully responsive design
- ✅ SEO optimized
- ✅ Deploy to Render.com (free tier)

## 🚀 Quick Start

### Option 1: Web UI (Easiest)
```bash
npx create-ai-resume my-resume
cd my-resume
npm run setup:web
```

### Option 2: CLI Wizard
```bash
git clone https://github.com/yourusername/ai-resume-template
cd ai-resume-template
npm install
npm run setup
npm run dev
```

## 📖 Documentation

- [Setup Guide](docs/SETUP-GUIDE.md)
- [Customization](docs/CUSTOMIZATION.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Themes](docs/THEMES.md)

## 🎨 Themes

Choose from 4 pre-built themes or create your own!

[Screenshot of themes]

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)
```

**4.2 Comprehensive Guides**

- `docs/SETUP-GUIDE.md` - Step-by-step setup
- `docs/CUSTOMIZATION.md` - How to customize everything
- `docs/THEMES.md` - Theme system documentation
- `docs/DEPLOYMENT.md` - Deploy to various platforms
- `docs/TROUBLESHOOTING.md` - Common issues
- `docs/API.md` - Configuration file reference

### Phase 5: Example Configurations

Create `/examples/` with realistic examples:

- `software-engineer.json`
- `product-manager.json`
- `designer.json`
- `data-scientist.json`

Each example includes full resume data showing best practices.

### Phase 6: Template Publishing

**6.1 Prepare Template Repository**

1. Ensure all placeholder data
2. Add LICENSE (MIT)
3. Create CONTRIBUTING.md
4. Add CODE_OF_CONDUCT.md
5. Set up GitHub Issues templates
6. Add GitHub Actions for CI

**6.2 GitHub Template Setup**

1. Push to GitHub
2. Settings → Check "Template repository"
3. Add topics: `resume`, `template`, `ai`, `react`, `typescript`
4. Create detailed description
5. Add website link to demo site

**6.3 Demo Site**

Deploy example with fictional data:
- URL: `ai-resume-template-demo.onrender.com`
- Shows all features working
- References template repo

**6.4 Launch Checklist**

- [ ] Template repository published
- [ ] Demo site deployed
- [ ] Documentation complete
- [ ] Video walkthrough recorded
- [ ] Blog post written
- [ ] Share on social media
- [ ] Submit to template galleries

## Implementation Order

### Week 1: Foundation
1. Create new repository
2. Copy and clean code from current site
3. Implement configuration system
4. Add theme system
5. Test with placeholder data

### Week 2: Setup Experience
1. Build CLI wizard
2. Build Web UI wizard
3. Add validation
4. Create example configs
5. Test setup flow

### Week 3: Documentation
1. Write all documentation
2. Create examples
3. Add inline code comments
4. Write blog post
5. Record video tutorial

### Week 4: Polish & Launch
1. Deploy demo site
2. Final testing
3. Prepare launch materials
4. Publish to GitHub
5. Announce launch

## Benefits of New Repository Approach

### For You
- ✅ Personal site stays stable
- ✅ Can iterate on template independently
- ✅ No risk to current deployment
- ✅ Clean separation of concerns
- ✅ Portfolio piece showing template creation

### For Template Users
- ✅ Clean starting point
- ✅ No personal data to remove
- ✅ Designed as template from day one
- ✅ Better documentation
- ✅ More streamlined setup
- ✅ Community can contribute

### For Maintenance
- ✅ Separate issue trackers
- ✅ Different release cycles
- ✅ Template can evolve faster
- ✅ Easier to support users
- ✅ Clear project scope
