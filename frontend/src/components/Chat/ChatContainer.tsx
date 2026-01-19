import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Briefcase } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { TypingIndicator } from './TypingIndicator'
import { JobFitAssessment } from './JobFitAssessment'
import { chatAPI } from '../../services/api'
import { sessionService } from '../../services/session'
import type { ChatMessage as ChatMessageType } from '../../types/chat'

interface ChatContainerProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'chat' | 'jobFit'
}

export const ChatContainer = ({ isOpen, onClose, initialView = 'chat' }: ChatContainerProps) => {
  const { t, i18n } = useTranslation()
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showJobFit, setShowJobFit] = useState(initialView === 'jobFit')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Reset to initial view when dialog opens
  useEffect(() => {
    if (isOpen) {
      setShowJobFit(initialView === 'jobFit')
    }
  }, [isOpen, initialView])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessageType = {
        id: 'welcome',
        role: 'assistant',
        content: t('chat.welcome'),
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, t])

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const sessionId = sessionService.getOrCreateSessionId()
      const response = await chatAPI.sendMessage({
        message: content,
        sessionId,
        language: i18n.language,
      })

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : t('chat.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError(null)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chat-fab"
            onClick={() => onClose()}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t('chat.open')}
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <div className="chat-header-content">
                <h3 className="chat-title">{t('chat.title')}</h3>
                <p className="chat-subtitle">{t('chat.subtitle')}</p>
              </div>
              <div className="chat-header-actions">
                <button
                  className="chat-icon-button"
                  onClick={() => setShowJobFit(!showJobFit)}
                  aria-label={t('chat.jobFit.title')}
                  title={t('chat.jobFit.title')}
                >
                  <Briefcase size={20} />
                </button>
                <button
                  className="chat-icon-button"
                  onClick={onClose}
                  aria-label={t('chat.close')}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showJobFit ? (
                <JobFitAssessment key="job-fit" onBack={() => setShowJobFit(false)} />
              ) : (
                <motion.div
                  key="chat"
                  className="chat-content-wrapper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="chat-messages">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isLoading && (
                      <div className="chat-message chat-message-assistant">
                        <TypingIndicator />
                      </div>
                    )}
                    {error && (
                      <div className="chat-error">
                        <p>{error}</p>
                        <button onClick={handleRetry} className="btn btn-sm">
                          {t('chat.errorRetry')}
                        </button>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="chat-input-wrapper">
                    <ChatInput onSend={handleSendMessage} disabled={isLoading} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
