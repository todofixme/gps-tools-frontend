import { Alert, Button } from 'react-daisyui'
import { useFeedbackContext } from '../../hooks/useFeedbackContext.ts'

function Feedback() {
  const { state, removeFeedback } = useFeedbackContext()

  const handleRemoveFeedback = () => {
    removeFeedback()
  }

  return (
    state !== null && (
      <Alert
        className='my-10'
        status={state.type}
        icon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        }
      >
        <span>{state.message}</span>
        <Button size='sm' onClick={() => handleRemoveFeedback()}>
          Close
        </Button>
      </Alert>
    )
  )
}

export default Feedback
