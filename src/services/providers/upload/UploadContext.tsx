import { createContext } from 'react'
import { UploadedFile } from '../../../@types/upload'

export type UploadContextType = {
  uploadedFiles: Array<UploadedFile>
  setUploadedFiles: (uploadedFiles: Array<UploadedFile>) => void
  mergedFile: UploadedFile | null
  setMergedFile: (mergedFile: UploadedFile | null) => void
  uploadFile: (fileToUpload: File) => void
  removeUploadedFile: (fileToRemove: UploadedFile) => void
  mergeFiles: () => Promise<string>
  isLoading: boolean
}

export const UploadContext = createContext<UploadContextType | null>(null)

export default UploadContext
