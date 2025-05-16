import React from 'react'
import useLanguage from '../../../hooks/useLanguage'
import { FaSyncAlt } from 'react-icons/fa'
import useAppContext from '../../../hooks/useAppContext.ts'

const ReloadButton: React.FC = () => {
  const { getMessage } = useLanguage()
  const { setReloadModalOpen } = useAppContext()

  return (
    <>
      <button
        className="lg:hidden flex flex-1 inline-button py-2 px-3 mx-2"
        onClick={() => setReloadModalOpen(true)}
      >
        <FaSyncAlt className="inline mr-1 relative -bottom-0.5" />
        {getMessage('reload_tracks_short')}
      </button>
      <button
        className="hidden lg:flex inline-button py-2 px-3 mx-2"
        onClick={() => setReloadModalOpen(true)}
      >
        <FaSyncAlt className="inline mr-1 relative -bottom-0.5" />
        {getMessage('reload_tracks')}
      </button>
    </>
  )
}

export default ReloadButton
