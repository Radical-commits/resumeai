import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Check, Circle, X } from 'lucide-react'
import { getResumeData } from '../data/resume'

export const Skills = () => {
  const { t, i18n } = useTranslation()
  const resumeData = getResumeData(i18n.language)

  // Dynamically build skill categories from resume data
  const skillCategories: Array<{
    title: string
    type: string
    icon: any
    skills: string[]
  }> = []

  // Convert camelCase to Title Case for display
  const formatCategoryName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  // Iterate over skill categories dynamically
  if (resumeData.skills && typeof resumeData.skills === 'object') {
    const skillKeys = Object.keys(resumeData.skills)

    skillKeys.forEach((key, index) => {
      const skills = (resumeData.skills as any)[key]

      if (Array.isArray(skills) && skills.length > 0) {
        // Alternate between icons for visual variety
        const icons = [Check, Circle, Check]
        const types = ['strong', 'moderate', 'strong']

        skillCategories.push({
          title: formatCategoryName(key),
          type: types[index % types.length],
          icon: icons[index % icons.length],
          skills: skills,
        })
      }
    })
  }

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('skills.title')}</h2>

          <div className="skills-grid">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  className={`skill-card card skill-card-${category.type}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="skill-header">
                    <h3 className="skill-title">{category.title}</h3>
                  </div>
                  <ul className="skill-list">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        className="skill-list-item"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      >
                        <Icon size={16} className="skill-list-icon" />
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
