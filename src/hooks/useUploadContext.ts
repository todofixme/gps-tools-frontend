import { useContext } from 'react'
import UploadContext from '../components/services/context/UploadContext.tsx'

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error(
      'useUploadContext has to be within <UploadContext.Provider>'
    )
  }

  return context
}
