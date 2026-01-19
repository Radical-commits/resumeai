# Themes

This directory contains pre-built themes for the AI Resume Template.

## Available Themes

### 1. Professional (Default)
- **Colors**: Teal and dark background
- **Best for**: Tech professionals, software engineers
- **Style**: Clean, modern, professional

### 2. Modern
- **Colors**: Bold blue with slate background
- **Best for**: Innovators, startup professionals
- **Style**: Contemporary, bold, energetic

### 3. Minimal
- **Colors**: Black and white
- **Best for**: Designers, writers, minimalists
- **Style**: Clean, readable, timeless

### 4. Creative
- **Colors**: Vibrant pink with purple background
- **Best for**: Creative professionals, designers, artists
- **Style**: Bold, vibrant, eye-catching

## Using Themes

To change your theme, edit the `theme` field in `config.json`:

```json
{
  "theme": "professional"
}
```

Available options: `professional`, `modern`, `minimal`, `creative`

## Creating Custom Themes

You can create your own theme by:

1. Copy one of the existing theme files
2. Rename it (e.g., `mytheme.json`)
3. Modify the colors, fonts, and spacing
4. Update `config.json` to use your theme: `"theme": "mytheme"`

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
    "heading": "Font Family",
    "body": "Font Family",
    "mono": "Font Family"
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

## Tips for Custom Themes

- **Contrast**: Ensure text is readable against backgrounds
- **Accessibility**: Test color contrast ratios (aim for WCAG AA: 4.5:1)
- **Consistency**: Use similar color tones throughout
- **Web Fonts**: If using custom fonts, add them to your HTML
