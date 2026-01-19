import { openaiClient, MODEL_NAME, SYSTEM_PROMPTS } from '../config/gemini.js'
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
 * Convert chat history to OpenAI message format
 */
function convertHistoryToMessages(history: ChatMessage[]): Array<{ role: 'user' | 'assistant'; content: string }> {
  return history.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }))
}

/**
 * Generate a chat response using OpenAI-compatible API
 */
export async function generateChatResponse(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const resumeContext = getResumeContext()
    const isRussianMessage = isRussian(message)

    // Build the system prompt
    const systemPrompt = SYSTEM_PROMPTS.general(resumeContext, isRussianMessage)

    // Convert history to OpenAI message format
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...convertHistoryToMessages(history),
      { role: 'user' as const, content: message }
    ]

    // Call Groq API using OpenAI format
    const completion = await openaiClient.chat.completions.create({
      model: MODEL_NAME,
      messages: messages,
      temperature: 0.5,
      max_tokens: 700
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from AI')
    }

    return response.trim()

  } catch (error) {
    console.error('Error generating chat response:', error)

    // Check for rate limiting
    if (error instanceof Error && error.message.includes('429')) {
      console.warn('Rate limit reached for Gemini API')
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
    const systemPrompt = SYSTEM_PROMPTS.jobAssessment(resumeContext, isRussianMessage)

    // Convert history to OpenAI message format
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...convertHistoryToMessages(history),
      { role: 'user' as const, content: `Job Description:\n${jobDescription}\n\nPlease provide a detailed assessment.` }
    ]

    // Call Groq API using OpenAI format
    const completion = await openaiClient.chat.completions.create({
      model: MODEL_NAME,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from AI')
    }

    const text = response.trim()

    // Try to extract a fit score from the response
    const fitScore = extractFitScore(text)

    return {
      assessment: text,
      fitScore
    }

  } catch (error) {
    console.error('Error assessing job fit:', error)

    if (error instanceof Error && error.message.includes('429')) {
      console.warn('Rate limit reached for Gemini API')
      throw new Error('API rate limit reached. Please try again later.')
    }

    throw new Error('Failed to generate job assessment from AI')
  }
}

/**
 * Extract a numerical fit score from assessment text
 * Looks for patterns like "8/10", "80%", "Score: 8"
 */
function extractFitScore(text: string): number | undefined {
  // Pattern 1: X/10 or X out of 10
  const outOfTenMatch = text.match(/(\d+)\s*(?:\/|out of)\s*10/i)
  if (outOfTenMatch) {
    const score = parseInt(outOfTenMatch[1])
    return Math.min(Math.max(score, 0), 10)
  }

  // Pattern 2: X% or X percent
  const percentMatch = text.match(/(\d+)\s*(?:%|percent)/i)
  if (percentMatch) {
    const percent = parseInt(percentMatch[1])
    return Math.min(Math.max(Math.round(percent / 10), 0), 10)
  }

  // Pattern 3: Score: X or Rating: X
  const scoreMatch = text.match(/(?:score|rating):\s*(\d+)/i)
  if (scoreMatch) {
    const score = parseInt(scoreMatch[1])
    // Assume it's out of 10 if less than or equal to 10, otherwise treat as percentage
    if (score <= 10) {
      return Math.min(Math.max(score, 0), 10)
    } else {
      return Math.min(Math.max(Math.round(score / 10), 0), 10)
    }
  }

  return undefined
}

/**
 * Generate streaming response using OpenAI-compatible API
 */
export async function* generateStreamingResponse(
  message: string,
  history: ChatMessage[] = []
): AsyncGenerator<string, void, unknown> {
  try {
    const resumeContext = getResumeContext()
    const isRussianMessage = isRussian(message)

    const systemPrompt = SYSTEM_PROMPTS.general(resumeContext, isRussianMessage)

    // Convert history to OpenAI message format
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...convertHistoryToMessages(history),
      { role: 'user' as const, content: message }
    ]

    // Use streaming with OpenAI format
    const stream = await openaiClient.chat.completions.create({
      model: MODEL_NAME,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) {
        yield content
      }
    }

  } catch (error) {
    console.error('Error generating streaming response:', error)
    throw new Error('Failed to generate streaming response from AI')
  }
}
