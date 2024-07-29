import { FaAngleRight } from 'react-icons/fa6'
import { BsEmojiDizzy } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const NotFoundScreen = () => {
  const { t } = useTranslation('error')

  return (
    <div className="ml-2 md:ml-6 lg:ml-10 mt-8 text-base-content">
      <h1 className="text-6xl font-medium tracking-wide flex items-center">
        {t('not_found.headline')}
        <BsEmojiDizzy className="ml-3" />
      </h1>
      <p className="mb-4 text-2xl font-light mt-8">
        {t('not_found.text')}
        <br />
        {t('not_found.back')}:
        <a href="/">
          <FaAngleRight className="inline" />
          <div className="inline font-bold">GPS-Tools</div>
        </a>
      </p>
    </div>
  )
}

export default NotFoundScreen
