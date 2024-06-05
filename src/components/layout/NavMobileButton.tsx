import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import useLanguage from '../../hooks/useLanguage'

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
      <a
        onClick={() => setOpen((prev) => !prev)}
        className={'flex items-center justify-between w-full p-5'}
        href={linkTo}
      >
        <span className="flex gap-1">{getMessage(label)}</span>
        {icon}
      </a>
    </div>
  )
}

export default NavMobileButton
