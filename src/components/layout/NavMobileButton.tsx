import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import useLanguage from '../../hooks/useLanguage'
import { Link } from 'react-router-dom'

type NavMobileButtonProps = {
  label: string
  linkTo: string
  icon: ReactElement
  setOpen: Dispatch<SetStateAction<boolean>>
}

const NavMobileButton: React.FC<NavMobileButtonProps> = ({ label, linkTo, icon, setOpen }) => {
  const { getMessage } = useLanguage()
  return (
    <div className="text-base-content text-xl">
      <Link
        onClick={() => setOpen((prev) => !prev)}
        className={'flex items-center justify-between w-full p-5'}
        to={linkTo}
      >
        <span className="flex gap-1">{getMessage(label)}</span>
        {icon}
      </Link>
    </div>
  )
}

export default NavMobileButton
