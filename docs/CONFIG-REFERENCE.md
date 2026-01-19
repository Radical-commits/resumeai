# Configuration Reference

Complete reference for all configuration options in `config.json`.

## Table of Contents

1. [Site Settings](#site-settings)
2. [Contact Information](#contact-information)
3. [Theme](#theme)
4. [Features](#features)
5. [Branding Overrides](#branding-overrides)
6. [Languages](#languages)
7. [AI Provider](#ai-provider)
8. [Deployment](#deployment)

## Site Settings

The `site` section contains basic information about your website.

```json
{
  "site": {
    "name": "Sarah Chen",
    "title": "Senior Product Manager",
    "domain": "https://sarahchen.com",
    "description": "Senior Product Manager specializing in B2C SaaS products.",
    "language": "en",
    "ogImage": "/og-image.png",
    "favicon": "/favicon.ico"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Your full name (displayed in hero section) |
| `title` | string | Yes | Your professional title or headline |
| `domain` | string | Yes | Your website URL (used for SEO and social sharing) |
| `description` | string | Yes | Brief description (used for meta tags and SEO) |
| `language` | string | Yes | Default language code (e.g., "en", "de", "zh") |
| `ogImage` | string | No | Path to Open Graph image for social media (1200x630px) |
| `favicon` | string | No | Path to favicon file |

### Notes

- **name** appears in the hero section and page title
- **domain** should include protocol (https://)
- **ogImage** appears when sharing your site on social media
- **language** should match one of your supported languages

## Contact Information

The `contact` section contains your contact details.

```json
{
  "contact": {
    "email": "sarah.chen@example.com",
    "phone": "+1 (415) 555-0123",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/sarahchen",
    "github": "https://github.com/schen"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Your email address |
| `phone` | string | No | Your phone number (international format recommended) |
| `location` | string | Yes | Your city and state/country |
| `linkedin` | string | No | Full LinkedIn profile URL |
| `github` | string | No | Full GitHub profile URL |

### Notes

- Email and social links appear in the footer
- Contact information is also used by the AI chat for answering questions
- Links automatically open in new tabs

## Theme

Select a pre-built theme or create your own.

```json
{
  "theme": "professional"
}
```

### Available Themes

| Theme | Colors | Best For |
|-------|--------|----------|
| `professional` | Teal (#14b8a6) on dark | Tech professionals, developers |
| `modern` | Blue (#3b82f6) on slate | Modern, corporate look |
| `minimal` | Black and white | Clean, simple aesthetic |
| `creative` | Pink (#ec4899) on purple | Designers, creative roles |

### Custom Themes

Create your own theme file in `themes/mytheme.json`:

```json
{
  "name": "My Theme",
  "description": "Custom theme description",
  "colors": {
    "primary": "#hex",
    "primaryHover": "#hex",
    "accent": "#hex",
    "background": "#hex",
    "backgroundSecondary": "#hex",
    "text": "#hex",
    "textSecondary": "#hex",
    "border": "#hex",
    "success": "#hex",
    "warning": "#hex",
    "error": "#hex"
  },
  "fonts": {
    "heading": "Font Family, fallback",
    "body": "Font Family, fallback",
    "mono": "Monospace Font, fallback"
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

Then set `"theme": "mytheme"` in config.json.

## Features

Enable or disable specific features.

```json
{
  "features": {
    "enableChat": true,
    "enableJobFit": true,
    "enableMultilingual": false,
    "enableResumePDF": false
  }
}
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enableChat` | boolean | true | Show AI chat button and enable chatbot |
| `enableJobFit` | boolean | true | Enable job fit assessment feature |
| `enableMultilingual` | boolean | false | Enable language switcher (requires translations) |
| `enableResumePDF` | boolean | false | Show download resume button |

### Feature Details

**enableChat**
- Displays "Ask AI" button in header and hero section
- Allows visitors to ask questions about your experience
- Requires backend with AI provider configured

**enableJobFit**
- Shows "Check Job Fit" button in hero section
- Allows visitors to paste job descriptions and get match assessment
- Requires backend with AI provider configured

**enableMultilingual**
- Shows language switcher in header
- Requires `languages.supported` with multiple languages
- Requires corresponding `data/resume.{lang}.json` files
- See [MULTILINGUAL-SETUP.md](./MULTILINGUAL-SETUP.md) for details

**enableResumePDF**
- Displays download button for PDF resume
- Requires PDF file in `frontend/public/resume.pdf`

## Branding Overrides

Override theme colors without creating a custom theme.

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

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `primaryColor` | string | Main brand color (hex) - used for buttons, links, highlights |
| `accentColor` | string | Secondary color (hex) - used for hover states |
| `backgroundColor` | string | Page background color (hex) |
| `textColor` | string | Primary text color (hex) |
| `fontFamily` | string | Font stack for body text |

### Notes

- Branding overrides take precedence over theme settings
- Leave fields empty to use theme defaults
- Ensure good contrast between text and background (WCAG AA: 4.5:1 minimum)
- Test colors on different screens and in different lighting

## Languages

Configure multilingual support.

```json
{
  "languages": {
    "default": "en",
    "supported": ["en", "de", "zh"],
    "enableLanguageSwitcher": true
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `default` | string | Yes | Default language code (must be in supported list) |
| `supported` | array | Yes | Array of language codes (e.g., ["en", "ru", "de"]) |
| `enableLanguageSwitcher` | boolean | Yes | Show language switcher in header |

### Supported Language Codes

| Code | Language | Resume File Required |
|------|----------|---------------------|
| `en` | English | `data/resume.json` (default) |
| `de` | German | `data/resume.de.json` |
| `ru` | Russian | `data/resume.ru.json` |
| `es` | Spanish | `data/resume.es.json` |
| `fr` | French | `data/resume.fr.json` |
| `pt` | Portuguese | `data/resume.pt.json` |
| `zh` | Chinese | `data/resume.zh.json` |
| `ja` | Japanese | `data/resume.ja.json` |
| `ko` | Korean | `data/resume.ko.json` |

### Setup

1. Add language codes to `supported` array
2. Create corresponding `data/resume.{lang}.json` files
3. Translations for UI text are in `data/translations.json`
4. Set `enableLanguageSwitcher: true` to show selector

See [MULTILINGUAL-SETUP.md](./MULTILINGUAL-SETUP.md) for detailed setup instructions.

## AI Provider

Configure AI chatbot backend.

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

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `provider` | string | Yes | AI provider: "groq", "openai", "gemini", "anthropic", "ollama" |
| `model` | string | Yes | Model identifier (provider-specific) |
| `temperature` | number | Yes | Creativity/randomness (0.0-1.0, lower = more focused) |
| `maxTokens` | number | Yes | Maximum response length |

### Provider Options

| Provider | Free Tier | Recommended Models |
|----------|-----------|-------------------|
| `groq` | ✅ Yes | llama-3.3-70b-versatile, mixtral-8x7b-32768 |
| `openai` | $5 credit | gpt-4o-mini, gpt-4o |
| `gemini` | ✅ Yes | gemini-1.5-flash, gemini-1.5-pro |
| `anthropic` | No | claude-3-5-sonnet-20241022, claude-3-5-haiku-20241022 |
| `ollama` | ✅ Local | llama3.1, mistral |

### Temperature Guide

- **0.0-0.3**: Very focused, deterministic responses
- **0.4-0.7**: Balanced (recommended for resume chat)
- **0.8-1.0**: Creative, varied responses

### Max Tokens

- **512**: Short, concise answers
- **1024**: Standard responses (recommended)
- **2048**: Longer, detailed responses

See [AI-PROVIDERS.md](./AI-PROVIDERS.md) for provider-specific setup.

## Deployment

Deployment configuration (optional).

```json
{
  "deployment": {
    "platform": "render",
    "autoScale": false,
    "region": "oregon"
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `platform` | string | Deployment platform: "render", "vercel", "netlify", "railway", "aws" |
| `autoScale` | boolean | Enable auto-scaling (platform-specific) |
| `region` | string | Preferred deployment region |

### Notes

- These settings are informational and may be used by deployment scripts
- Actual deployment configuration is platform-specific
- See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions

## Complete Example

```json
{
  "site": {
    "name": "Sarah Chen",
    "title": "Senior Product Manager",
    "domain": "https://sarahchen.com",
    "description": "Senior Product Manager specializing in B2C SaaS products.",
    "language": "en",
    "ogImage": "/og-image.png",
    "favicon": "/favicon.ico"
  },
  "contact": {
    "email": "sarah.chen@example.com",
    "phone": "+1 (415) 555-0123",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/sarahchen",
    "github": "https://github.com/schen"
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
    "supported": ["en", "de"],
    "enableLanguageSwitcher": true
  },
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.7,
    "maxTokens": 1024
  },
  "deployment": {
    "platform": "render",
    "autoScale": false,
    "region": "oregon"
  }
}
```

## Validation

Validate your config with:

```bash
node scripts/validate.js
```

This checks:
- JSON syntax is valid
- All required fields are present
- Field types are correct
- Language codes are supported
- Theme file exists

## Related Documentation

- [Setup Guide](./SETUP-GUIDE.md) - Initial configuration
- [Customization Guide](./CUSTOMIZATION.md) - Styling and themes
- [Multilingual Setup](./MULTILINGUAL-SETUP.md) - Multiple languages
- [AI Providers](./AI-PROVIDERS.md) - AI configuration
- [Deployment Guide](./DEPLOYMENT-GUIDE.md) - Hosting options
