import { randomBytes } from 'crypto'
import type { SessionData, ChatMessage } from '../types/index.js'

// In-memory session store
const sessions = new Map<string, SessionData>()

// Session configuration
const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_HISTORY_LENGTH = 10 // Keep only last 10 messages per session
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000 // Run cleanup every hour

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return randomBytes(16).toString('hex')
}

/**
 * Create a new session
 */
export function createSession(): SessionData {
  const sessionId = generateSessionId()
  const now = new Date()

  const session: SessionData = {
    id: sessionId,
    history: [],
    createdAt: now,
    lastActivity: now
  }

  sessions.set(sessionId, session)
  console.log(`Created new session: ${sessionId}`)

  return session
}

/**
 * Get an existing session by ID
 */
export function getSession(sessionId: string): SessionData | null {
  const session = sessions.get(sessionId)

  if (!session) {
    console.log(`Session not found: ${sessionId}`)
    return null
  }

  // Check if session has expired
  const now = new Date()
  const timeSinceLastActivity = now.getTime() - session.lastActivity.getTime()

  if (timeSinceLastActivity > SESSION_TIMEOUT_MS) {
    console.log(`Session expired: ${sessionId}`)
    sessions.delete(sessionId)
    return null
  }

  // Update last activity
  session.lastActivity = now

  return session
}

/**
 * Get or create a session
 */
export function getOrCreateSession(sessionId?: string): SessionData {
  if (sessionId) {
    const existingSession = getSession(sessionId)
    if (existingSession) {
      return existingSession
    }
  }

  // Create new session if not found or not provided
  return createSession()
}

/**
 * Add a message to session history
 */
export function addMessageToSession(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
): void {
  const session = getSession(sessionId)

  if (!session) {
    console.warn(`Cannot add message to non-existent session: ${sessionId}`)
    return
  }

  const message: ChatMessage = {
    role,
    content,
    timestamp: new Date().toISOString()
  }

  session.history.push(message)

  // Trim history to keep only recent messages
  if (session.history.length > MAX_HISTORY_LENGTH) {
    session.history = session.history.slice(-MAX_HISTORY_LENGTH)
  }

  session.lastActivity = new Date()
}

/**
 * Get conversation history for a session
 */
export function getSessionHistory(sessionId: string): ChatMessage[] {
  const session = getSession(sessionId)
  return session ? session.history : []
}

/**
 * Clear a specific session
 */
export function clearSession(sessionId: string): boolean {
  const deleted = sessions.delete(sessionId)
  if (deleted) {
    console.log(`Cleared session: ${sessionId}`)
  }
  return deleted
}

/**
 * Get total number of active sessions
 */
export function getActiveSessionCount(): number {
  return sessions.size
}

/**
 * Cleanup expired sessions
 */
export function cleanupExpiredSessions(): number {
  const now = new Date()
  let cleanedCount = 0

  for (const [sessionId, session] of sessions.entries()) {
    const timeSinceLastActivity = now.getTime() - session.lastActivity.getTime()

    if (timeSinceLastActivity > SESSION_TIMEOUT_MS) {
      sessions.delete(sessionId)
      cleanedCount++
    }
  }

  if (cleanedCount > 0) {
    console.log(`Cleaned up ${cleanedCount} expired sessions`)
  }

  return cleanedCount
}

/**
 * Start automatic session cleanup
 */
export function startSessionCleanup(): void {
  // Run cleanup immediately
  cleanupExpiredSessions()

  // Schedule periodic cleanup
  setInterval(() => {
    cleanupExpiredSessions()
  }, CLEANUP_INTERVAL_MS)

  console.log('Session cleanup scheduled')
}

/**
 * Get session statistics (for debugging/monitoring)
 */
export function getSessionStats() {
  const now = new Date()
  const stats = {
    totalSessions: sessions.size,
    sessionAges: [] as number[],
    averageHistoryLength: 0
  }

  let totalHistoryLength = 0

  for (const session of sessions.values()) {
    const ageMs = now.getTime() - session.createdAt.getTime()
    stats.sessionAges.push(Math.floor(ageMs / 1000 / 60)) // age in minutes
    totalHistoryLength += session.history.length
  }

  if (sessions.size > 0) {
    stats.averageHistoryLength = totalHistoryLength / sessions.size
  }

  return stats
}
