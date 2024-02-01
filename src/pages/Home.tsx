import { FaAngleRight } from 'react-icons/fa6'

const Home = () => (
  <div>
    <h1 className='text-6xl mb-4'>GPS Tools</h1>
    <p className='mb-4 text-2xl font-light'>
      First functionallity that can be used:{' '}
      <a href='/merge' className='flex'>
        <FaAngleRight />
        GPX-Merge
      </a>
    </p>
  </div>
)

export default Home
