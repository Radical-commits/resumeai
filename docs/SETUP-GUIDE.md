# Setup Guide

Complete guide to setting up your AI Resume Website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Setup with CLI Wizard](#quick-setup-with-cli-wizard)
3. [Manual Setup](#manual-setup)
4. [Configuration Reference](#configuration-reference)
5. [Resume Data Structure](#resume-data-structure)
6. [Multilingual Setup](#multilingual-setup)
7. [Theme Customization](#theme-customization)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([download here](https://nodejs.org/))
- **Git** installed (optional, for cloning)
- **Groq API Key** - Free tier available at [console.groq.com](https://console.groq.com)
  - Sign up for a free account
  - Navigate to API Keys section
  - Create a new API key
  - Copy the key (you'll need it during setup)

## Quick Setup with CLI Wizard

The fastest way to get started:

### Step 1: Get the Template

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-resume-template
cd ai-resume-template
```

Or download the ZIP file from GitHub and extract it.

### Step 2: Run Setup Wizard

```bash
node scripts/setup-cli.js
```

The wizard will guide you through:

1. **Personal Information**
   - Full name
   - Job title
   - Email address
   - Phone number
   - Location

2. **Social Links**
   - LinkedIn profile URL
   - GitHub profile URL
   - Personal website (optional)

3. **Theme Selection**
   - Choose from 4 pre-built themes
   - Or select custom (you'll configure later)

4. **Features**
   - Enable AI Chat? (recommended: yes)
   - Enable Job Fit Assessment? (recommended: yes)
   - Enable multilingual support? (default: no)

5. **API Configuration**
   - Groq API key (for AI features)
   - Leave empty to configure later

6. **Domain** (optional)
   - Your custom domain
   - Leave empty for localhost

### Step 3: Customize Resume

Edit `data/resume.json` with your actual work experience, skills, and education.

See the [Resume Data Structure](#resume-data-structure) section below for details.

### Step 4: Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173 to see your resume!

## Manual Setup

If you prefer to configure everything manually:

### Step 1: Configuration File

Create or edit `config.json`:

```json
{
  "site": {
    "name": "Jane Smith",
    "title": "Jane Smith - Senior Software Engineer",
    "domain": "https://janesmith.dev",
    "description": "Senior Software Engineer specializing in full-stack development",
    "language": "en",
    "ogImage": "/og-image.png",
    "favicon": "/favicon.ico"
  },
  "contact": {
    "email": "jane@example.com",
    "phone": "+1 555 123 4567",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/janesmith",
    "github": "https://github.com/janesmith"
  },
  "theme": "professional",
  "features": {
    "enableChat": true,
    "enableJobFit": true,
    "enableMultilingual": false,
    "enableResumePDF": false
  },
  "branding": {
    "primaryColor": "#14b8a6",
    "accentColor": "#0d9488",
    "backgroundColor": "#0a0a0a",
    "textColor": "#ffffff",
    "fontFamily": "Inter, system-ui, sans-serif"
  },
  "languages": {
    "default": "en",
    "supported": ["en"],
    "enableLanguageSwitcher": false
  }
}
```

### Step 2: Resume Data

Edit `data/resume.json` with your information. See [Resume Data Structure](#resume-data-structure).

### Step 3: Environment Variables

Create `backend/.env`:

```env
# AI Service Configuration
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
```

Create `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:3001
```

### Step 4: Validate Configuration

Run the validation script to check for errors:

```bash
node scripts/validate.js
```

Fix any errors or warnings that appear.

### Step 5: Install and Run

```bash
npm install
npm run dev
```

## Configuration Reference

### Site Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `site.name` | string | Yes | Your full name |
| `site.title` | string | Yes | Page title (appears in browser tab) |
| `site.domain` | string | No | Your website URL |
| `site.description` | string | Yes | SEO meta description |
| `site.language` | string | Yes | Default language code (e.g., "en") |
| `site.ogImage` | string | No | Path to Open Graph image |
| `site.favicon` | string | No | Path to favicon |

### Contact Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contact.email` | string | Yes | Your email address |
| `contact.phone` | string | No | Phone number (international format) |
| `contact.location` | string | No | City, State/Country |
| `contact.linkedin` | string | No | LinkedIn profile URL |
| `contact.github` | string | No | GitHub profile URL |

### Theme

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `theme` | string | Yes | Theme name: "professional", "modern", "minimal", or "creative" |

### Features

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `features.enableChat` | boolean | true | Enable AI chatbot |
| `features.enableJobFit` | boolean | true | Enable job fit assessment |
| `features.enableMultilingual` | boolean | false | Enable language switching |
| `features.enableResumePDF` | boolean | false | Enable PDF download |

### Branding (Optional)

Overrides theme colors:

| Field | Type | Description |
|-------|------|-------------|
| `branding.primaryColor` | string | Primary brand color (hex) |
| `branding.accentColor` | string | Accent color (hex) |
| `branding.backgroundColor` | string | Background color (hex) |
| `branding.textColor` | string | Text color (hex) |
| `branding.fontFamily` | string | Font family |

## Resume Data Structure

The `data/resume.json` file contains your professional information.

### Required Sections

#### Personal Info
```json
"personalInfo": {
  "name": "Your Name",
  "title": "Your Job Title",
  "location": "City, Country",
  "email": "you@example.com",
  "phone": "+1 234 567 8900",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername"
}
```

#### Summary
```json
"summary": "2-3 sentences highlighting your expertise and experience"
```

#### Highlights
```json
"highlights": [
  "Key achievement with measurable impact",
  "Another significant accomplishment",
  "Third notable highlight"
]
```

#### Skills
```json
"skills": {
  "technical": ["Skill 1", "Skill 2", "Skill 3"],
  "frameworks": ["Framework 1", "Framework 2"],
  "tools": ["Tool 1", "Tool 2"]
}
```

Customize categories to match your field.

#### Experience
```json
"experience": [
  {
    "title": "Job Title",
    "company": "Company Name",
    "location": "City, Country",
    "startDate": "January 2020",
    "endDate": "Present",
    "current": true,
    "description": "Brief role description",
    "achievements": [
      "Achievement with measurable impact",
      "Another accomplishment"
    ],
    "technologies": ["Tech 1", "Tech 2"]
  }
]
```

### Optional Sections

- `education` - Academic background
- `certifications` - Professional credentials
- `languages` - Spoken languages
- `projects` - Side projects or portfolio items
- `awards` - Professional recognition
- `publications` - Articles, papers, blog posts

See `examples/` directory for complete examples.

## Multilingual Setup

To enable multiple languages:

### 1. Update Config

```json
{
  "languages": {
    "default": "en",
    "supported": ["en", "ru"],
    "enableLanguageSwitcher": true
  },
  "features": {
    "enableMultilingual": true
  }
}
```

### 2. Add Translations

Edit `data/translations.json` to add UI text in your languages.

### 3. Create Resume Versions

Create separate resume files:
- `data/resume.en.json` - English version
- `data/resume.ru.json` - Russian version

The app will load the appropriate version based on user's language selection.

## Theme Customization

### Using Pre-built Themes

Edit `config.json`:

```json
{
  "theme": "professional"
}
```

Available themes:
- `professional` - Teal and dark
- `modern` - Blue and slate
- `minimal` - Black and white
- `creative` - Pink and purple

### Creating Custom Theme

1. Copy an existing theme:
```bash
cp themes/professional.json themes/mytheme.json
```

2. Edit colors, fonts, and spacing in `themes/mytheme.json`

3. Update `config.json`:
```json
{
  "theme": "mytheme"
}
```

### Override Theme Colors

Use the `branding` section in `config.json` to override specific colors:

```json
{
  "theme": "professional",
  "branding": {
    "primaryColor": "#your-color",
    "accentColor": "#your-accent"
  }
}
```

## Troubleshooting

### Setup Wizard Fails

**Problem**: Setup wizard doesn't start or crashes

**Solutions**:
- Ensure Node.js 18+ is installed: `node --version`
- Check for syntax errors in package.json
- Try: `npm install` first, then run wizard

### Validation Errors

**Problem**: `node scripts/validate.js` shows errors

**Solutions**:
- Check that all required fields are filled
- Ensure email format is valid
- Verify URLs are complete (include https://)
- Remove placeholder values ("Your Name", etc.)

### AI Features Not Working

**Problem**: Chat or job fit assessment doesn't respond

**Solutions**:
- Verify Groq API key in `backend/.env`
- Check that key is active at console.groq.com
- Ensure backend server is running
- Check browser console for errors

### Theme Not Applying

**Problem**: Theme changes don't take effect

**Solutions**:
- Verify theme name matches a file in `themes/`
- Check for typos in config.json
- Restart development server
- Clear browser cache

### Port Already in Use

**Problem**: "Port 5173 already in use"

**Solutions**:
- Stop other development servers
- Kill process using port:
  - Mac/Linux: `lsof -ti:5173 | xargs kill`
  - Windows: `netstat -ano | findstr :5173`
- Or change port in `frontend/.env`

## Next Steps

After setup is complete:

1. **Customize Content**: Edit `data/resume.json` thoroughly
2. **Test AI Features**: Try the chatbot and job fit assessment
3. **Review Design**: Check responsiveness on mobile/tablet
4. **Add Assets**: Replace favicon and OG image
5. **Deploy**: See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

## Need More Help?

- Check [examples/](../examples/) for complete resume samples
- Review [themes/README.md](../themes/README.md) for theme documentation
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
- Open an issue on GitHub for bugs or questions
