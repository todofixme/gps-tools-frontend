import useLanguage from '../../hooks/useLanguage'
import EnglishIcon from '../../icons/EnglishIcon'
import GermanIcon from '../../icons/GermanIcon'

const LanguageSelector = () => {
  const { toggleLanguage } = useLanguage()

  return (
    <label className="swap mx-3 swap-flip" aria-label="Language Switcher">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        onClick={toggleLanguage}
      />

      <GermanIcon className="swap-on w-6 h-6" />
      <EnglishIcon className="swap-off w-6 h-6" />
    </label>
  )
}

export default LanguageSelector
