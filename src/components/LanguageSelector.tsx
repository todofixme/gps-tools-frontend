import { EnglishIcon, GermanIcon } from '../icons'
import { useLanguage } from '../hooks'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { Language } from '../@types/language.ts'

export const LanguageSelector = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const routerState = useRouterState()

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'de' : 'en'
    const currentPath = routerState.location.pathname
    const pathWithoutLanguage = currentPath.replace(/^\/(en|de)/, '')
    const newPath = `/${newLanguage}${pathWithoutLanguage}`

    navigate({ to: newPath })
  }

  return (
    <label className="swap mx-3" aria-label="Language Switcher">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        onClick={toggleLanguage}
      />
      {language === 'en' ? <EnglishIcon className="w-6 h-6" /> : <GermanIcon className="w-6 h-6" />}
    </label>
  )
}
