import { createContext, useState } from 'react'
import http from '../components/http-common'

const UploadedFilesContext = createContext()

export const UploadedFilesProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [mergedFile, setMergedFile] = useState(null)

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await http
      .post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((r) => r.data)

    setUploadedFiles((prevState) => [...prevState, result[0]])
  }

  return (
    <UploadedFilesContext.Provider
      value={{
        uploadedFiles,
        setUploadedFiles,
        mergedFile,
        setMergedFile,
        uploadFile,
      }}
    >
      {children}
    </UploadedFilesContext.Provider>
  )
}

export default UploadedFilesContext
