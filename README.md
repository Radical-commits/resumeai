# ResumeAI

> Transform your professional experience into an AI-powered resume website

## Overview

ResumeAI is a complete template for creating your own AI-powered resume website. Visitors can interact with an AI chatbot that answers questions about your professional experience, get job fit assessments, and explore your background through an elegant, responsive interface.

## Features

- ✅ **AI chatbot** - Answer questions about your experience
- ✅ **Job fit assessment** - Match candidates to job descriptions
- ✅ **Multiple AI providers** - Groq, OpenAI, Google Gemini, Anthropic, or self-hosted
- ✅ **4 pre-built themes** - Professional, Modern, Minimal, Creative
- ✅ **Platform-agnostic** - Deploy to Render, Vercel, Netlify, Railway, AWS, or self-host
- ✅ **Fully responsive** design
- ✅ **SEO optimized** with Open Graph tags
- ✅ **Multilingual support** - Add multiple languages easily
- ✅ **Easy configuration** - JSON-based, no code changes needed
- ✅ **Free tier ready** - Works with free tiers of multiple platforms

## Quick Start

### Prerequisites
- Node.js 18+ installed
- API key for your chosen AI provider:
  - **Groq** (recommended) - Free, fast ([console.groq.com](https://console.groq.com))
  - **OpenAI** - High quality, $5 free credit ([platform.openai.com](https://platform.openai.com))
  - **Google Gemini** - Free tier available ([makersuite.google.com](https://makersuite.google.com))
  - **Anthropic Claude** - Premium quality ([console.anthropic.com](https://console.anthropic.com))
  - **Self-hosted** - Run locally with Ollama

### Get Started in 5 Minutes

1. **Clone the repository**
```bash
git clone https://github.com/Radical-commits/resumeai.git
cd resumeai
```

2. **Install dependencies**
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

3. **Configure your site**

Edit `config.json` with your information and `data/resume.json` with your resume.

4. **Set up environment variables**

Create `backend/.env`:
```bash
AI_API_KEY=your_api_key_here
PORT=3001
```

Create `frontend/.env`:
```bash
VITE_API_URL=http://localhost:3001
```

5. **Start the development servers**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Visit http://localhost:5173 to see your resume!

## Documentation

### Getting Started
1. **[Quick Start Guide](QUICKSTART.md)** ⭐ - Detailed 5-minute setup (start here!)
2. **[Customization Guide](docs/CUSTOMIZATION.md)** - Make it yours (colors, theme, content)
3. **[Advanced Guide](docs/ADVANCED.md)** - Complete reference (config, AI providers, deployment, languages)

## Project Structure

```
resumeai/
├── docs/                   # User guides and documentation
├── data/                   # Resume data and translations
├── themes/                 # Pre-built theme configurations
├── frontend/               # React + Vite application
├── backend/                # Express + AI service
├── config.json             # Site configuration
└── README.md
```

## Configuration

### Site Settings (`config.json`)

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

### Resume Data (`data/resume.json`)

Contains your professional information:
- Personal info and contact details
- Professional summary and highlights
- Work experience with achievements
- Skills categorized by type
- Education and certifications
- Projects, awards, and publications

## Themes

Choose from 4 pre-built themes or create your own:

| Theme | Colors | Best For |
|-------|--------|----------|
| **Professional** | Teal & Dark | Tech professionals, software engineers |
| **Modern** | Blue & Slate | Innovators, startup professionals |
| **Minimal** | Black & White | Designers, writers, minimalists |
| **Creative** | Pink & Purple | Creative professionals, artists |

Change your theme in `config.json`:
```json
{
  "theme": "professional"
}
```

## AI Providers

Choose the AI provider that fits your needs:

| Provider | Free Tier | Cost | Speed | Best For |
|----------|-----------|------|-------|----------|
| **Groq** ⭐ | Yes (generous) | Free | ⚡ Fastest | Getting started, testing |
| **OpenAI** | $5 credit | $0.01-0.06/1K | Fast | Production, quality |
| **Google Gemini** | Yes | Free/Paid | Fast | Free production use |
| **Anthropic** | No | $0.01-0.08/1K | Fast | Long conversations |
| **Ollama** | Yes | Self-host | Slow | Privacy, offline |

⭐ **Recommended:** Start with **Groq** (free, fast, good quality)

See the [Advanced Guide](docs/ADVANCED.md#ai-provider-setup) for detailed setup instructions.

## Deployment

Deploy to your preferred platform:

| Platform | Free Tier | Setup Difficulty | Best For |
|----------|-----------|------------------|----------|
| **Render.com** ⭐ | Yes | Easy | Full-stack apps (recommended) |
| **Vercel** | Yes | Easy | Frontend + serverless |
| **Netlify** | Yes | Easy | Static sites + functions |
| **Railway** | Limited | Medium | Containers |
| **Self-hosted** | N/A | Medium | Full control |

⭐ **Recommended:** Start with **Render.com**

See the [Advanced Guide](docs/ADVANCED.md#deployment-options) for platform-specific instructions.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Express.js + TypeScript
- **AI:** Multiple providers supported (Groq, OpenAI, Gemini, Anthropic, Ollama)
- **i18n:** i18next for multilingual support
- **Styling:** CSS with custom themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

- **Issues:** [GitHub Issues](https://github.com/Radical-commits/resumeai/issues)
- **Documentation:** See the [docs](docs/) directory
- **Questions:** Open a discussion on GitHub

---

**Built with ❤️ for professionals who want to showcase their experience with AI**
