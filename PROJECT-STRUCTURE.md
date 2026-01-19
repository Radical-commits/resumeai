# Project Structure

## Directory Tree

```
ai-resume-template/
│
├── config.json                    # ✅ Central site configuration
│
├── data/                          # ✅ Resume content and translations
│   ├── resume.json               # Your professional information
│   └── translations.json         # UI text (English + Russian)
│
├── themes/                        # ✅ Pre-built theme configurations
│   ├── professional.json         # Teal and dark theme
│   ├── modern.json              # Blue and slate theme
│   ├── minimal.json             # Black and white theme
│   ├── creative.json            # Pink and purple theme
│   └── README.md                # Theme documentation
│
├── scripts/                       # ✅ Setup and utility scripts
│   ├── setup-cli.js             # Interactive setup wizard
│   └── validate.js              # Configuration validator
│
├── examples/                      # ✅ Example configurations
│   ├── software-engineer.json   # Tech role example
│   ├── product-manager.json     # PM role example
│   └── README.md                # How to use examples
│
├── docs/                          # ✅ Documentation
│   ├── SETUP-GUIDE.md           # Complete setup instructions
│   └── CUSTOMIZATION.md         # Customization guide
│
├── plans/                         # Implementation planning
│   └── PRODUCTIZATION-PLAN.md   # Full productization plan
│
├── frontend/                      # ⏳ React + Vite app (pending)
│   ├── src/                      # Source code
│   ├── public/                   # Static assets
│   ├── .env                      # Frontend environment vars
│   └── package.json              # Frontend dependencies
│
├── backend/                       # ⏳ Express + AI service (pending)
│   ├── src/                      # Source code
│   ├── .env                      # Backend environment vars
│   └── package.json              # Backend dependencies
│
├── package.json                   # ✅ Root package with scripts
├── README.md                      # ✅ Main documentation
├── CONTRIBUTING.md                # ✅ Contribution guidelines
├── LICENSE                        # ✅ MIT License
├── IMPLEMENTATION-SUMMARY.md      # ✅ Implementation summary
├── PROJECT-STRUCTURE.md           # This file
└── .gitignore                     # Git ignore rules
```

## File Descriptions

### Configuration Files

| File | Purpose | Required |
|------|---------|----------|
| `config.json` | Site settings, branding, features | ✅ Yes |
| `data/resume.json` | Your professional information | ✅ Yes |
| `data/translations.json` | UI text in multiple languages | Optional |
| `backend/.env` | API keys and server config | ✅ Yes |
| `frontend/.env` | Frontend configuration | ✅ Yes |

### Setup & Utilities

| File | Purpose | When to Use |
|------|---------|-------------|
| `scripts/setup-cli.js` | Interactive setup wizard | First time setup |
| `scripts/validate.js` | Validate configuration | Before building/deploying |
| `package.json` | Root package with scripts | npm commands |

### Documentation

| File | Purpose | For Who |
|------|---------|---------|
| `README.md` | Quick start and overview | Everyone |
| `docs/SETUP-GUIDE.md` | Detailed setup instructions | New users |
| `docs/CUSTOMIZATION.md` | Customization guide | Users wanting to customize |
| `IMPLEMENTATION-SUMMARY.md` | What was implemented | Developers |
| `PROJECT-STRUCTURE.md` | This file | Developers |

### Themes

| File | Description |
|------|-------------|
| `themes/professional.json` | Teal & dark - for tech professionals |
| `themes/modern.json` | Blue & slate - for innovators |
| `themes/minimal.json` | B&W - for minimalists |
| `themes/creative.json` | Pink & purple - for creatives |

### Examples

| File | Description |
|------|-------------|
| `examples/software-engineer.json` | Complete resume for software engineer |
| `examples/product-manager.json` | Complete resume for product manager |

## Typical Workflow

### First Time Setup

```bash
# 1. Clone template
git clone https://github.com/yourusername/ai-resume-template
cd ai-resume-template

# 2. Run setup wizard
node scripts/setup-cli.js

# 3. Customize resume
# Edit data/resume.json with your experience

# 4. Validate configuration
node scripts/validate.js

# 5. Install dependencies
npm install

# 6. Start development
npm run dev
```

### Making Changes

```bash
# Change theme
# Edit config.json: "theme": "modern"

# Update personal info
# Edit config.json contact section

# Add work experience
# Edit data/resume.json experience array

# Validate changes
node scripts/validate.js

# Restart dev server
npm run dev
```

### Before Deployment

```bash
# 1. Validate everything
node scripts/validate.js

# 2. Build for production
npm run build

# 3. Test production build
npm start

# 4. Deploy to hosting platform
# (See deployment guide)
```

## Key Directories Explained

### `/data/` - Your Content

This is where your resume content lives:
- **resume.json**: All your professional information (experience, skills, education)
- **translations.json**: Customize UI text, add languages

You'll edit these files frequently as you update your experience.

### `/themes/` - Visual Design

Pre-built color schemes and styling:
- Pick one of 4 themes or create your own
- Each theme defines colors, fonts, spacing
- Themes are JSON files - easy to customize

### `/scripts/` - Automation

Helper scripts to make your life easier:
- **setup-cli.js**: Guides you through initial setup
- **validate.js**: Checks for configuration errors

Run these before deploying to catch issues early.

### `/docs/` - Guides

Step-by-step documentation:
- **SETUP-GUIDE.md**: How to set up from scratch
- **CUSTOMIZATION.md**: How to customize everything

Read these when you want to learn more.

### `/examples/` - Inspiration

Real resume examples showing:
- How to structure your data
- What information to include
- How to phrase achievements

Use these as reference when creating yours.

## npm Scripts Reference

| Command | What It Does |
|---------|--------------|
| `npm run setup` | Run interactive setup wizard |
| `npm run validate` | Check configuration for errors |
| `npm run install-all` | Install all dependencies (root, frontend, backend) |
| `npm run dev` | Start development servers |
| `npm run build` | Build for production |
| `npm run build:frontend` | Build frontend only |
| `npm run build:backend` | Build backend only |
| `npm start` | Start production server |

## Status Legend

- ✅ **Complete** - Implemented and ready to use
- 🚧 **In Progress** - Currently being worked on
- ⏳ **Pending** - Planned but not started

## Questions?

- See **README.md** for quick start
- See **docs/SETUP-GUIDE.md** for detailed instructions
- See **docs/CUSTOMIZATION.md** for customization options
- Check **examples/** for resume examples

---

**Last Updated:** 2026-01-19
