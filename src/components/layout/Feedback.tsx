import { useFeedbackContext } from '../../context/FeedbackContext'
import { Alert, Button } from 'react-daisyui'

function Feedback() {
  const { state, removeFeedback } = useFeedbackContext()

  const handleRemoveFeedback = () => {
    removeFeedback()
  }

  return (
    state !== null && (
      <Alert status={state.type}>
        <Button color='ghost' onClick={() => handleRemoveFeedback()}>
          X
        </Button>
        <div className='w-full flex-row justify-between gap-2'>
          <h3>{state.message}</h3>
        </div>
      </Alert>
    )
  )
}

export default Feedback
