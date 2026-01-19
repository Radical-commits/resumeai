import { useState, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')

  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage)
      setMessage('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder={t('chat.placeholder')}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        aria-label="Chat message input"
      />
      <button
        className="chat-send-button"
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        aria-label={t('chat.send')}
      >
        <Send size={20} />
      </button>
    </div>
  )
}
