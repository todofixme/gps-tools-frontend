import useLanguage from '../../hooks/useLanguage'
import { Language } from '../../@types/language'

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage()

  return (
    <select
      className="select bg-transparent text-white rounded-full outline-none hover:outline-1 hover:outline-white select-sm mx-1"
      defaultValue={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value as Language)}
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
  )
}

export default LanguageSelector
