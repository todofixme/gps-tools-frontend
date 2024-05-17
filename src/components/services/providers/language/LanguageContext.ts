import { createContext } from 'react'
import { Language } from '../../../../@types/language'

type LanguageContextType = {
  currentLanguage: Language
  changeLanguage: (language: Language) => void
  getMessage: (labelId: string) => string | Array<string>
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType)

export default LanguageContext
