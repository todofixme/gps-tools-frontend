import { useContext } from 'react'
import FeedbackContext from '../components/services/context/FeedbackContext.tsx'

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext)
  if (!context) {
    throw new Error(
      'useFeedbackContext has to be within <FeedbackContext.Provider>'
    )
  }

  return context
}
