import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getTranslations, getSupportedLanguages } from '../config/loader'

const LANGUAGE_KEY = 'preferred_language'

// Get stored language preference or default to 'en'
// Validates that stored language is actually supported
const getStoredLanguage = (): string => {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY)
    if (stored && getSupportedLanguages().includes(stored)) {
      return stored
    }
    // If stored language is not supported, clear it and return default
    if (stored) {
      localStorage.removeItem(LANGUAGE_KEY)
      console.warn(`Stored language '${stored}' is not in supported languages, resetting to 'en'`)
    }
    return 'en'
  } catch (error) {
    console.error('Error getting stored language:', error)
    return 'en'
  }
}

// Store language preference
export const storeLanguage = (language: string): void => {
  try {
    localStorage.setItem(LANGUAGE_KEY, language)
  } catch (error) {
    console.error('Error storing language:', error)
  }
}

// Dynamically build resources from configured languages
const supportedLanguages = getSupportedLanguages()
const resources: Record<string, { translation: any }> = {}

supportedLanguages.forEach(lang => {
  try {
    resources[lang] = { translation: getTranslations(lang) }
  } catch (error) {
    console.warn(`No translations found for language '${lang}', using English fallback`)
    resources[lang] = { translation: getTranslations('en') }
  }
})

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

// Store language preference when it changes
i18n.on('languageChanged', (lng) => {
  storeLanguage(lng)
})

export default i18n
