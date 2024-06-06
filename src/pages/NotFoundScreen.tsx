import { FaAngleRight } from 'react-icons/fa6'
import { BsEmojiDizzy } from 'react-icons/bs'
import useLanguage from '../hooks/useLanguage'

const NotFoundScreen = () => {
  const { getMessage } = useLanguage()

  return (
    <div className="ml-2 md:ml-6 lg:ml-10 mt-8 text-base-content">
      <h1 className="text-6xl font-medium tracking-wide flex items-center">
        {getMessage('not_found_headline')}
        <BsEmojiDizzy className="ml-3" />
      </h1>
      <p className="mb-4 text-2xl font-light mt-8">
        {getMessage('not_found_text')}
        <br />
        {getMessage('not_found_back')}:
        <a href="/merge">
          <FaAngleRight className="inline" />
          <div className="inline font-bold">GPS-Tools</div>
        </a>
      </p>
    </div>
  )
}

export default NotFoundScreen
