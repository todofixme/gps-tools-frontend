import { useNavigate } from 'react-router-dom'

const ResetButton = () => {
  const navigateTo = useNavigate()
  return (
    <button className='btn btn-active m-7' onClick={() => navigateTo('/merge')}>
      Start working on a new file.
    </button>
  )
}

export default ResetButton
