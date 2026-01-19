// Chat message interface
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

// Session data interface
export interface SessionData {
  id: string
  history: ChatMessage[]
  createdAt: Date
  lastActivity: Date
}

// Resume structure interfaces
export interface ResumeContact {
  name: string
  location: string
  phone: string
  email: string
  linkedin: string
  github: string
}

export interface ResumeSkills {
  [category: string]: string[]
}

export interface ResumeExperience {
  title: string
  company: string
  startDate: string
  endDate: string
  location: string
  description?: string
  achievements?: string[]
  technologies?: string[]
}

export interface ResumeEducation {
  degree: string
  institution: string
  location?: string
  graduationDate?: string
  honors?: string
}

export interface ResumeCertification {
  name: string
  issuer: string
  date?: string
  url?: string
}

export interface ResumeLanguage {
  language: string
  proficiency: string
}

export interface ResumePatent {
  title: string
  number: string
  date: string
}

export interface ParsedResume {
  contact: ResumeContact
  summary: string
  skills: ResumeSkills
  experience: ResumeExperience[]
  education: ResumeEducation[]
  certifications: ResumeCertification[]
  languages: ResumeLanguage[]
  patents: ResumePatent[]
}

// Request/Response interfaces
export interface ChatRequest {
  message: string
  sessionId?: string
}

export interface ChatResponse {
  message: string
  sessionId: string
}

export interface AssessJobRequest {
  jobDescription: string
  sessionId?: string
}

export interface AssessJobResponse {
  assessment: string
  fitScore?: number
  sessionId: string
}

export interface ResumeSummaryResponse {
  summary: string
  keySkills: string[]
  yearsOfExperience: number
  currentRole: string
  languages: string[]
}

// Error interface
export interface ApiError {
  error: string
  details?: string
}
