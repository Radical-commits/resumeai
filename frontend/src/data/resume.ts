/**
 * Resume Data Loader
 * Refactored to load from JSON configuration
 */

import { getResumeData as loadResumeFromConfig } from '../config/loader'
import type { Resume } from '../types/resume'

// Cache the loaded resume data
let cachedResume: Resume | null = null

/**
 * Get resume data from JSON configuration
 * For now, we load from a single resume.json file
 * Multilingual support can be added by creating separate JSON files
 */
export const getResumeData = (): Resume => {
  if (!cachedResume) {
    cachedResume = loadResumeFromConfig()
  }
  return cachedResume
}

// Export default resume for backwards compatibility
export const resumeData = getResumeData()

// For multilingual support (future enhancement)
// You can create resume.en.json and resume.ru.json
// and load based on i18n.language
export const getResumeDataByLanguage = (_lang?: string): Resume => {
  // For now, return the same data regardless of language
  // TODO: Implement language-specific resume loading if needed
  // e.g., load from data/resume.en.json or data/resume.ru.json
  // When implementing, use: const currentLang = _lang || i18n.language

  return getResumeData()
}

// Backwards compatibility exports
export const resumeDataEn = getResumeData()
export const resumeDataRu = getResumeData()
