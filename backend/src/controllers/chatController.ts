import { Request, Response } from 'express'
import { generateChatResponse, assessJobFit } from '../services/chatService.js'
import { getOrCreateSession, addMessageToSession, getSessionHistory } from '../services/sessionService.js'
import type { ChatRequest, ChatResponse, AssessJobRequest, AssessJobResponse, ApiError } from '../types/index.js'

/**
 * Handle general chat messages
 */
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message, sessionId }: ChatRequest = req.body

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string'
      } as ApiError)
    }

    // Get or create session
    const session = getOrCreateSession(sessionId)

    // Get conversation history
    const history = getSessionHistory(session.id)

    // Generate response
    console.log(`[${session.id}] Processing message: "${message.substring(0, 50)}..."`)
    const reply = await generateChatResponse(message, history)

    // Save messages to session
    addMessageToSession(session.id, 'user', message)
    addMessageToSession(session.id, 'assistant', reply)

    // Send response
    const response: ChatResponse = {
      message: reply,
      sessionId: session.id
    }

    res.json(response)

  } catch (error) {
    console.error('Error in chat controller:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const statusCode = errorMessage.includes('rate limit') ? 429 : 500

    res.status(statusCode).json({
      error: 'Failed to generate response',
      details: errorMessage
    } as ApiError)
  }
}

/**
 * Handle job fit assessment
 */
export const handleAssessJob = async (req: Request, res: Response) => {
  try {
    const { jobDescription, sessionId }: AssessJobRequest = req.body

    // Validate job description
    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return res.status(400).json({
        error: 'Job description is required and must be a non-empty string'
      } as ApiError)
    }

    // Get or create session
    const session = getOrCreateSession(sessionId)

    // Get conversation history
    const history = getSessionHistory(session.id)

    // Generate assessment
    console.log(`[${session.id}] Assessing job fit (${jobDescription.length} chars)`)
    const { assessment, fitScore } = await assessJobFit(jobDescription, history)

    // Save to session
    addMessageToSession(session.id, 'user', `[Job Assessment Request]\n${jobDescription}`)
    addMessageToSession(session.id, 'assistant', assessment)

    // Send response
    const response: AssessJobResponse = {
      assessment,
      fitScore,
      sessionId: session.id
    }

    res.json(response)

  } catch (error) {
    console.error('Error in job assessment controller:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const statusCode = errorMessage.includes('rate limit') ? 429 : 500

    res.status(statusCode).json({
      error: 'Failed to generate job assessment',
      details: errorMessage
    } as ApiError)
  }
}
