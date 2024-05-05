type FeedbackType = 'info' | 'success' | 'warning' | 'error' | undefined
export type FeedbackState = { type: FeedbackType; message: string } | null

export const SET_FEEDBACK = 'SET_FEEDBACK'
export const REMOVE_FEEDBACK = 'REMOVE_FEEDBACK'

type SetFeedbackAction = {
  type: typeof SET_FEEDBACK
  payload: FeedbackState
}

type RemoveFeedbackAction = {
  type: typeof REMOVE_FEEDBACK
}

type FeedbackAction = SetFeedbackAction | RemoveFeedbackAction

const feedbackReducer = (state: FeedbackState, action: FeedbackAction) => {
  switch (action.type) {
    case SET_FEEDBACK:
      return action.payload
    case REMOVE_FEEDBACK:
      return null
    default:
      return state
  }
}

export default feedbackReducer
