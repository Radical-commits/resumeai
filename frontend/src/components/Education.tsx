import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { GraduationCap, Award, Languages, FileText } from 'lucide-react'
import { getResumeData } from '../data/resume'

export const Education = () => {
  const { t, i18n } = useTranslation()
  const resumeData = getResumeData(i18n.language)

  return (
    <section id="education" className="section section-alt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('education.title')}</h2>

          <div className="education-grid">
            {/* Academic Degrees */}
            <motion.div
              className="education-section card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="education-header">
                <GraduationCap size={24} className="education-icon" />
                <h3 className="education-subtitle">{t('education.degrees')}</h3>
              </div>
              <ul className="education-list">
                {resumeData.education.map((edu, index) => (
                  <li key={index} className="education-item">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-location">{edu.location}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              className="education-section card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="education-header">
                <Award size={24} className="education-icon" />
                <h3 className="education-subtitle">{t('education.certifications')}</h3>
              </div>
              <ul className="education-list">
                {resumeData.certifications.map((cert, index) => (
                  <li key={index} className="education-item">
                    <h4 className="education-degree">{cert.name}</h4>
                    <p className="education-institution">{cert.issuer}</p>
                    {cert.year && <p className="education-year">{cert.year}</p>}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              className="education-section card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="education-header">
                <Languages size={24} className="education-icon" />
                <h3 className="education-subtitle">{t('education.languages')}</h3>
              </div>
              <ul className="education-list">
                {resumeData.languages.map((lang, index) => (
                  <li key={index} className="education-item">
                    <h4 className="education-degree">{lang.language}</h4>
                    <p className="education-institution">{lang.proficiency}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Patents */}
            {resumeData.patents && resumeData.patents.length > 0 && (
              <motion.div
                className="education-section card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="education-header">
                  <FileText size={24} className="education-icon" />
                  <h3 className="education-subtitle">{t('education.patents')}</h3>
                </div>
                <ul className="education-list">
                  {resumeData.patents.map((patent, index) => (
                    <li key={index} className="education-item">
                      <h4 className="education-degree">{patent.title}</h4>
                      <p className="education-institution">{patent.number}</p>
                      <p className="education-year">{patent.date}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
