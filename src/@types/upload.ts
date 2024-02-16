export interface UploadedFile {
  id: string
  filename: string
  mimeType: string
  href: string
  size: number
}

export type UploadContextType = {
  uploadedFiles: Array<UploadedFile>
  setUploadedFiles: (uploadedFiles: Array<UploadedFile>) => void
  mergedFile: UploadedFile | null
  setMergedFile: (mergedFile: UploadedFile | null) => void
  uploadFile: (fileToUpload: File) => void
  removeUploadedFile: (fileToRemove: UploadedFile) => void
  mergeFiles: () => void
  isLoading: Boolean
}
