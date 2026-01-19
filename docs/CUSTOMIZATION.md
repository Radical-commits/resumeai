# Customization Guide

Learn how to customize every aspect of your AI resume website.

## Table of Contents

1. [Branding and Colors](#branding-and-colors)
2. [Typography](#typography)
3. [Layout and Spacing](#layout-and-spacing)
4. [Custom Themes](#custom-themes)
5. [UI Text and Labels](#ui-text-and-labels)
6. [Assets (Images, Icons)](#assets)
7. [Advanced Customization](#advanced-customization)

## Branding and Colors

### Using Pre-built Themes

The easiest way to customize colors is by selecting a theme in `config.json`:

```json
{
  "theme": "professional"
}
```

Available themes:
- `professional` - Teal and dark (#14b8a6)
- `modern` - Blue and slate (#3b82f6)
- `minimal` - Black and white (#000000)
- `creative` - Pink and purple (#ec4899)

### Override Theme Colors

You can override specific colors without creating a custom theme:

```json
{
  "theme": "professional",
  "branding": {
    "primaryColor": "#your-hex-color",
    "accentColor": "#your-accent-color"
  }
}
```

### Complete Branding Override

Override all colors:

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

### Color Guidelines

- **Primary Color**: Main brand color, used for buttons, links, highlights
- **Accent Color**: Secondary color for hover states
- **Background**: Main page background
- **Text Color**: Primary text color
- Ensure good contrast (WCAG AA: 4.5:1 ratio minimum)
- Test on both light and dark backgrounds

### Color Tools

- [Coolors.co](https://coolors.co) - Generate color palettes
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verify accessibility
- [Color Hunt](https://colorhunt.co) - Explore color schemes

## Typography

### Changing Fonts

Update the `fontFamily` in your config:

```json
{
  "branding": {
    "fontFamily": "Roboto, sans-serif"
  }
}
```

### Using Custom Fonts

1. **Google Fonts** (Recommended):

Add to `frontend/index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

Update config:
```json
{
  "branding": {
    "fontFamily": "Roboto, sans-serif"
  }
}
```

2. **Self-hosted Fonts**:

Place font files in `frontend/public/fonts/` and add CSS in your theme.

### Font Pairing

Good combinations:
- **Professional**: Playfair Display (headings) + Inter (body)
- **Modern**: Montserrat + Inter
- **Minimal**: Helvetica Neue + System UI
- **Creative**: Poppins + Inter

## Layout and Spacing

### Container Width

Themes include a `containerMaxWidth` setting. To customize:

Edit `themes/yourtheme.json`:
```json
{
  "spacing": {
    "containerMaxWidth": "1200px",
    "sectionPadding": "4rem",
    "cardPadding": "2rem"
  }
}
```

Common widths:
- Narrow: 900-1000px (blogs, text-heavy)
- Standard: 1200px (balanced)
- Wide: 1400-1600px (portfolio, visual)

### Section Spacing

Adjust padding between sections:

```json
{
  "spacing": {
    "sectionPadding": "5rem"  // More space
  }
}
```

### Border Radius

Control corner roundness:

```json
{
  "borderRadius": {
    "small": "0.25rem",   // Buttons, tags
    "medium": "0.5rem",   // Cards, inputs
    "large": "1rem"       // Modals, hero sections
  }
}
```

## Custom Themes

### Creating a New Theme

1. **Copy an existing theme**:
```bash
cp themes/professional.json themes/mytheme.json
```

2. **Edit the theme file**:
```json
{
  "name": "My Custom Theme",
  "description": "Your theme description",
  "colors": {
    "primary": "#your-color",
    "accent": "#your-accent",
    "background": "#your-bg",
    "text": "#your-text"
  },
  "fonts": {
    "heading": "Your Heading Font",
    "body": "Your Body Font"
  }
}
```

3. **Activate your theme**:
```json
{
  "theme": "mytheme"
}
```

### Theme Structure

```json
{
  "name": "Theme Name",
  "description": "Brief description",
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

## UI Text and Labels

### Changing UI Text

Edit `data/translations.json` to customize all UI text:

```json
{
  "en": {
    "hero": {
      "statusBadge": "Open to Opportunities",
      "greeting": "Hello, I'm"
    },
    "nav": {
      "about": "About Me",
      "experience": "Work"
    }
  }
}
```

### Adding Custom Sections

You can add custom section titles:

```json
{
  "sections": {
    "volunteering": {
      "title": "Community Work",
      "subtitle": "Giving back"
    }
  }
}
```

## Assets

### Favicon

Replace `frontend/public/favicon.ico` with your own icon.

Create favicons:
- [Favicon.io](https://favicon.io)
- [RealFaviconGenerator](https://realfavicongenerator.net)

### Open Graph Image

The OG image appears when sharing on social media (1200x630px).

1. Create image with:
   - Your name and title
   - Professional photo (optional)
   - Brand colors
   - Clean, readable design

2. Save as `frontend/public/og-image.png`

3. Update config:
```json
{
  "site": {
    "ogImage": "/og-image.png"
  }
}
```

Tools:
- [Canva](https://canva.com) - Templates available
- [Figma](https://figma.com) - Design from scratch
- [OG Image Generator](https://og-playground.vercel.app)

### Profile Photo

Add to `frontend/public/profile.jpg` and reference in your code.

## Advanced Customization

### Component Styling

For deeper customization, edit component styles in:
- `frontend/src/components/*.tsx` (React components)
- `frontend/src/styles/*.css` (Global styles)

### Animation Speed

Control transition speeds in your theme:

```json
{
  "animations": {
    "transitionSpeed": "0.2s",  // Faster
    "hoverScale": "1.05"        // More dramatic
  }
}
```

### Responsive Breakpoints

Modify breakpoints in `frontend/src/styles/breakpoints.ts`:

```typescript
export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
}
```

### Dark Mode Toggle

To add a dark/light mode toggle:

1. Create two theme variants (light/dark)
2. Add toggle component in header
3. Store preference in localStorage
4. Load theme based on preference

### Custom Sections

To add new resume sections:

1. Add data to `data/resume.json`:
```json
{
  "volunteering": [
    {
      "organization": "Nonprofit Name",
      "role": "Volunteer Role",
      "description": "What you did"
    }
  ]
}
```

2. Create component in `frontend/src/components/Volunteering.tsx`
3. Import and add to main layout

## Tips for Good Design

1. **Consistency**: Use your color palette consistently
2. **Hierarchy**: Make important information larger/bolder
3. **Whitespace**: Don't crowd the page
4. **Contrast**: Ensure text is readable
5. **Mobile-first**: Test on phones and tablets
6. **Performance**: Optimize images and fonts
7. **Accessibility**: Support keyboard navigation

## Testing Your Customization

Checklist:
- [ ] Test on Chrome, Firefox, Safari
- [ ] View on mobile device
- [ ] Check color contrast (WCAG AA)
- [ ] Verify all text is readable
- [ ] Test dark mode (if applicable)
- [ ] Check social media preview
- [ ] Validate HTML/CSS
- [ ] Test with screen reader

## Getting Feedback

Before deploying:
1. Show to friends/colleagues
2. Post in design communities
3. Use [Feedback Fish](https://feedback.fish) for user feedback
4. A/B test different versions

## Resources

- [Refactoring UI](https://refactoringui.com) - Design tips
- [Web Design in 4 Minutes](https://jgthms.com/web-design-in-4-minutes/)
- [Material Design](https://material.io/design) - Design system reference
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
