import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { getResumeData } from '../data/resume'

export const Experience = () => {
  const { t, i18n } = useTranslation()
  const resumeData = getResumeData(i18n.language)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="experience" className="section section-alt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('experience.title')}</h2>

          <div className="timeline">
            {resumeData.experience.map((exp, index) => {
              // Create a unique ID for each company
              const companyId = `experience-${exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

              return (
                <motion.div
                  key={index}
                  id={companyId}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-content card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{exp.company}</h3>
                      <div className="timeline-meta">
                        <span className="timeline-company">
                          {exp.title}
                        </span>
                      </div>
                      <p className="timeline-date">
                        {exp.startDate} - {exp.current ? t('experience.present') : exp.endDate}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="expand-button"
                      aria-label={expandedIndex === index ? t('experience.viewLess') : t('experience.viewMore')}
                    >
                      {expandedIndex === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="timeline-details"
                      >
                        <ul className="achievements-list">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="achievement-item">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
