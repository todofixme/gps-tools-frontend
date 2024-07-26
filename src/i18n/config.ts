import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import commonEn from './en/common.json'
import mergeEn from './en/merge.json'
import errorEn from './en/error.json'
import aboutEn from './en/about.json'
import faqEn from './en/faq.json'
import commonDe from './de/common.json'
import mergeDe from './de/merge.json'
import errorDe from './de/error.json'
import aboutDe from './de/about.json'
import faqDe from './de/faq.json'

export const defaultNS = 'common'

use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        common: commonEn,
        merge: mergeEn,
        error: errorEn,
        about: aboutEn,
        faq: faqEn,
      },
      de: {
        common: commonDe,
        merge: mergeDe,
        error: errorDe,
        about: aboutDe,
        faq: faqDe,
      },
    },
    defaultNS: defaultNS,
  })
