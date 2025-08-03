import { Alert, Button } from '.'
import { useFeedbackContext, useLanguage } from '../hooks'

export const Feedback = () => {
  const { state, removeFeedback } = useFeedbackContext()
  const { getMessage } = useLanguage()

  return (
    state !== null && (
      <div className="toast toast-top toast-start">
        <Alert
          className="mx-2 md:mx-6 lg:mx-10 my-8 min-w-lg lg:min-w-xl"
          status={state.type}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          <span>{getMessage(state.messageKey)}</span>
          <Button size="sm" onClick={removeFeedback}>
            {getMessage('close')}
          </Button>
        </Alert>
      </div>
    )
  )
}
