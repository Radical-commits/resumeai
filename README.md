# AI Resume Website Template

> Transform your professional experience into an AI-powered resume website

## Project Status

✅ **Configuration System Ready** - Core configuration files, themes, and setup tools are complete.
🚧 **Frontend/Backend In Progress** - Application code is being developed.

## Overview

This project provides a complete template for creating your own AI-powered resume website. Visitors can interact with an AI chatbot that answers questions about your professional experience, get job fit assessments, and explore your background through an elegant, responsive interface.

## Features

- ✅ **AI chatbot** - Answer questions about your experience
- ✅ **Job fit assessment** - Match candidates to job descriptions
- ✅ **Multiple AI providers** - Groq, OpenAI, Google Gemini, Anthropic, or self-hosted
- ✅ **4 pre-built themes** - Professional, Modern, Minimal, Creative
- ✅ **Platform-agnostic** - Deploy to Render, Vercel, Netlify, Railway, AWS, or self-host
- ✅ **Fully responsive** design
- ✅ **SEO optimized** with Open Graph tags
- ✅ **Bilingual support** (optional)
- ✅ **Easy configuration** - JSON-based, no code changes needed
- ✅ **Interactive setup wizard** - CLI-based with validation
- ✅ **Free tier ready** - Works with free tiers of multiple platforms

## Quick Start

### Prerequisites
- Node.js 18+ installed
- API key for your chosen AI provider (see [AI Providers Guide](docs/AI-PROVIDERS.md)):
  - **Groq** (recommended) - Free, fast ([console.groq.com](https://console.groq.com))
  - **OpenAI** - High quality, $5 free credit ([platform.openai.com](https://platform.openai.com))
  - **Google Gemini** - Free tier available ([makersuite.google.com](https://makersuite.google.com))
  - **Anthropic Claude** - Premium quality ([console.anthropic.com](https://console.anthropic.com))
  - **Self-hosted** - Run locally with Ollama

### Setup Steps

1. **Clone or download this template**
```bash
git clone https://github.com/yourusername/ai-resume-template
cd ai-resume-template
```

2. **Run the setup wizard**
```bash
node scripts/setup-cli.js
```

The wizard will ask you for:
- Personal information (name, email, phone, location)
- Social links (LinkedIn, GitHub)
- Theme preference (Professional, Modern, Minimal, or Creative)
- **AI provider choice** (Groq, OpenAI, Google, Anthropic, or Other)
- Feature preferences (AI chat, job fit assessment)
- API key (for your chosen AI provider)

3. **Customize your resume**

Edit `data/resume.json` with your:
- Work experience
- Skills and expertise
- Education
- Projects and achievements

See `examples/` for inspiration.

4. **Install dependencies and start**
```bash
npm install
npm run dev
```

Visit http://localhost:5173 to see your resume!

### Manual Setup

If you prefer manual configuration:

1. Copy template files:
```bash
cp config.json.example config.json
cp data/resume.json.example data/resume.json
```

2. Edit files with your information
3. Create `.env` files in `frontend/` and `backend/`
4. Run validation: `node scripts/validate.js`

## Project Structure

```
ai-resume-template/
├── plans/                  # Implementation plans and documentation
├── docs/                   # User guides and documentation
├── examples/               # Example configurations
├── themes/                 # Pre-built theme configurations
├── scripts/                # Setup wizards and utilities
├── frontend/               # React + Vite application (coming soon)
├── backend/                # Express + AI service (coming soon)
└── README.md
```

## Documentation

### Getting Started
1. **[Quick Start](QUICKSTART.md)** ⭐ - Get running in 5 minutes (start here!)
2. **[Customization Guide](docs/CUSTOMIZATION.md)** - Make it yours (colors, theme, content)
3. **[Advanced Guide](docs/ADVANCED.md)** - Complete reference (config, AI, deployment, languages)

## Configuration Files

The template uses simple JSON configuration files:

### `config.json` - Site Settings
Controls your site's metadata, branding, and features:
```json
{
  "site": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "domain": "https://yourdomain.com"
  },
  "contact": {
    "email": "you@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "theme": "professional",
  "features": {
    "enableChat": true,
    "enableJobFit": true,
    "enableMultilingual": false
  }
}
```

### `data/resume.json` - Your Resume
Contains your professional information:
- Personal info and contact details
- Professional summary and highlights
- Work experience with achievements
- Skills categorized by type
- Education and certifications
- Projects, awards, and publications

See `examples/software-engineer.json` for a complete example.

### `data/translations.json` - UI Text (Optional)
Customize UI labels and messages, with support for multiple languages.

### `.env` Files - API Keys
- `backend/.env` - AI provider API key (`AI_API_KEY`) and server configuration
- `frontend/.env` - API URL and frontend settings

**Note:** Use the generic `AI_API_KEY` variable for all providers. Provider-specific keys (e.g., `GROQ_API_KEY`, `OPENAI_API_KEY`) are also supported for backward compatibility.

## Themes

Choose from 4 pre-built themes:

| Theme | Colors | Best For |
|-------|--------|----------|
| **Professional** | Teal & Dark | Tech professionals, software engineers |
| **Modern** | Blue & Slate | Innovators, startup professionals |
| **Minimal** | Black & White | Designers, writers, minimalists |
| **Creative** | Pink & Purple | Creative professionals, artists |

Change your theme by editing `config.json`:
```json
{
  "theme": "professional"
}
```

Each theme includes customized:
- Color palette
- Typography
- Spacing and layout
- Border radius
- Animation speeds

See `themes/` directory for theme configurations. You can also create custom themes!

## AI Providers

The template supports multiple AI providers. Choose based on your needs:

| Provider | Free Tier | Cost | Speed | Best For |
|----------|-----------|------|-------|----------|
| **Groq** ⭐ | Yes (generous) | Free | ⚡ Fastest | Getting started, testing |
| **OpenAI** | $5 credit | $0.01-0.06/1K | Fast | Production, quality |
| **Google Gemini** | Yes | Free/Paid | Fast | Free production use |
| **Anthropic** | No | $0.01-0.08/1K | Fast | Long conversations |
| **Ollama** | Yes | Self-host | Slow | Privacy, offline |

⭐ **Recommended:** Start with **Groq** (free, fast, good quality)

See [AI Providers Guide](docs/AI-PROVIDERS.md) for detailed comparison and setup instructions.

## Deployment Options

Deploy to your preferred platform:

| Platform | Free Tier | Setup Difficulty | Best For |
|----------|-----------|------------------|----------|
| **Render.com** ⭐ | Yes | Easy | Full-stack apps (recommended) |
| **Vercel** | Yes | Easy | Frontend + serverless |
| **Netlify** | Yes | Easy | Static sites + functions |
| **Railway** | Limited | Medium | Containers |
| **AWS** | Complex | Hard | Enterprise, scale |
| **Self-hosted** | N/A | Hard | Full control |

⭐ **Recommended:** Start with **Render.com** (reference implementation)

See [Deployment Guide](docs/DEPLOYMENT-GUIDE.md) for platform-specific instructions.

## Development Roadmap

### Phase 1: Foundation ✅
- ✅ Create project structure
- ✅ Implement configuration system (config.json, data/resume.json)
- ✅ Add theme system (4 pre-built themes)
- ✅ Build CLI setup wizard
- ✅ Create validation script
- ✅ Add example configurations
- [ ] Copy and refactor frontend/backend code
- [ ] Test with placeholder data

### Phase 2: Application Code (In Progress)
- [ ] Set up frontend (React + Vite + TypeScript)
- [ ] Set up backend (Express + TypeScript)
- [ ] Implement configuration loaders
- [ ] Connect AI service (Groq API)
- [ ] Build UI components
- [ ] Test all features

### Phase 3: Documentation (Week 3)
- [ ] Write all documentation
- [ ] Create examples
- [ ] Add inline code comments
- [ ] Write blog post
- [ ] Record video tutorial

### Phase 4: Polish & Launch (Week 4)
- [ ] Deploy demo site
- [ ] Final testing
- [ ] Prepare launch materials
- [ ] Publish to GitHub
- [ ] Announce launch

## Reference Implementation

This template is based on a working personal resume site with the following tech stack:
- Frontend: React 18 + TypeScript + Vite
- Backend: Express.js + TypeScript
- AI: Groq API (Llama 3.3 70B)
- Deployment: Render.com
- i18n: i18next for bilingual support

## Contributing

This project is in active development. Contributions will be welcome once the initial template is complete.

## License

MIT License (to be added)

## Credits

Created by extracting and generalizing patterns from a personal AI resume website project.

---

**Status**: Currently in Phase 1 - Foundation setup
**Last Updated**: 2026-01-19
