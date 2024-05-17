import React, { useReducer } from 'react'
import feedbackReducer, { REMOVE_FEEDBACK, SET_FEEDBACK } from './FeedbackReducer'
import FeedbackContext from './FeedbackContext'

export type FeedbackProviderType = {
  children: React.ReactNode
}

export const FeedbackProvider: React.FC<FeedbackProviderType> = ({ children }) => {
  const initialState = null
  const [state, dispatchFeedback] = useReducer(feedbackReducer, initialState)

  const setError = (messageKey: string) => {
    dispatchFeedback({
      type: SET_FEEDBACK,
      payload: { type: 'error', messageKey },
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
