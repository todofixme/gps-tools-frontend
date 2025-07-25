import classNames from 'classnames'
import UploadForm from './UploadForm.tsx'
import MergeFiles from './MergeFiles.tsx'
import { UploadProvider } from '../../../services/providers/upload/UploadProvider.tsx'
import React, { useEffect } from 'react'
import useLanguage from '../../../hooks/useLanguage.ts'
import useAppContext from '../../../hooks/useAppContext.ts'

const ReloadModal: React.FC = () => {
  const { getMessage } = useLanguage()
  const { reloadModalOpen, setReloadModalOpen } = useAppContext()

  const onClose = () => {
    setReloadModalOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className={classNames(
        'fixed inset-0 z-1000 p-8 text-white bg-gray-600/90',
        `${reloadModalOpen ? 'block' : 'hidden'}`,
      )}
    >
      <div className="relative w-130 mx-auto mt-8">
        <button
          className="absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-700 cursor-pointer shadow-xl"
          onClick={() => onClose()}
          title={`${getMessage('reload_close')}`}
        >
          <span className="text-2xl leading-7 select-none">&times;</span>
        </button>
        <div className="overflow-hidden bg-gray-800 rounded shadow-xl px-5 pb-5">
          <UploadProvider>
            <UploadForm />
            <MergeFiles />
          </UploadProvider>
        </div>
      </div>
    </div>
  )
}

export default ReloadModal
