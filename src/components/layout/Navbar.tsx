import React from 'react'
import { Link } from 'react-router-dom'
import { FaGlobe } from 'react-icons/fa'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'

type Theme = 'light' | 'dark'

const ThemeSwitcher = () => {
  const [theme, setTheme] = React.useState<Theme>('dark')
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  React.useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <label className='swap'>
      <input onClick={toggleTheme} type='checkbox' />
      <div className='swap-on'>
        <FaToggleOn className='text-2xl' />
      </div>
      <div className='swap-off'>
        <FaToggleOff className='text-2xl' />
      </div>
    </label>
  )
}

type Props = {
  title?: string
}

const Navbar: React.FC<Props> = ({ title }) => (
  <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
    <div className='container mx-auto'>
      <div className='flex-none px-2 mx-2'>
        <FaGlobe className='inline pr-2 text-3xl' />
        <Link to='/' className='text-lg font-bold align-middle'>
          {title}
        </Link>
      </div>

      <div className='flex-1 px-2 mx-2'>
        <div className='flex justify-end'>
          <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
            Home
          </Link>
          <Link to='/merge' className='btn btn-ghost btn-sm rounded-btn'>
            GPX-Merge
          </Link>
          <Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>
            About
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </nav>
)

Navbar.defaultProps = { title: 'GPS-Tools' }

export default Navbar
