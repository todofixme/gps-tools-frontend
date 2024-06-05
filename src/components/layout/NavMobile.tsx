import { useRef, useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { FaLightbulb, FaQuestion } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'
import { useClickAway } from 'react-use'
import NavMobileButton from './NavMobileButton'

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => setOpen(false))

  return (
    <div ref={ref} className="md:hidden ml-2 mr-6 text-white">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      {isOpen && (
        <div className="bg-footer fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 border-b border-b-white/20 z-10">
          <NavMobileButton label="home" linkTo="/" icon={<FaHome />} setOpen={setOpen} />
          <NavMobileButton label="faq" linkTo="/faq" icon={<FaQuestion />} setOpen={setOpen} />
          <NavMobileButton label="about" linkTo="/about" icon={<FaLightbulb />} setOpen={setOpen} />
        </div>
      )}
    </div>
  )
}

export default NavMobile
