import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { getSupportedLanguages, isFeatureEnabled } from '../config/loader'

// Language display names
const languageNames: Record<string, string> = {
  en: 'EN',
  ru: 'RU',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  pt: 'PT',
  zh: '中文',
  ja: '日本語',
  ko: '한국어'
}

// Language labels for accessibility
const languageLabels: Record<string, string> = {
  en: 'Switch to English',
  ru: 'Switch to Russian',
  es: 'Switch to Spanish',
  fr: 'Switch to French',
  de: 'Switch to German',
  pt: 'Switch to Portuguese',
  zh: 'Switch to Chinese',
  ja: 'Switch to Japanese',
  ko: 'Switch to Korean'
}

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const supportedLanguages = getSupportedLanguages()

  const switchToLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }

  // If multilingual feature is disabled, don't show switcher
  if (!isFeatureEnabled('enableMultilingual')) {
    return null
  }

  // If only one language supported, don't show switcher
  if (supportedLanguages.length <= 1) {
    return null
  }

  return (
    <div className="language-switcher">
      <Globe size={18} />
      {supportedLanguages.map((lang, index) => (
        <span key={lang}>
          {index > 0 && <span className="language-separator">|</span>}
          <button
            className={`language-option ${i18n.language === lang ? 'language-option-active' : ''}`}
            onClick={() => switchToLanguage(lang)}
            aria-label={languageLabels[lang] || `Switch to ${lang}`}
            aria-current={i18n.language === lang ? 'true' : 'false'}
          >
            {languageNames[lang] || lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
