import { useNavigate } from 'react-router-dom'

const ResetButton = () => {
  const navigate = useNavigate()
  return (
    <button className='btn btn-active m-7' onClick={() => navigate('/merge')}>
      Start working on a new file.
    </button>
  )
}

export default ResetButton
