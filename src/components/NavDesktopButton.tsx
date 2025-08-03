import React from 'react'
import { Link } from '@tanstack/react-router'
import { useLanguage } from '../hooks'

type NavDesktopButtonProps = {
  label: string
  linkTo: string
}

export const NavDesktopButton: React.FC<NavDesktopButtonProps> = ({ label, linkTo }) => {
  const { getMessage } = useLanguage()
  return (
    <Link to={linkTo} className="btn-nav mx-1 text-nav-theme">
      {getMessage(label)}
    </Link>
  )
}
