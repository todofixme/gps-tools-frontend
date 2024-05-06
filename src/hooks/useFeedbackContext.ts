import { useContext } from 'react'
import FeedbackContext from '../components/services/providers/feedback/FeedbackContext'

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext)
  if (!context) {
    throw new Error(
      'useFeedbackContext has to be within <FeedbackContext.Provider>'
    )
  }

  return context
}
