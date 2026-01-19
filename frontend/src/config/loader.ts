/**
 * Configuration Loader
 * Loads site configuration and resume data from JSON files
 * Supports multilingual resume loading
 */

import siteConfigData from '../../../config.json'
import resumeJsonData from '../../../data/resume.json'
import translationsData from '../../../data/translations.json'
import type { Resume } from '../types/resume'

// Cache for language-specific resumes
const resumeCache: Record<string, Resume> = {}

// Type for site configuration
export interface SiteConfig {
  site: {
    name: string
    title: string
    domain: string
    description: string
    language: string
    ogImage: string
    favicon: string
  }
  contact: {
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
  }
  theme: string
  features: {
    enableChat: boolean
    enableJobFit: boolean
    enableMultilingual: boolean
    enableResumePDF: boolean
  }
  branding: {
    primaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
    fontFamily: string
  }
  languages: {
    default: string
    supported: string[]
    enableLanguageSwitcher: boolean
  }
  ai: {
    provider: string
    model: string
    temperature: number
    maxTokens: number
  }
  deployment: {
    platform: string
    autoScale: boolean
    region: string
  }
}

/**
 * Load site configuration
 */
export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig
}

/**
 * Convert JSON resume data to Resume type
 * Supports loading language-specific resume files
 * @param lang - Language code (e.g., 'en', 'ru'). If not provided, uses default resume.json
 */
export function getResumeData(lang?: string): Resume {
  // If no language specified or English, return default resume
  if (!lang || lang === 'en') {
    return resumeJsonData as Resume
  }

  // Check cache first
  if (resumeCache[lang]) {
    return resumeCache[lang]
  }

  // Try to load language-specific resume file
  // Note: For Vite to bundle these files, they must exist at build time
  // Users should create data/resume.{lang}.json files before building
  try {
    // Import all possible language resume files
    // Vite will tree-shake unused ones during build
    let languageResume: Resume | null = null

    // Dynamically select based on language code
    switch (lang) {
      case 'ru':
        try {
          languageResume = require('../../../data/resume.ru.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'es':
        try {
          languageResume = require('../../../data/resume.es.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'fr':
        try {
          languageResume = require('../../../data/resume.fr.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'de':
        try {
          languageResume = require('../../../data/resume.de.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'pt':
        try {
          languageResume = require('../../../data/resume.pt.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'zh':
        try {
          languageResume = require('../../../data/resume.zh.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'ja':
        try {
          languageResume = require('../../../data/resume.ja.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
      case 'ko':
        try {
          languageResume = require('../../../data/resume.ko.json') as Resume
        } catch {
          // File doesn't exist
        }
        break
    }

    if (languageResume) {
      resumeCache[lang] = languageResume
      return languageResume
    } else {
      console.warn(`No resume file found for language '${lang}' (data/resume.${lang}.json), falling back to English`)
      return resumeJsonData as Resume
    }
  } catch (error) {
    console.warn(`Error loading resume for language '${lang}', falling back to default resume.json:`, error)
    return resumeJsonData as Resume
  }
}

/**
 * Get translations for a specific language
 */
export function getTranslations(lang: string = 'en') {
  const translations = translationsData as Record<string, any>
  return translations[lang] || translations['en']
}

/**
 * Get current language from config
 */
export function getCurrentLanguage(): string {
  const config = getSiteConfig()
  return config.languages.default
}

/**
 * Get supported languages
 */
export function getSupportedLanguages(): string[] {
  const config = getSiteConfig()
  return config.languages.supported
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof SiteConfig['features']): boolean {
  const config = getSiteConfig()
  return config.features[feature]
}

/**
 * Get API URL from environment
 */
export function getApiUrl(): string {
  return import.meta.env.VITE_API_URL || 'http://localhost:3001'
}

/**
 * Get theme configuration
 */
export function getTheme(): string {
  const config = getSiteConfig()
  return config.theme
}

/**
 * Get branding colors
 */
export function getBranding() {
  const config = getSiteConfig()
  return config.branding
}

// Export the config for direct access if needed
export const config = getSiteConfig()
export const resume = getResumeData()
