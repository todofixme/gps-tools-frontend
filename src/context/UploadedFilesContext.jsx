import { createContext, useState } from 'react'
import http from '../components/http-common'

const UploadedFilesContext = createContext()

export const UploadedFilesProvider = ({ children }) => {
  const [filesToUpload, setFilesToUpload] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await http
      .post('/upload/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((r) => r.data)

    setUploadedFiles((prevState) => [...prevState, result[0]])
    setFilesToUpload((prevState) => prevState.filter((f) => f !== file))
  }

  return (
    <UploadedFilesContext.Provider
      value={{
        filesToUpload,
        setFilesToUpload,
        uploadedFiles,
        setUploadedFiles,
        uploadFile,
      }}
    >
      {children}
    </UploadedFilesContext.Provider>
  )
}

export default UploadedFilesContext
