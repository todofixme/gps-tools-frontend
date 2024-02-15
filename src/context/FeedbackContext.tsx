import { createContext, useContext, useReducer } from 'react'
import feedbackReducer, {
  FeedbackState,
  REMOVE_FEEDBACK,
  SET_FEEDBACK,
} from './FeedbackReducer'

type FeedbackContextType = {
  state: FeedbackState
  setError: (message: string) => void
  removeFeedback: () => void
}

const FeedbackContext = createContext<FeedbackContextType | null>(null)

export type FeedbackProviderType = {
  children: React.ReactNode
}

export const FeedbackProvider: React.FC<FeedbackProviderType> = ({
  children,
}) => {
  const initialState = null

  const [state, dispatchFeedback] = useReducer(feedbackReducer, initialState)

  const setError = (message: string) => {
    dispatchFeedback({
      type: SET_FEEDBACK,
      payload: { type: 'error', message },
    })

    setTimeout(() => dispatchFeedback({ type: REMOVE_FEEDBACK }), 5000)
  }

  const removeFeedback = () => {
    dispatchFeedback({ type: REMOVE_FEEDBACK })
  }

  return (
    <FeedbackContext.Provider value={{ state, setError, removeFeedback }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext)
  if (!context) {
    throw new Error(
      'useFeedbackContext has to be within <FeedbackContext.Provider>'
    )
  }

  return context
}

export default FeedbackContext
