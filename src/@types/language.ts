export type Language = 'en' | 'de'
export const defaultLanguage = 'en' as Language
export const languageIndexPathPattern = /^\/(en|de)\/?$/
export const languagePagePathPattern = /^\/(en|de)(\/.+)$/
