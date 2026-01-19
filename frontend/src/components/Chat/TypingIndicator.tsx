import { motion } from 'framer-motion'

export const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <motion.span
        className="typing-dot"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.span
        className="typing-dot"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.span
        className="typing-dot"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  )
}
