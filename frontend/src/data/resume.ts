/**
 * Resume Data Loader
 * Supports multilingual resume loading from language-specific JSON files
 */

import { getResumeData as loadResumeFromConfig } from '../config/loader'
import i18n from '../i18n/config'
import type { Resume } from '../types/resume'

/**
 * Get resume data for current language
 * Loads from data/resume.json (default) or data/resume.{lang}.json
 */
export const getResumeData = (lang?: string): Resume => {
  const currentLang = lang || i18n.language || 'en'
  return loadResumeFromConfig(currentLang)
}

/**
 * Get resume data by specific language
 * @param lang - Language code (e.g., 'en', 'ru', 'es')
 */
export const getResumeDataByLanguage = (lang: string): Resume => {
  return loadResumeFromConfig(lang)
}

// Export default resume for backwards compatibility
export const resumeData = getResumeData('en')

// Backwards compatibility exports
export const resumeDataEn = getResumeData('en')
export const resumeDataRu = getResumeData('ru')
