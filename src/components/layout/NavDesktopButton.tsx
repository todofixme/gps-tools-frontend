import React from 'react'
import { Link } from '@tanstack/react-router'
import useLanguage from '../../hooks/useLanguage'

type NavDesktopButtonProps = {
  label: string
  linkTo: string
}

const NavDesktopButton: React.FC<NavDesktopButtonProps> = ({ label, linkTo }) => {
  const { getMessage } = useLanguage()
  return (
    <Link to={linkTo} className="btn-nav mx-1 text-nav-theme">
      {getMessage(label)}
    </Link>
  )
}

export default NavDesktopButton
