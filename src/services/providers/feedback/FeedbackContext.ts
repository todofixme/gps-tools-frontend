import { createContext } from 'react'
import { FeedbackState } from './FeedbackReducer'

type FeedbackContextType = {
  state: FeedbackState
  setError: (message: string) => void
  removeFeedback: () => void
}

const FeedbackContext = createContext<FeedbackContextType | null>(null)

export default FeedbackContext
