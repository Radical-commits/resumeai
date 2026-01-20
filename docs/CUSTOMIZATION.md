# Customization Guide

Make the website yours! This guide covers the most common customizations.

## Quick Links

- Just getting started? → See [QUICKSTART.md](../QUICKSTART.md)
- Need all config options? → See [ADVANCED.md](./ADVANCED.md)

## Common Customizations

### 1. Change Colors and Theme

**Pick a pre-made theme** (easiest):

Edit `config.json`:
```json
{
  "theme": "professional"
}
```

Available themes:
- `professional` - Teal on dark (default)
- `modern` - Blue on slate
- `minimal` - Black and white
- `creative` - Pink on purple

**Override specific colors:**

Stay with a theme but change the main color:

```json
{
  "theme": "professional",
  "branding": {
    "primaryColor": "#ff6b6b"  ← Your custom color
  }
}
```

**Choose your own colors:**

```json
{
  "branding": {
    "primaryColor": "#your-color",
    "accentColor": "#your-accent",
    "backgroundColor": "#0a0a0a",
    "textColor": "#ffffff"
  }
}
```

**Color picker tools:**
- https://coolors.co - Generate palettes
- https://colorhunt.co - Browse color schemes
- https://webaim.org/resources/contrastchecker/ - Check readability

### 2. Add Your Photo

1. Get a professional headshot (square, 500x500px minimum)
2. Save as `profile.jpg`
3. Place in `frontend/public/profile.jpg`
4. (Optional) Update Hero component to display it

**Photo tips:**
- Use square format
- Professional background
- Good lighting
- Genuine smile
- 500-1000px size

### 3. Update Your Resume

Edit `data/resume.json`:

**Personal info:**
```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "you@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "linkedin": "https://linkedin.com/in/you",
    "github": "https://github.com/you"
  }
}
```

**Summary (2-3 sentences about you):**
```json
{
  "summary": "Results-driven professional with X years of experience..."
}
```

**Highlights (3-5 top achievements):**
```json
{
  "highlights": [
    "Increased revenue by 200%",
    "Led team of 15 engineers",
    "Launched 3 products in 2 years"
  ]
}
```

**Work experience:**
```json
{
  "experience": [
    {
      "title": "Senior Product Manager",
      "company": "Company Name",
      "location": "City, State",
      "startDate": "Jan 2020",
      "endDate": "Present",
      "current": true,
      "achievements": [
        "Built feature that increased engagement 40%",
        "Managed roadmap for 3 product lines"
      ]
    }
  ]
}
```

**Skills:**
```json
{
  "skills": {
    "technical": ["Python", "React", "SQL"],
    "productManagement": ["Roadmapping", "User Research"],
    "tools": ["Jira", "Figma", "Mixpanel"]
  }
}
```

You can create your own categories! Just follow the same structure.

**Education:**
```json
{
  "education": [
    {
      "degree": "MBA",
      "institution": "Stanford University",
      "location": "Stanford, CA"
    }
  ]
}
```

### 4. Change Fonts

**Use Google Fonts** (easiest):

1. Go to https://fonts.google.com
2. Pick a font (e.g., "Poppins")
3. Add to `frontend/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

4. Update `config.json`:
```json
{
  "branding": {
    "fontFamily": "Poppins, sans-serif"
  }
}
```

**Font pairing ideas:**
- **Modern:** Montserrat + Inter
- **Professional:** Playfair Display + Inter
- **Clean:** Helvetica Neue + System UI
- **Creative:** Poppins + Inter

### 5. Add Social Media Image

When you share your site on social media, this image appears:

1. Create an image (1200x630px):
   - Your name
   - Your title
   - Your photo (optional)
   - Brand colors

2. Tools to create it:
   - https://canva.com (templates available)
   - https://figma.com
   - https://og-playground.vercel.app

3. Save as `frontend/public/og-image.png`

4. Update `config.json`:
```json
{
  "site": {
    "ogImage": "/og-image.png"
  }
}
```

### 6. Change Site Title & Description

What appears in Google and browser tabs:

```json
{
  "site": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "description": "A brief description that appears in search results"
  }
}
```

**SEO tips:**
- Description: 120-160 characters
- Include keywords for your role/industry
- Make it specific to you

### 7. Add Multiple Languages

Let visitors view your resume in their language:

**Simple setup:**

1. Enable in `config.json`:
```json
{
  "features": {
    "enableMultilingual": true
  },
  "languages": {
    "default": "en",
    "supported": ["en", "de"]
  }
}
```

2. Copy `data/resume.json` to `data/resume.de.json`

3. Translate the content (keep the structure)

4. Language switcher appears automatically!

**Supported languages:**
en (English), ru (Russian), es (Spanish), fr (French), de (German), pt (Portuguese), zh (Chinese), ja (Japanese), ko (Korean)

See [ADVANCED.md - Multiple Languages](./ADVANCED.md#multiple-languages) for details.

### 8. Turn Features On/Off

```json
{
  "features": {
    "enableChat": true,        ← AI chat button
    "enableJobFit": true,      ← Job fit assessment
    "enableMultilingual": false ← Language switcher
  }
}
```

**Note:** Chat and job fit require backend with AI provider configured.

### 9. Change AI Provider

Switch from Groq to another provider:

**OpenAI:**
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

Update `backend/.env`:
```bash
AI_API_KEY=sk-your-openai-key
```

**Other providers:** See [ADVANCED.md - AI Provider Setup](./ADVANCED.md#ai-provider-setup)

### 10. Adjust Layout Spacing

Make sections more compact or spacious:

Create/edit your theme file in `themes/`:

```json
{
  "spacing": {
    "containerMaxWidth": "1200px",  ← Page width
    "sectionPadding": "4rem",       ← Space between sections
    "cardPadding": "2rem"           ← Space inside cards
  }
}
```

Common widths:
- Narrow (text-heavy): 900px
- Standard (balanced): 1200px
- Wide (visual/portfolio): 1400px

## Before You Deploy

### Checklist

- [ ] Updated `data/resume.json` with your information
- [ ] Changed site name and title in `config.json`
- [ ] Added your photo to `frontend/public/`
- [ ] Created social media image (`og-image.png`)
- [ ] Picked colors/theme you like
- [ ] Tested AI chat works
- [ ] Checked on mobile device
- [ ] Spell-checked all content
- [ ] Verified all links work

### Test Your Site

1. **Desktop browsers:** Chrome, Firefox, Safari
2. **Mobile:** View on your phone
3. **AI chat:** Ask it questions about your resume
4. **Links:** Click all social media links
5. **Responsive:** Resize browser window

## Getting Help

- **How do I...?** Check [ADVANCED.md](./ADVANCED.md)
- **Something's broken:** See [Troubleshooting](./ADVANCED.md#troubleshooting)
- **Just starting:** See [QUICKSTART.md](../QUICKSTART.md)

## Design Tips

1. **Keep it simple** - Less is more
2. **Use whitespace** - Don't crowd the page
3. **Limit colors** - 2-3 colors max
4. **Be consistent** - Same style throughout
5. **Make it yours** - Add personal touches
6. **Test on mobile** - Most visitors are on phones
7. **Ask for feedback** - Show to friends first

## Examples

Look at these for inspiration:
- `examples/software-engineer.json` - Technical resume
- `examples/product-manager.json` - Business resume

## What's Next?

Ready to put it online? See [ADVANCED.md - Deployment](./ADVANCED.md#deployment-options) for hosting options.
