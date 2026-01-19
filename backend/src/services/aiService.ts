/**
 * AI Service Abstraction
 * Supports multiple AI providers: Groq, OpenAI, Google Gemini, Anthropic
 */

import OpenAI from 'openai'
import dotenv from 'dotenv'
import { getAIConfig, getSiteInfo } from '../config/loader'

dotenv.config()

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

/**
 * Abstract AI Service
 */
class AIService {
  private client: any
  private provider: string
  private model: string
  private temperature: number
  private maxTokens: number

  constructor() {
    const aiConfig = getAIConfig()
    this.provider = aiConfig.provider
    this.model = aiConfig.model
    this.temperature = aiConfig.temperature
    this.maxTokens = aiConfig.maxTokens

    this.initializeClient()
  }

  private initializeClient() {
    switch (this.provider) {
      case 'groq':
        this.initGroq()
        break
      case 'openai':
        this.initOpenAI()
        break
      case 'google':
        this.initGoogle()
        break
      case 'anthropic':
        this.initAnthropic()
        break
      default:
        // Default to Groq
        this.initGroq()
    }
  }

  private initGroq() {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not defined in environment variables')
    }

    this.client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.groq.com/openai/v1'
    })
  }

  private initOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables')
    }

    this.client = new OpenAI({
      apiKey: apiKey
    })
  }

  private initGoogle() {
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not defined in environment variables')
    }

    // For Google Gemini, we'll use OpenAI-compatible wrapper
    this.client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
    })
  }

  private initAnthropic() {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not defined in environment variables')
    }

    // For Anthropic, we'll need to use their SDK or API directly
    // For now, this is a placeholder
    throw new Error('Anthropic provider not yet implemented. Please use Groq, OpenAI, or Google.')
  }

  /**
   * Send a chat completion request
   */
  async chat(messages: AIMessage[]): Promise<AIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
        temperature: this.temperature,
        max_tokens: this.maxTokens
      })

      return {
        content: response.choices[0]?.message?.content || '',
        usage: response.usage
          ? {
              promptTokens: response.usage.prompt_tokens,
              completionTokens: response.usage.completion_tokens,
              totalTokens: response.usage.total_tokens
            }
          : undefined
      }
    } catch (error: any) {
      console.error('AI Service Error:', error.message)
      throw new Error(`AI Service failed: ${error.message}`)
    }
  }

  /**
   * Get system prompts with candidate name replaced
   */
  static getSystemPrompts(resumeContext: string, isRussian: boolean = false) {
    const { candidateName } = getSiteInfo()

    const languageInstruction = isRussian
      ? 'IMPORTANT: The user is asking in Russian. You MUST respond in Russian (Cyrillic script).'
      : 'IMPORTANT: The user is asking in English. You MUST respond in English.'

    return {
      general: `You are an AI assistant helping visitors learn about ${candidateName}'s professional experience and qualifications.

${languageInstruction}

Your role is to:
1. Answer questions about ${candidateName.split(' ')[0]}'s experience, skills, and background
2. Highlight relevant accomplishments and expertise
3. Be professional, friendly, and concise
4. Use data from the resume to provide accurate information
5. Stay grounded in the facts from the resume

Guidelines:
- Always base your responses on the resume data provided below
- Highlight specific achievements that demonstrate capabilities
- Be honest if information is not available in the resume
- Keep responses brief and to the point (3-5 sentences maximum)
- Use bullet points when listing information
- Avoid elaborating unless specifically asked
- Use natural, engaging language
- If asked about something not in the resume, politely indicate you don't have that information

Formatting (use markdown):
- Use **bold text** for key achievements, skills, or important points
- Use bullet points (- or *) to list items clearly
- Use numbered lists (1. 2. 3.) for sequential information
- Keep formatting clean and professional

Resume Data:
${resumeContext}

Remember: Respond in the same language as the user's question.`,

      jobAssessment: `You are an AI career advisor assessing how well ${candidateName}'s qualifications match a given job description.

${languageInstruction}

Your task is to:
1. Analyze the job requirements and responsibilities
2. Identify matching skills, experience, and qualifications from ${candidateName.split(' ')[0]}'s resume
3. Highlight specific achievements that demonstrate relevant capabilities
4. Be honest about any gaps or areas where experience may not align perfectly
5. Provide a balanced, objective assessment
6. Include an overall fit score (e.g., "8/10" or "80%")

Assessment Structure:
1. Start with a brief summary of the overall fit
2. List key matching qualifications (with specific examples from resume)
3. Identify transferable skills and relevant experience
4. Note any gaps or areas for growth (if any)
5. Provide an overall fit score and recommendation

Guidelines:
- Be specific and reference actual achievements from the resume
- Focus on both hard skills (technical) and soft skills (leadership, communication)
- Consider domain expertise and industry experience
- Be realistic but also highlight potential and transferable skills
- Always provide constructive, professional feedback
- Keep responses brief and to the point (5-7 sentences maximum)
- Use bullet points when listing information

Formatting (use markdown):
- Use **bold text** for key strengths and important qualifications
- Use bullet points (- or *) for listing matches and gaps
- Use numbered lists for assessment structure
- Keep formatting clean and easy to read

Resume Data:
${resumeContext}

Remember: Respond in the same language as the job description.`
    }
  }
}

// Export singleton instance
export const aiService = new AIService()
export { AIService }
