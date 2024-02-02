import { createContext, useContext, useState } from 'react'
import { UploadedFile, UploadContextType } from '../@types/upload'
import API from '../components/common/gps-backend-api'
import { useFeedbackContext } from './FeedbackContext'

export const UploadContext = createContext<UploadContextType | null>(null)

export type UploadProviderType = {
  children: React.ReactNode
}

export const UploadProvider: React.FC<UploadProviderType> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFile>>([])
  const [mergedFile, setMergedFile] = useState<UploadedFile | null>(null)
  const { setError } = useFeedbackContext()

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    API.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) =>
        setUploadedFiles((prevState) => [...prevState, response.data[0]])
      )
      .catch(() => setError('Failed to upload files. Sorry!'))
  }

  const removeUploadedFile = async (file: UploadedFile) => {
    API.delete('/files/' + file.id).then(() => {
      const newFiles = [...uploadedFiles]
      newFiles.splice(newFiles.indexOf(file), 1)
      setUploadedFiles(newFiles)
    })
  }

  const mergeFiles = () => {
    const params = uploadedFiles.map((file) => 'fileId=' + file.id)
    const joinedParams = params.join('&')

    API.post('/merge?' + joinedParams).then((response) => {
      setMergedFile(response.data)
      uploadedFiles.forEach((file) => API.delete('/files/' + file.id))
      setUploadedFiles([])
    })
  }

  return (
    <UploadContext.Provider
      value={{
        uploadedFiles,
        setUploadedFiles,
        mergedFile,
        setMergedFile,
        uploadFile,
        removeUploadedFile,
        mergeFiles,
      }}
    >
      {children}
    </UploadContext.Provider>
  )
}

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error(
      'useUploadContext has to be within <UploadContext.Provider>'
    )
  }

  return context
}

export default UploadContext
