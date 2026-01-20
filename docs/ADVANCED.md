# Advanced Guide

Complete reference for all configuration options, AI providers, deployment, and advanced features.

## Table of Contents

1. [Complete Configuration Reference](#complete-configuration-reference)
2. [AI Provider Setup](#ai-provider-setup)
3. [Deployment Options](#deployment-options)
4. [Multiple Languages](#multiple-languages)
5. [Custom Themes](#custom-themes)
6. [Troubleshooting](#troubleshooting)

---

## Complete Configuration Reference

Everything you can configure in `config.json`.

### Site Settings

```json
{
  "site": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "domain": "https://yourdomain.com",
    "description": "Brief description for SEO",
    "language": "en",
    "ogImage": "/og-image.png",
    "favicon": "/favicon.ico"
  }
}
```

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your full name | "Sarah Chen" |
| `title` | Professional title/headline | "Senior Product Manager" |
| `domain` | Website URL (with https://) | "https://sarahchen.com" |
| `description` | SEO description (160 chars) | "Product manager with 8 years experience..." |
| `language` | Default language code | "en", "de", "zh" |
| `ogImage` | Social media preview image (1200x630px) | "/og-image.png" |
| `favicon` | Browser tab icon | "/favicon.ico" |

### Contact Information

```json
{
  "contact": {
    "email": "you@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  }
}
```

All fields are displayed in the footer. Phone is optional.

### Theme Selection

```json
{
  "theme": "professional"
}
```

**Available themes:**
- `professional` - Teal (#14b8a6) on dark - Clean, tech-focused
- `modern` - Blue (#3b82f6) on slate - Contemporary, corporate
- `minimal` - Black and white - Simple, elegant
- `creative` - Pink (#ec4899) on purple - Vibrant, for designers

### Features

```json
{
  "features": {
    "enableChat": true,
    "enableJobFit": true,
    "enableMultilingual": false
  }
}
```

| Feature | What It Does |
|---------|--------------|
| `enableChat` | Shows "Ask AI About Me" button. Requires backend + AI provider. |
| `enableJobFit` | Shows "Check Job Fit" button. Analyzes job descriptions vs resume. |
| `enableMultilingual` | Shows language switcher. Requires translations + resume files. |

### Branding Overrides

Override theme colors without creating a custom theme:

```json
{
  "branding": {
    "primaryColor": "#14b8a6",
    "accentColor": "#0d9488",
    "backgroundColor": "#0a0a0a",
    "textColor": "#ffffff",
    "fontFamily": "Inter, system-ui, sans-serif"
  }
}
```

**Color tips:**
- Use hex codes (#rrggbb)
- Ensure good contrast (use https://webaim.org/resources/contrastchecker/)
- Test on light and dark backgrounds

### Languages

```json
{
  "languages": {
    "default": "en",
    "supported": ["en", "de"]
  }
}
```

- `default` - Language to show initially
- `supported` - Array of language codes you provide translations for

**To add a language:**
1. Add code to `supported` array
2. Create `data/resume.{lang}.json` with translated resume
3. UI translations already included for: en, ru, es, fr, de, pt, zh, ja, ko

See [Multiple Languages](#multiple-languages) section for details.

### AI Configuration

```json
{
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

| Field | Options | Description |
|-------|---------|-------------|
| `provider` | groq, openai, gemini, anthropic, ollama | Which AI service to use |
| `model` | Provider-specific | AI model to use (see provider sections below) |
| `temperature` | 0.0 - 1.0 | Creativity (0=focused, 1=creative). Use 0.7 for resumes. |
| `maxTokens` | 512 - 2048 | Max response length. 1024 is good for most answers. |

See [AI Provider Setup](#ai-provider-setup) for detailed configuration.

### Deployment

```json
{
  "deployment": {
    "platform": "render",
    "autoScale": false,
    "region": "oregon"
  }
}
```

Informational only - doesn't affect runtime. See [Deployment Options](#deployment-options).

---

## AI Provider Setup

Complete guide for all supported AI providers.

### Quick Comparison

| Provider | Free Tier | Speed | Quality | Best For |
|----------|-----------|-------|---------|----------|
| **Groq** ⭐ | ✅ Generous | ⚡ Fastest | Good | Getting started |
| **OpenAI** | $5 credit | Fast | Excellent | Production |
| **Google Gemini** | ✅ Yes | Fast | Very Good | Free production |
| **Anthropic** | ❌ No | Fast | Excellent | Enterprise |
| **Ollama** | ✅ Free | Slow | Good | Privacy/Offline |

**Recommendation:** Start with **Groq** (free, fast, easy).

### Groq (Recommended)

**Why Groq:**
- Free tier with generous limits
- Extremely fast responses (1-2 seconds)
- Good quality for resume Q&A
- No credit card required

**Setup:**

1. Get API key:
   - Go to https://console.groq.com
   - Sign up (free)
   - Create API key

2. Configure `config.json`:
```json
{
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

3. Add to `backend/.env`:
```bash
AI_API_KEY=gsk_your_key_here
```

**Models:**
- `llama-3.3-70b-versatile` - Best balance (recommended)
- `mixtral-8x7b-32768` - Ultra fast, shorter responses

**Limits:** 30 requests/minute free tier

### OpenAI

**Why OpenAI:**
- Highest quality responses
- Best conversation understanding
- Industry standard

**Setup:**

1. Get API key:
   - Go to https://platform.openai.com
   - Add $5 (gets you ~500,000 resume chat messages)
   - Create API key

2. Configure `config.json`:
```json
{
  "ai": {
    "provider": "openai",
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

3. Add to `backend/.env`:
```bash
AI_API_KEY=sk-your_key_here
```

**Models:**
- `gpt-4o-mini` - Fast, cheap, excellent quality (recommended)
- `gpt-4o` - Best quality, slower, more expensive

**Cost:** ~$0.0001 per chat message (1000 messages = $0.10)

### Google Gemini

**Why Gemini:**
- Generous free tier
- Good quality
- Free for production use

**Setup:**

1. Get API key:
   - Go to https://makersuite.google.com/app/apikey
   - Create API key (free)

2. Configure `config.json`:
```json
{
  "ai": {
    "provider": "gemini",
    "model": "gemini-1.5-flash",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

3. Add to `backend/.env`:
```bash
AI_API_KEY=your_gemini_key_here
```

**Models:**
- `gemini-1.5-flash` - Fast, free tier (recommended)
- `gemini-1.5-pro` - Higher quality, paid

**Limits:** 15 requests/minute free tier

### Anthropic (Claude)

**Why Anthropic:**
- Excellent quality
- Best for long conversations
- Good at following instructions

**Setup:**

1. Get API key:
   - Go to https://console.anthropic.com
   - Add credits (no free tier)
   - Create API key

2. Configure `config.json`:
```json
{
  "ai": {
    "provider": "anthropic",
    "model": "claude-3-5-haiku-20241022",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

3. Add to `backend/.env`:
```bash
AI_API_KEY=sk-ant-your_key_here
```

**Models:**
- `claude-3-5-haiku-20241022` - Fast, affordable
- `claude-3-5-sonnet-20241022` - Best quality, more expensive

**Cost:** ~$0.0003 per message (Haiku)

### Ollama (Self-Hosted)

**Why Ollama:**
- Completely free
- Runs on your computer
- Complete privacy
- Works offline

**Setup:**

1. Install Ollama:
   - Download from https://ollama.ai
   - Install and run

2. Download a model:
```bash
ollama pull llama3.1
```

3. Configure `config.json`:
```json
{
  "ai": {
    "provider": "ollama",
    "model": "llama3.1",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

4. No API key needed! Just set in `backend/.env`:
```bash
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
```

**Models:**
- `llama3.1` - Best quality (4GB RAM)
- `mistral` - Faster, less RAM (2GB)

**Note:** Slower than cloud providers (5-10 seconds per response).

---

## Deployment Options

Host your resume website online.

### Render.com (Recommended)

**Why Render:**
- Free tier available
- Automatic deployments from GitHub
- Built-in SSL certificates
- Easy setup

**Steps:**

1. **Prepare your code:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Push to GitHub:**
   - Create repository on GitHub
   - Push your code

3. **Deploy on Render:**
   - Go to https://render.com
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Select your repository
   - Configure:
     - **Name:** your-resume-site
     - **Build Command:** `cd frontend && npm install && npm run build && cd ../backend && npm install && npm run build`
     - **Start Command:** `cd backend && npm start`
     - **Environment Variables:** Add `AI_API_KEY`

4. **Your site is live!**
   - URL: `https://your-resume-site.onrender.com`
   - Auto-deploys on git push

**Cost:** Free tier available (sleeps after inactivity)

### Vercel (Frontend Only)

**Why Vercel:**
- Best for static sites
- Ultra-fast CDN
- Free SSL
- Free tier

**Setup:**

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Deploy:
```bash
npm install -g vercel
vercel
```

3. Follow prompts

**Note:** Requires separate backend hosting for AI features.

**Cost:** Free for personal projects

### Netlify

Similar to Vercel. Good for static sites + serverless functions.

**Steps:**
1. Connect GitHub repository
2. Configure build: `cd frontend && npm run build`
3. Publish directory: `frontend/dist`

**Cost:** Free tier available

### Railway

**Why Railway:**
- Easy full-stack deployment
- Free trial credits
- Simple configuration

**Steps:**
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repository
4. Add environment variables
5. Deploy

**Cost:** $5/month minimum after trial

### VPS / Self-Hosted

For complete control, deploy to any Linux server:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone your-repo.git
cd your-repo
npm install

# Start with PM2 (process manager)
npm install -g pm2
cd backend && pm2 start npm --name "resume-backend" -- start
cd frontend && pm2 start npm --name "resume-frontend" -- start
```

**Setup nginx reverse proxy:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5173;
    }

    location /api {
        proxy_pass http://localhost:3001;
    }
}
```

---

## Multiple Languages

Add support for multiple languages on your resume site.

### Quick Setup

1. **Enable the feature in `config.json`:**
```json
{
  "features": {
    "enableMultilingual": true
  },
  "languages": {
    "default": "en",
    "supported": ["en", "de", "zh"]
  }
}
```

2. **Create translated resume files:**

Create `data/resume.de.json` (German) and `data/resume.zh.json` (Chinese) by copying `data/resume.json` and translating the content.

3. **That's it!** The language switcher will appear in the header.

### Supported Languages

UI translations are already included for:
- `en` - English
- `ru` - Russian
- `es` - Spanish
- `fr` - French
- `de` - German
- `pt` - Portuguese
- `zh` - Chinese
- `ja` - Japanese
- `ko` - Korean

### Resume File Structure

Each `data/resume.{lang}.json` must have the same structure, just translated:

```json
{
  "personalInfo": {
    "name": "Sarah Chen",
    "title": "Senior Product Manager",  ← Translate this
    ...
  },
  "summary": "...",                      ← Translate this
  "experience": [
    {
      "title": "...",                    ← Translate these
      "company": "...",
      "achievements": ["..."]
    }
  ]
  ...
}
```

**Tips:**
- Keep the same JSON structure
- Only translate text content
- Don't translate: names, emails, URLs, dates
- Keep skill names in English (industry standard) or translate

### Testing

1. Start dev server
2. Look for language switcher (globe icon) in header
3. Click language codes (EN | DE | 中文)
4. Resume content should change

---

## Custom Themes

Create your own theme beyond the 4 included ones.

### Create New Theme

1. **Copy existing theme:**
```bash
cp themes/professional.json themes/mytheme.json
```

2. **Edit colors in `themes/mytheme.json`:**
```json
{
  "name": "My Theme",
  "description": "My custom color scheme",
  "colors": {
    "primary": "#ff6b6b",          ← Your brand color
    "primaryHover": "#ee5a52",
    "accent": "#ee5a52",
    "background": "#1a1a1a",
    "backgroundSecondary": "#2d2d2d",
    "text": "#ffffff",
    "textSecondary": "#a3a3a3",
    "border": "#404040",
    "success": "#51cf66",
    "warning": "#ffd43b",
    "error": "#ff6b6b"
  }
}
```

3. **Activate in `config.json`:**
```json
{
  "theme": "mytheme"
}
```

### Theme Properties

Full theme structure:

```json
{
  "name": "Theme Name",
  "description": "What it looks like",
  "colors": {
    "primary": "#hex",           // Main brand color
    "primaryHover": "#hex",      // Hover state
    "accent": "#hex",            // Secondary color
    "background": "#hex",        // Page background
    "backgroundSecondary": "#hex", // Card backgrounds
    "text": "#hex",              // Main text
    "textSecondary": "#hex",     // Muted text
    "border": "#hex",            // Border color
    "success": "#hex",           // Success states
    "warning": "#hex",           // Warning states
    "error": "#hex"              // Error states
  },
  "fonts": {
    "heading": "Font Name, fallback",
    "body": "Font Name, fallback",
    "mono": "Monospace, fallback"
  },
  "spacing": {
    "containerMaxWidth": "1200px",
    "sectionPadding": "4rem",
    "cardPadding": "2rem"
  },
  "borderRadius": {
    "small": "0.375rem",
    "medium": "0.5rem",
    "large": "1rem"
  },
  "animations": {
    "transitionSpeed": "0.3s",
    "hoverScale": "1.02"
  }
}
```

---

## Troubleshooting

### AI Chat Not Working

**Problem:** Chat button shows but no response

**Solutions:**
1. Check `backend/.env` has correct `AI_API_KEY`
2. Verify backend is running: `http://localhost:3001/health`
3. Check browser console for errors (F12)
4. Verify API key is valid (test on provider's website)

### Resume Not Switching Languages

**Problem:** Language switcher appears but content stays in English

**Solutions:**
1. Check `features.enableMultilingual: true` in config.json
2. Verify `data/resume.{lang}.json` files exist
3. Check browser console for file loading errors
4. Validate JSON syntax in resume files

### Build Fails

**Problem:** `npm run build` shows errors

**Solutions:**
1. Delete `node_modules` and run `npm install` again
2. Check for syntax errors in JSON files (missing commas, brackets)
3. Verify all imports in TypeScript files are correct
4. Run `npm run build` in both frontend and backend directories

### Theme Not Changing

**Problem:** Changed theme in config but site looks the same

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check theme file exists in `themes/` folder
3. Verify theme name matches filename (without .json)
4. Check browser console for theme loading errors

### Port Already in Use

**Problem:** "Port 5173 is already in use"

**Solutions:**
1. Stop other dev servers
2. Find and kill process: `lsof -ti:5173 | xargs kill -9` (Mac/Linux)
3. Change port in `vite.config.ts`

### Can't Find Module

**Problem:** "Cannot find module '@/...''" errors

**Solutions:**
1. Run `npm install` in the directory with the error
2. Check `package.json` has all dependencies
3. Delete `node_modules` and reinstall
4. Verify TypeScript paths in `tsconfig.json`

---

## Getting Help

- **Configuration questions:** Review this guide
- **Bugs:** Open issue on GitHub
- **Customization:** See [CUSTOMIZATION.md](./CUSTOMIZATION.md)
- **Quick start:** See [QUICKSTART.md](../QUICKSTART.md)
