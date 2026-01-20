import axios, { AxiosError } from 'axios'
import type {
  SendMessageRequest,
  SendMessageResponse,
  JobFitAssessmentRequest,
  JobFitAssessmentResponse,
} from '../types/chat'

// In production, use relative URLs (same domain as frontend)
// In development, default to localhost:3001
const API_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production' ? '' : 'http://localhost:3001')

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
})

// Error handler
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>
    const message =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      'An unexpected error occurred'
    throw new Error(message)
  }
  throw error
}

export const chatAPI = {
  // Send a chat message
  sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
    try {
      const response = await apiClient.post<SendMessageResponse>('/api/chat', data)
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },

  // Assess job fit
  assessJobFit: async (data: JobFitAssessmentRequest): Promise<JobFitAssessmentResponse> => {
    try {
      const response = await apiClient.post<JobFitAssessmentResponse>('/api/chat/assess-fit', data)
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
}

export const resumeAPI = {
  // Get resume summary
  getSummary: async (): Promise<{ summary: string }> => {
    try {
      const response = await apiClient.get<{ summary: string }>('/api/resume/summary')
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
}

export default apiClient
