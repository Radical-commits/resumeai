import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Sparkles, Target } from 'lucide-react'
import { getResumeData } from '../data/resume'

interface HeroProps {
  onOpenChat: () => void
  onOpenJobFit: () => void
}

export const Hero = ({ onOpenChat, onOpenJobFit }: HeroProps) => {
  const { t, i18n } = useTranslation()
  const resumeData = getResumeData(i18n.language)

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Status Badge */}
          <div className="status-badge">
            <span className="status-dot"></span>
            {t('hero.statusBadge')}
          </div>

          {/* Name with Serif Font */}
          <h1 className="hero-name">{resumeData.personalInfo.name}</h1>

          {/* Title */}
          <p className="hero-title">{resumeData.personalInfo.title}</p>

          {/* Subtitle */}
          <p className="hero-subtitle">{resumeData.summary}</p>

          {/* Actions */}
          <div className="hero-actions">
            <motion.button
              className="btn btn-primary"
              onClick={onOpenJobFit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target size={20} />
              {t('hero.ctaJobFit')}
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={onOpenChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={20} />
              {t('hero.ctaChat')}
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  )
}
