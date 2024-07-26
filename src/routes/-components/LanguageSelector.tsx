import i18next, { changeLanguage } from 'i18next'
import EnglishIcon from '../../icons/EnglishIcon'
import GermanIcon from '../../icons/GermanIcon'
import { useState } from 'react'

type Language = 'ENGLISH' | 'GERMAN'
const isGermanSelected = () =>
  i18next.resolvedLanguage === 'de' || i18next.resolvedLanguage?.startsWith('de-')

const LanguageSelector = () => {
  const [language, setLanguage] = useState<Language>(isGermanSelected() ? 'GERMAN' : 'ENGLISH')

  const toggleLanguage = () => {
    if (isGermanSelected()) {
      changeLanguage('en-GB')
      setLanguage('ENGLISH')
    } else {
      changeLanguage('de-DE')
      setLanguage('GERMAN')
    }
  }

  return (
    <label className="swap mx-3" aria-label="Language Switcher">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        onClick={toggleLanguage}
      />

      {language == 'GERMAN' && <GermanIcon className="w-6 h-6" />}
      {language == 'ENGLISH' && <EnglishIcon className="w-6 h-6" />}
    </label>
  )
}

export default LanguageSelector
