import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { getResumeData } from '../data/resume'

export const About = () => {
  const { t, i18n } = useTranslation()
  const resumeData = getResumeData(i18n.language)

  return (
    <section id="about" className="section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('about.title')}</h2>

          <div className="about-content">
            <p className="about-summary">{resumeData.summary}</p>

            {resumeData.highlights && resumeData.highlights.length > 0 && (
              <div className="highlights">
                <h3 className="highlights-title">{t('about.highlights')}</h3>
                <ul className="highlights-list">
                  {resumeData.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      className="highlight-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <CheckCircle size={20} className="highlight-icon" />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
