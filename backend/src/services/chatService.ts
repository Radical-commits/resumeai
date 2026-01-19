/**
 * Chat Service
 * Refactored to use the new AI Service abstraction
 */

import { aiService, AIService } from './aiService.js'
import { getResumeContext } from './resumeParser.js'
import type { ChatMessage } from '../types/index.js'

/**
 * Detect if the message is in Russian
 */
function isRussian(text: string): boolean {
  // Check for Cyrillic characters
  const cyrillicPattern = /[\u0400-\u04FF]/
  return cyrillicPattern.test(text)
}

/**
 * Convert chat history to AI message format
 */
function convertHistoryToMessages(history: ChatMessage[]): Array<{ role: 'user' | 'assistant' | 'system'; content: string }> {
  return history.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }))
}

/**
 * Generate a chat response using AI Service
 */
export async function generateChatResponse(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const resumeContext = getResumeContext()
    const isRussianMessage = isRussian(message)

    // Build the system prompt using our new abstraction
    const systemPrompts = AIService.getSystemPrompts(resumeContext, isRussianMessage)
    const systemPrompt = systemPrompts.general

    // Convert history to AI message format
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...convertHistoryToMessages(history),
      { role: 'user' as const, content: message }
    ]

    // Call AI service (supports multiple providers)
    const response = await aiService.chat(messages)

    if (!response.content) {
      throw new Error('No response from AI')
    }

    return response.content.trim()

  } catch (error) {
    console.error('Error generating chat response:', error)

    // Check for rate limiting
    if (error instanceof Error && error.message.includes('429')) {
      console.warn('Rate limit reached for AI API')
      throw new Error('API rate limit reached. Please try again later.')
    }

    throw new Error('Failed to generate response from AI')
  }
}

/**
 * Assess job fit based on job description
 */
export async function assessJobFit(
  jobDescription: string,
  history: ChatMessage[] = []
): Promise<{ assessment: string; fitScore?: number }> {
  try {
    const resumeContext = getResumeContext()
    const isRussianMessage = isRussian(jobDescription)

    // Build the assessment prompt
    const systemPrompts = AIService.getSystemPrompts(resumeContext, isRussianMessage)
    const systemPrompt = systemPrompts.jobAssessment

    // Convert history to AI message format
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...convertHistoryToMessages(history),
      { role: 'user' as const, content: `Job Description:\n${jobDescription}\n\nPlease provide a detailed assessment.` }
    ]

    // Call AI service
    const response = await aiService.chat(messages)

    if (!response.content) {
      throw new Error('No assessment generated')
    }

    const assessment = response.content.trim()

    // Try to extract fit score from the assessment
    const fitScore = extractFitScore(assessment)

    return {
      assessment,
      fitScore
    }

  } catch (error) {
    console.error('Error assessing job fit:', error)

    // Check for rate limiting
    if (error instanceof Error && error.message.includes('429')) {
      console.warn('Rate limit reached for AI API')
      throw new Error('API rate limit reached. Please try again later.')
    }

    throw new Error('Failed to generate job assessment')
  }
}

/**
 * Extract fit score from assessment text
 */
function extractFitScore(assessment: string): number | undefined {
  // Look for patterns like "8/10", "80%", or "8 out of 10"
  const patterns = [
    /(\d+)\/10/,
    /(\d+)%/,
    /(\d+)\s*out\s*of\s*10/i,
    /fit\s*score[:\s]+(\d+)/i
  ]

  for (const pattern of patterns) {
    const match = assessment.match(pattern)
    if (match && match[1]) {
      let score = parseInt(match[1], 10)

      // Normalize to 0-10 scale
      if (score > 10 && score <= 100) {
        score = Math.round(score / 10)
      }

      if (score >= 0 && score <= 10) {
        return score
      }
    }
  }

  return undefined
}
