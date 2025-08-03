import React, { ReactNode } from 'react'

import LanguageContext from './LanguageContext'
import en from './data/en.json'
import de from './data/de.json'
import { Language } from '../../../@types/language'

export type LanguageProviderProps = {
  children: ReactNode
  language: Language
}

type Messages = { [messageKey: string]: string | string[] }
type LanguageDictionary = { [languageKey: string]: Messages }

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ language, children }) => {
  const dictionary: LanguageDictionary = { en, de }

  const getMessage = (messageKey: string) => {
    const message = dictionary[language][messageKey]
    if (!message) throw new Error(`MessageKey ${messageKey} not found in ${language}.json`)
    return message
  }

  return (
    <LanguageContext.Provider value={{ language, getMessage }}>{children}</LanguageContext.Provider>
  )
}
