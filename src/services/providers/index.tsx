import { PropsWithChildren } from 'react'
import { LanguageProvider } from './language/LanguageProvider'
import { FeedbackProvider } from './feedback/FeedbackProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider initialLanguage="en">
        <FeedbackProvider>{children}</FeedbackProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default Providers
