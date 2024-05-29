import React from 'react'
import { Link } from 'react-router-dom'
import useLanguage from '../../hooks/useLanguage'

type NavbarButtonProps = {
  label: string
  linkTo: string
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ label, linkTo }) => {
  const { getMessage } = useLanguage()
  return (
    <Link to={linkTo} className="btn-nav mx-1 text-nav-theme">
      {getMessage(label)}
    </Link>
  )
}

export default NavbarButton
