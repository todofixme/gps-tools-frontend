import NavDesktopButton from './NavDesktopButton'

const NavDesktop = () => {
  return (
    <div className="hidden md:flex mr-6">
      <NavDesktopButton label="home" linkTo="/" />
      <NavDesktopButton label="faq" linkTo="/faq" />
      <NavDesktopButton label="about" linkTo="/about" />
    </div>
  )
}

export default NavDesktop
