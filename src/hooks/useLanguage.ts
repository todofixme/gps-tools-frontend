import { useContext } from 'react'
import LanguageContext from '../components/services/providers/language/LanguageContext'

const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')

  return context
}

export default useLanguage
