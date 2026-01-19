import { Request, Response } from 'express'
import { parseResume, calculateYearsOfExperience } from '../services/resumeParser.js'
import type { ResumeSummaryResponse, ApiError } from '../types/index.js'

/**
 * Get resume summary
 */
export const getResumeSummary = async (req: Request, res: Response) => {
  try {
    const resume = parseResume()
    const yearsOfExperience = calculateYearsOfExperience()

    // Extract key information for summary
    const allSkills: string[] = []
    for (const category in resume.skills) {
      if (Array.isArray(resume.skills[category])) {
        allSkills.push(...resume.skills[category])
      }
    }

    // Get top 10 most relevant skills
    const keySkills = allSkills.slice(0, 10)

    // Get current role from latest experience
    const currentRole = resume.experience[0]?.title || 'Product Manager'

    // Extract languages
    const languages = resume.languages.map(lang => `${lang.language}: ${lang.proficiency}`)

    const response: ResumeSummaryResponse = {
      summary: resume.summary,
      keySkills,
      yearsOfExperience,
      currentRole,
      languages
    }

    res.json(response)

  } catch (error) {
    console.error('Error getting resume summary:', error)

    res.status(500).json({
      error: 'Failed to retrieve resume summary',
      details: error instanceof Error ? error.message : 'Unknown error'
    } as ApiError)
  }
}

/**
 * Get full parsed resume
 */
export const getFullResume = async (req: Request, res: Response) => {
  try {
    const resume = parseResume()
    res.json(resume)

  } catch (error) {
    console.error('Error getting full resume:', error)

    res.status(500).json({
      error: 'Failed to retrieve resume',
      details: error instanceof Error ? error.message : 'Unknown error'
    } as ApiError)
  }
}
