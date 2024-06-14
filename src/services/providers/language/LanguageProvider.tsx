import React, { ReactNode, useState } from 'react'

import LanguageContext from './LanguageContext'
import en from './data/en.json'
import de from './data/de.json'
import { Language } from '../../../@types/language'

export type LanguageProviderProps = {
  language: Language
  children: ReactNode
}
type Messages = { [messageKey: string]: string | string[] }
type LanguageDictionary = { [languageKey: string]: Messages }

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ language, children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language)
  const changeLanguage = (language: Language) => setCurrentLanguage(language)

  const dictionary: LanguageDictionary = { en, de }

  const getMessage = (messageKey: string) => {
    const message = dictionary[currentLanguage][messageKey]
    if (!message) throw new Error(`MessageKey ${messageKey} not found in ${currentLanguage}.json`)
    return message
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, getMessage }}>
      {children}
    </LanguageContext.Provider>
  )
}
