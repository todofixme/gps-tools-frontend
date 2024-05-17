import { useNavigate } from 'react-router-dom'
import useLanguage from '../../hooks/useLanguage'

const ResetButton = () => {
  const navigateTo = useNavigate()
  const { getMessage } = useLanguage()

  return (
    <button className="btn btn-active m-7" onClick={() => navigateTo('/merge')}>
      {getMessage('button_new_process')}
    </button>
  )
}

export default ResetButton
