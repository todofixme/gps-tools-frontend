import { useContext } from 'react'
import UploadContext from '../components/services/providers/upload/UploadContext'

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error(
      'useUploadContext has to be within <UploadContext.Provider>'
    )
  }

  return context
}
