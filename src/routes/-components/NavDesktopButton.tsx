import React from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

type NavDesktopButtonProps = {
  label: string
  linkTo: string
}

const NavDesktopButton: React.FC<NavDesktopButtonProps> = ({ label, linkTo }) => {
  const { t } = useTranslation()
  return (
    <Link to={linkTo} className="btn-nav mx-1 text-nav-theme">
      {t(label)}
    </Link>
  )
}

export default NavDesktopButton
