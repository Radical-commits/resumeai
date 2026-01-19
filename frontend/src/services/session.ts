// Session management service for chat conversations

const SESSION_KEY = 'chat_session_id'

export const sessionService = {
  // Get the current session ID from localStorage
  getSessionId: (): string | null => {
    try {
      return localStorage.getItem(SESSION_KEY)
    } catch (error) {
      console.error('Error getting session ID:', error)
      return null
    }
  },

  // Set a new session ID in localStorage
  setSessionId: (sessionId: string): void => {
    try {
      localStorage.setItem(SESSION_KEY, sessionId)
    } catch (error) {
      console.error('Error setting session ID:', error)
    }
  },

  // Generate a new unique session ID
  generateSessionId: (): string => {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  },

  // Clear the current session
  clearSession: (): void => {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch (error) {
      console.error('Error clearing session:', error)
    }
  },

  // Get or create a session ID
  getOrCreateSessionId: (): string => {
    let sessionId = sessionService.getSessionId()
    if (!sessionId) {
      sessionId = sessionService.generateSessionId()
      sessionService.setSessionId(sessionId)
    }
    return sessionId
  },
}
