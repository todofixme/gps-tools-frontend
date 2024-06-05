import NavDesktopButton from './NavDesktopButton'

const NavDesktop = () => {
  return (
    <div className="hidden md:flex flex-1 justify-end mr-6">
      <NavDesktopButton label="home" linkTo="/" />
      <NavDesktopButton label="faq" linkTo="/faq" />
      <NavDesktopButton label="about" linkTo="/about" />
    </div>
  )
}

export default NavDesktop
