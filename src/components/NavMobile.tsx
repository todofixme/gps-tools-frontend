import { useRef, useState } from 'react'
import Hamburger from 'hamburger-react'
import { FaLightbulb, FaQuestion } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'
import { useClickAway } from 'react-use'
import { NavMobileButton } from '.'
import { useLanguage } from '../hooks'

export const NavMobile = () => {
  const { language } = useLanguage()
  const [isOpen, setOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => setOpen(false))

  return (
    <div ref={ref} className="md:hidden ml-2 mr-6 text-white">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} label="Mobile Menu" />
      {isOpen && (
        <div className="bg-footer fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 border-b border-b-white/20 z-10">
          <NavMobileButton
            label="home"
            linkTo={`/${language}`}
            icon={<FaHome />}
            setOpen={setOpen}
          />
          <NavMobileButton
            label="faq"
            linkTo={`/${language}/faq`}
            icon={<FaQuestion />}
            setOpen={setOpen}
          />
          <NavMobileButton
            label="about"
            linkTo={`/${language}/about`}
            icon={<FaLightbulb />}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  )
}
