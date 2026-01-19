import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()

  return (
    <div className="home">
      <h1>{t('welcome')}</h1>
      <div className="content">
        <p>AI-powered resume website with chatbot coming soon...</p>
      </div>
    </div>
  )
}

export default Home
