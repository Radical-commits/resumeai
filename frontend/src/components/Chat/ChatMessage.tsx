import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { ChatMessage as ChatMessageType } from '../../types/chat'

interface ChatMessageProps {
  message: ChatMessageType
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user'

  return (
    <motion.div
      className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chat-message-avatar">
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className="chat-message-content">
        {isUser ? (
          <p>{message.content}</p>
        ) : (
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
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  )
}
