/**
 * Resume Parser - Loads resume from JSON configuration
 * Refactored to use the new configuration system
 */

import { loadResumeData } from '../config/loader.js'
import type { ParsedResume } from '../types/index.js'

// Cache for resume context
let cachedContext: string | null = null

/**
 * Load resume from JSON configuration
 */
export function parseResume(): ParsedResume {
  try {
    const resumeData = loadResumeData()

    // Convert JSON resume to ParsedResume format
    const resume: ParsedResume = {
      contact: {
        name: resumeData.personalInfo?.name || '',
        location: resumeData.personalInfo?.location || '',
        phone: resumeData.personalInfo?.phone || '',
        email: resumeData.personalInfo?.email || '',
        linkedin: resumeData.personalInfo?.linkedin || '',
        github: resumeData.personalInfo?.github || ''
      },
      summary: resumeData.summary || '',
      skills: resumeData.skills || {},
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      certifications: resumeData.certifications || [],
      languages: resumeData.languages || [],
      patents: resumeData.publications || []
    }

    return resume
  } catch (error) {
    console.error('Error loading resume from JSON:', error)
    throw new Error('Failed to load resume data')
  }
}

/**
 * Get resume context as a formatted string for AI prompts
 */
export function getResumeContext(): string {
  // Return cached version if available
  if (cachedContext) {
    return cachedContext
  }

  try {
    const resume = parseResume()

    // Build a comprehensive text representation
    const parts: string[] = []

    // Contact information
    parts.push(`**Contact Information:**`)
    parts.push(`Name: ${resume.contact.name}`)
    if (resume.contact.location) parts.push(`Location: ${resume.contact.location}`)
    if (resume.contact.email) parts.push(`Email: ${resume.contact.email}`)
    if (resume.contact.phone) parts.push(`Phone: ${resume.contact.phone}`)
    if (resume.contact.linkedin) parts.push(`LinkedIn: ${resume.contact.linkedin}`)
    if (resume.contact.github) parts.push(`GitHub: ${resume.contact.github}`)
    parts.push('')

    // Professional Summary
    if (resume.summary) {
      parts.push(`**Professional Summary:**`)
      parts.push(resume.summary)
      parts.push('')
    }

    // Skills
    if (resume.skills && Object.keys(resume.skills).length > 0) {
      parts.push(`**Skills:**`)
      for (const [category, skillList] of Object.entries(resume.skills)) {
        if (Array.isArray(skillList) && skillList.length > 0) {
          const categoryName = category.replace(/([A-Z])/g, ' $1').trim()
          parts.push(`${categoryName}: ${skillList.join(', ')}`)
        }
      }
      parts.push('')
    }

    // Work Experience
    if (resume.experience && resume.experience.length > 0) {
      parts.push(`**Work Experience:**`)
      resume.experience.forEach((job: any) => {
        parts.push(`\n${job.title} at ${job.company}`)
        parts.push(`${job.startDate} - ${job.endDate || 'Present'}`)
        if (job.location) parts.push(`Location: ${job.location}`)
        if (job.description) parts.push(job.description)
        if (job.achievements && job.achievements.length > 0) {
          parts.push('Key Achievements:')
          job.achievements.forEach((achievement: string) => {
            parts.push(`- ${achievement}`)
          })
        }
        if (job.technologies && job.technologies.length > 0) {
          parts.push(`Technologies: ${job.technologies.join(', ')}`)
        }
      })
      parts.push('')
    }

    // Education
    if (resume.education && resume.education.length > 0) {
      parts.push(`**Education:**`)
      resume.education.forEach((edu: any) => {
        parts.push(`${edu.degree} - ${edu.institution}`)
        if (edu.graduationDate) parts.push(`Graduated: ${edu.graduationDate}`)
        if (edu.honors) parts.push(`Honors: ${edu.honors}`)
      })
      parts.push('')
    }

    // Certifications
    if (resume.certifications && resume.certifications.length > 0) {
      parts.push(`**Certifications:**`)
      resume.certifications.forEach((cert: any) => {
        parts.push(`- ${cert.name} (${cert.issuer})${cert.date ? ', ' + cert.date : ''}`)
      })
      parts.push('')
    }

    // Languages
    if (resume.languages && resume.languages.length > 0) {
      parts.push(`**Languages:**`)
      resume.languages.forEach((lang: any) => {
        parts.push(`- ${lang.language}: ${lang.proficiency}`)
      })
      parts.push('')
    }

    // Cache and return
    cachedContext = parts.join('\n')
    return cachedContext

  } catch (error) {
    console.error('Error generating resume context:', error)
    return 'Resume data not available'
  }
}

/**
 * Calculate years of experience from resume
 */
export function calculateYearsOfExperience(): number {
  const resume = parseResume()
  if (resume.experience.length === 0) return 0

  // Get the earliest start date from experience
  const firstJob = resume.experience[resume.experience.length - 1]

  if (firstJob && firstJob.startDate) {
    const match = firstJob.startDate.match(/(\d{4})/)
    if (match) {
      const startYear = parseInt(match[1])
      const currentYear = new Date().getFullYear()
      return currentYear - startYear
    }
  }

  return 0
}
