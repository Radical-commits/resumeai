/**
 * Configuration Loader for Backend
 * Loads site configuration and provides helper functions
 */

import fs from 'fs'
import path from 'path'

// Type definitions
export interface SiteConfig {
  site: {
    name: string
    title: string
    domain: string
    description: string
    language: string
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

let cachedConfig: SiteConfig | null = null

/**
 * Load configuration from config.json
 */
export function loadConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  const configPath = path.join(__dirname, '../../../config.json')
  const configData = fs.readFileSync(configPath, 'utf-8')
  cachedConfig = JSON.parse(configData)
  return cachedConfig!
}

/**
 * Get AI provider configuration
 */
export function getAIConfig() {
  const config = loadConfig()
  return {
    provider: config.ai.provider || process.env.AI_PROVIDER || 'groq',
    model: config.ai.model || process.env.AI_MODEL || 'llama-3.3-70b-versatile',
    temperature: config.ai.temperature || parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    maxTokens: config.ai.maxTokens || parseInt(process.env.AI_MAX_TOKENS || '1024')
  }
}

/**
 * Get site information for AI prompts
 */
export function getSiteInfo() {
  const config = loadConfig()
  return {
    candidateName: config.site.name,
    candidateTitle: config.contact.email,
    language: config.site.language
  }
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: string): boolean {
  const config = loadConfig()
  return (config.features as any)[feature] || false
}

/**
 * Get resume data path
 */
export function getResumeDataPath(): string {
  return path.join(__dirname, '../../../data/resume.json')
}

/**
 * Load resume data
 */
export function loadResumeData(): any {
  const resumePath = getResumeDataPath()
  const resumeData = fs.readFileSync(resumePath, 'utf-8')
  return JSON.parse(resumeData)
}
