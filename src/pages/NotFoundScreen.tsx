import { FaAngleRight } from 'react-icons/fa6'
import { BsEmojiDizzy } from 'react-icons/bs'

const NotFoundScreen = () => (
  <div>
    <h1 className='text-6xl mb-4 flex'>
      Not Found
      <BsEmojiDizzy className='ml-3' />
    </h1>
    <div className=''>
      <p className='mb-4 text-2xl font-light'>
        Whatever you were looking for, I couldn't find it. But have you seen
        this already:
        <a href='/merge'>
          <FaAngleRight className='inline' />
          <div className='inline font-bold'>GPS-Tools</div>
        </a>{' '}
        ?
      </p>
    </div>
  </div>
)

export default NotFoundScreen
