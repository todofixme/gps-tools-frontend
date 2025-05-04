import { PropsWithChildren } from 'react'
import { AppProvider } from './app/AppProvider.tsx'
import { LanguageProvider } from './language/LanguageProvider'
import { FeedbackProvider } from './feedback/FeedbackProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider initialLanguage="en">
        <AppProvider>
          <FeedbackProvider>{children}</FeedbackProvider>
        </AppProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default Providers
