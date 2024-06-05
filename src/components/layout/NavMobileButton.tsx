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
    <div className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700">
      <a
        onClick={() => setOpen((prev) => !prev)}
        className={'flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950'}
        href={linkTo}
      >
        <span className="flex gap-1 text-lg">{getMessage(label)}</span>
        {icon}
      </a>
    </div>
  )
}

export default NavMobileButton
