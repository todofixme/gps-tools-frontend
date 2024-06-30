import useLanguage from '../../../../hooks/useLanguage'
import { useParams } from '@tanstack/react-router'
import AboutScreen from '../../../about/-screens/AboutScreen'

const LangAboutScreen = () => {
  const { setKnownLanguage } = useLanguage()
  const { lang } = useParams({ from: '/$lang/about/' })
  setKnownLanguage(lang)

  return <AboutScreen />
}

export default LangAboutScreen
