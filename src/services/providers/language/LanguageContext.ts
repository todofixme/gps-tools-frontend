import { createContext } from 'react'
import { Language } from '../../../@types/language'

type LanguageContextType = {
  language: Language
  toggleLanguage: () => void
  getMessage: (labelId: string) => string | Array<string>
  setKnownLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType)

export default LanguageContext
