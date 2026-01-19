import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}

export default HomePage
