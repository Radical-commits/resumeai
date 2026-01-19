export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatSession {
  sessionId: string
  messages: ChatMessage[]
  createdAt: Date
}

export interface SendMessageRequest {
  message: string
  sessionId?: string
  language?: string
}

export interface SendMessageResponse {
  message: string
  sessionId: string
}

export interface JobFitAssessmentRequest {
  jobDescription: string
  sessionId?: string
  language?: string
}

export interface JobFitAssessmentResponse {
  assessment: string
  matchScore?: number
  strengths?: string[]
  gaps?: string[]
  recommendations?: string[]
  sessionId: string
}
