import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { useAppContext, useLanguage } from '../../hooks'

export const DownloadButton: React.FC = () => {
  const { getMessage } = useLanguage()
  const { setDownloadModalOpen } = useAppContext()

  return (
    <>
      <button
        className="lg:hidden flex flex-1 inline-button py-2 px-3 mx-2"
        onClick={() => setDownloadModalOpen(true)}
      >
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {getMessage('download')}
      </button>
      <button
        className="hidden lg:flex inline-button py-2 px-3 mx-2"
        onClick={() => setDownloadModalOpen(true)}
      >
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {getMessage('download')}
      </button>
    </>
  )
}
