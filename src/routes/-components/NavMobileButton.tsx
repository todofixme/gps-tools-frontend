import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

type NavMobileButtonProps = {
  label: string
  linkTo: string
  icon: ReactElement
  setOpen: Dispatch<SetStateAction<boolean>>
}

const NavMobileButton: React.FC<NavMobileButtonProps> = ({ label, linkTo, icon, setOpen }) => {
  const { t } = useTranslation()
  return (
    <div className="text-base-content text-xl">
      <Link
        onClick={() => setOpen((prev) => !prev)}
        className={'flex items-center justify-between w-full p-5'}
        to={linkTo}
      >
        <span className="flex gap-1">{t(label)}</span>
        {icon}
      </Link>
    </div>
  )
}

export default NavMobileButton
