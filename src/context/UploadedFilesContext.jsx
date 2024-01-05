import { createContext, useState } from 'react'
import API from '../components/http-common'

const UploadedFilesContext = createContext()

export const UploadedFilesProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [mergedFile, setMergedFile] = useState(null)

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await API.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((r) => r.data)

    setUploadedFiles((prevState) => [...prevState, result[0]])
  }

  const removeUploadedFile = async (file) => {
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
    <UploadedFilesContext.Provider
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
    </UploadedFilesContext.Provider>
  )
}

export default UploadedFilesContext
