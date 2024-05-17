import useLanguage from '../../hooks/useLanguage'
import { Language } from '../../@types/language'

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage()

  return (
    <select
      className="select select-bordered select-sm w-min"
      defaultValue={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value as Language)}
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
  )
}

export default LanguageSelector
