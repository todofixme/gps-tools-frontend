import { PropsWithChildren } from 'react'
import { AppProvider } from './app/AppProvider.tsx'
import { FeedbackProvider } from './feedback/FeedbackProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <FeedbackProvider>{children}</FeedbackProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default Providers
