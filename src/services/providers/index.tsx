import { PropsWithChildren } from 'react'
import { LanguageProvider } from './language/LanguageProvider'
import { FeedbackProvider } from './feedback/FeedbackProvider'

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <LanguageProvider initialLanguage="en">
      <FeedbackProvider>{children}</FeedbackProvider>
    </LanguageProvider>
  )
}

export default Providers
