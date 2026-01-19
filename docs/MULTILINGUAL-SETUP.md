# Multilingual Resume Setup Guide

This guide explains how to add a second language to your AI resume website.

## Overview

The template supports multilingual resumes with:
- English (EN) as the primary language (always enabled)
- One configurable second language
- Automatic language switching for both UI and resume content
- Language-specific resume files

## Quick Start

### Step 1: Configure Second Language

Edit `config.json` and update the `languages` section:

```json
{
  "languages": {
    "default": "en",
    "supported": ["en", "ru"],
    "enableLanguageSwitcher": true
  }
}
```

**Options:**
- `default`: Default language (always "en")
- `supported`: Array of language codes (first must be "en", add second language)
- `enableLanguageSwitcher`: Set to `true` to show language switcher in UI

**Supported language codes:**
- `ru` - Russian
- `es` - Spanish
- `fr` - French
- `de` - German
- `pt` - Portuguese
- `zh` - Chinese
- `ja` - Japanese
- `ko` - Korean

### Step 2: Add Translations (Optional)

If you want to translate UI elements (buttons, labels, section titles), add your language to `data/translations.json`:

```json
{
  "en": {
    "nav": {
      "about": "About",
      "experience": "Experience",
      ...
    }
  },
  "ru": {
    "nav": {
      "about": "О себе",
      "experience": "Опыт работы",
      ...
    }
  }
}
```

**Note:** If translations are missing, the site will fall back to English UI text.

### Step 3: Create Language-Specific Resume

Create a new resume file for your second language:

**File naming convention:** `data/resume.{language}.json`

**Examples:**
- Russian: `data/resume.ru.json`
- Spanish: `data/resume.es.json`
- French: `data/resume.fr.json`

**Structure:** Use the same JSON structure as `data/resume.json`:

```json
{
  "personalInfo": {
    "name": "Имя Фамилия",
    "title": "Senior Product Manager",
    "location": "Москва, Россия",
    "phone": "+7 (xxx) xxx-xxxx",
    "email": "email@example.com",
    "linkedin": "https://linkedin.com/in/...",
    "github": "https://github.com/...",
    "website": "https://..."
  },
  "summary": "Профессиональное резюме на русском языке...",
  "highlights": [
    "Достижение 1",
    "Достижение 2"
  ],
  "skills": {
    "productManagement": ["Навык 1", "Навык 2"],
    "technical": ["Навык 3", "Навык 4"],
    "tools": ["Инструмент 1", "Инструмент 2"],
    "domains": ["Домен 1", "Домен 2"]
  },
  "experience": [
    {
      "title": "Senior Product Manager",
      "company": "Компания",
      "location": "Москва, Россия",
      "startDate": "Март 2021",
      "endDate": "Настоящее время",
      "current": true,
      "description": "Описание роли...",
      "achievements": [
        "Достижение 1",
        "Достижение 2"
      ],
      "technologies": ["Tech 1", "Tech 2"]
    }
  ],
  "education": [
    {
      "degree": "MBA",
      "institution": "Университет",
      "location": "Город, Страна",
      "graduationDate": "Июнь 2016",
      "honors": "С отличием",
      "relevantCourses": ["Курс 1", "Курс 2"]
    }
  ],
  "certifications": [
    {
      "name": "Название сертификата",
      "issuer": "Организация",
      "date": "Март 2019",
      "credentialId": "ID",
      "url": "https://..."
    }
  ],
  "languages": [
    {
      "language": "Русский",
      "proficiency": "Родной"
    },
    {
      "language": "Английский",
      "proficiency": "Свободное владение"
    }
  ],
  "projects": [],
  "awards": [],
  "publications": []
}
```

### Step 4: Test Language Switching

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Click the language switcher in the top navigation

4. Verify:
   - UI text changes (if translations provided)
   - Resume content switches to language-specific version
   - All sections display correctly in the new language

## File Structure

```
your-project/
├── config.json                    # Main configuration
├── data/
│   ├── resume.json               # English resume (required)
│   ├── resume.ru.json            # Russian resume (optional)
│   ├── resume.es.json            # Spanish resume (optional)
│   └── translations.json         # UI translations (optional)
└── frontend/
    └── src/
        ├── i18n/config.ts        # i18n configuration
        ├── data/resume.ts        # Resume loader
        └── config/loader.ts      # Config loader
```

## Important Notes

### Resume File Fallback

If a language-specific resume file doesn't exist, the system will:
1. Log a warning to console
2. Fall back to the English resume (`data/resume.json`)
3. Continue working (no errors)

**Example:** If you enable Russian but don't create `resume.ru.json`, the Russian version will show the English resume content.

### Translation Fallback

If UI translations are missing for a language:
- English text will be shown for untranslated elements
- The site will continue to function normally
- Console will show a warning

### Backend AI Chat

The backend AI will automatically respond in the user's selected language if:
1. The AI provider supports that language
2. The resume content is provided in that language
3. The language is properly detected

## Common Issues

### Language switcher not appearing

**Solution:** Set `enableLanguageSwitcher: true` in `config.json`

### Resume doesn't switch languages

**Solution:** Ensure you created `data/resume.{lang}.json` for your second language

### UI still shows English text

**Solution:** Add translations to `data/translations.json` or the UI will default to English

### Console shows "No resume file found for language 'xx'"

**Solution:** This is a warning. Create `data/resume.{lang}.json` or accept English fallback

## Examples

### Example 1: English + Russian

**config.json:**
```json
{
  "languages": {
    "default": "en",
    "supported": ["en", "ru"],
    "enableLanguageSwitcher": true
  }
}
```

**Files needed:**
- `data/resume.json` (English - required)
- `data/resume.ru.json` (Russian - required for Russian content)
- `data/translations.json` (optional - for UI translations)

### Example 2: English + Spanish

**config.json:**
```json
{
  "languages": {
    "default": "en",
    "supported": ["en", "es"],
    "enableLanguageSwitcher": true
  }
}
```

**Files needed:**
- `data/resume.json` (English - required)
- `data/resume.es.json` (Spanish - required for Spanish content)
- Add Spanish translations to `data/translations.json`

### Example 3: English Only (Disable Multilingual)

**config.json:**
```json
{
  "languages": {
    "default": "en",
    "supported": ["en"],
    "enableLanguageSwitcher": false
  }
}
```

**Files needed:**
- `data/resume.json` (English only)

## Best Practices

1. **Always keep English as primary**: The system is designed with English as the default/fallback language

2. **Maintain consistent structure**: Ensure all language-specific resume files follow the same JSON structure

3. **Test thoroughly**: After adding a language, test all sections in both languages

4. **Use native speakers**: If possible, have native speakers review translations for accuracy

5. **Keep files synchronized**: When updating your English resume, remember to update translations

6. **AI Provider Support**: Ensure your AI provider (Groq, OpenAI, etc.) supports your second language for chat functionality

## Need Help?

- Check the console for warnings about missing files
- Refer to `data/resume.json` for the correct structure
- Review `data/translations.json` for UI translation examples
- Test with one language first before adding multiple

## Future Enhancements

Potential future features (not currently implemented):
- Support for more than 2 languages
- Automatic translation tools
- Language-specific theme customization
- Right-to-left (RTL) language support
