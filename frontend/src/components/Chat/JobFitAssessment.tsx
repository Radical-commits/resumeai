import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { chatAPI } from '../../services/api'
import { sessionService } from '../../services/session'

interface JobFitAssessmentProps {
  onBack: () => void
}

export const JobFitAssessment = ({ onBack }: JobFitAssessmentProps) => {
  const { t, i18n } = useTranslation()
  const [jobDescription, setJobDescription] = useState('')
  const [assessment, setAssessment] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAssess = async () => {
    if (!jobDescription.trim()) return

    setLoading(true)
    setError(null)
    setAssessment(null)

    try {
      const sessionId = sessionService.getOrCreateSessionId()
      const response = await chatAPI.assessJobFit({
        jobDescription: jobDescription.trim(),
        sessionId,
        language: i18n.language,
      })
      setAssessment(response.assessment)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('chat.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="job-fit-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="job-fit-header">
        <button onClick={onBack} className="back-button" aria-label={t('chat.jobFit.back')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h3 className="job-fit-title">{t('chat.jobFit.title')}</h3>
          <p className="job-fit-subtitle">{t('chat.jobFit.subtitle')}</p>
        </div>
      </div>

      <div className="job-fit-content">
        <textarea
          className="job-fit-textarea"
          placeholder={t('chat.jobFit.placeholder')}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={loading}
          rows={10}
          aria-label="Job description"
        />

        <button
          className="btn btn-primary"
          onClick={handleAssess}
          disabled={loading || !jobDescription.trim()}
        >
          <FileText size={20} />
          {loading ? t('chat.jobFit.analyzing') : t('chat.jobFit.assess')}
        </button>

        {error && (
          <div className="job-fit-error">
            <p>{error}</p>
          </div>
        )}

        {assessment && (
          <motion.div
            className="job-fit-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h4>Assessment Result</h4>
            <div className="job-fit-assessment">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h3 className="markdown-heading">{children}</h3>,
                  h2: ({ children }) => <h3 className="markdown-heading">{children}</h3>,
                  h3: ({ children }) => <h3 className="markdown-heading">{children}</h3>,
                  h4: ({ children }) => <h4 className="markdown-subheading">{children}</h4>,
                  p: ({ children }) => <p className="markdown-paragraph">{children}</p>,
                  ul: ({ children }) => <ul className="markdown-list">{children}</ul>,
                  ol: ({ children }) => <ol className="markdown-list markdown-list-ordered">{children}</ol>,
                  li: ({ children }) => <li className="markdown-list-item">{children}</li>,
                  strong: ({ children }) => <strong className="markdown-bold">{children}</strong>,
                  em: ({ children }) => <em className="markdown-italic">{children}</em>,
                  code: ({ children }) => <code className="markdown-code">{children}</code>,
                }}
              >
                {assessment}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
