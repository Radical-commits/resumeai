import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const switchToLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }

  return (
    <div className="language-switcher">
      <Globe size={18} />
      <button
        className={`language-option ${i18n.language === 'en' ? 'language-option-active' : ''}`}
        onClick={() => switchToLanguage('en')}
        aria-label="Switch to English"
        aria-current={i18n.language === 'en' ? 'true' : 'false'}
      >
        EN
      </button>
      <span className="language-separator">|</span>
      <button
        className={`language-option ${i18n.language === 'ru' ? 'language-option-active' : ''}`}
        onClick={() => switchToLanguage('ru')}
        aria-label="Switch to Russian"
        aria-current={i18n.language === 'ru' ? 'true' : 'false'}
      >
        RU
      </button>
    </div>
  )
}
