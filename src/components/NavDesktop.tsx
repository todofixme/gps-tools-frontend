import { NavDesktopButton } from '.'
import { useLanguage } from '../hooks'

export const NavDesktop = () => {
  const { language } = useLanguage()
  return (
    <div className="hidden md:flex mr-6">
      <NavDesktopButton label="home" linkTo={`/${language}`} />
      <NavDesktopButton label="faq" linkTo={`/${language}/faq`} />
      <NavDesktopButton label="about" linkTo={`/${language}/about`} />
    </div>
  )
}
