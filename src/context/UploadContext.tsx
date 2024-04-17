import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadContextType, UploadedFile } from '../@types/upload'
import API from '../components/common/gps-backend-api'
import { useFeedbackContext } from './FeedbackContext'

export const UploadContext = createContext<UploadContextType | null>(null)

export type UploadProviderType = {
  children: React.ReactNode
}

export const UploadProvider: React.FC<UploadProviderType> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFile>>([])
  const [mergedFile, setMergedFile] = useState<UploadedFile | null>(null)
  const [isLoading, setLoading] = useState<Boolean>(false)
  const { setError } = useFeedbackContext()
  const navigate = useNavigate()

  const uploadFile = async (file: File) => {
    setLoading(true)

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
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setError('The backend server is not available at the moment. Sorry!')
        } else if (error.code === 'ERR_BAD_REQUEST') {
          setError("Couldn't process some files. Was it really GPS data?")
        } else {
          setError('Failed to upload files. Sorry!')
        }
      })
      .finally(() => setLoading(false))
  }

  const removeUploadedFile = async (file: UploadedFile) => {
    API.delete('/files/' + file.id)
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setError('The backend server is not available at the moment. Sorry!')
        } else if (error.code === 'ERR_BAD_REQUEST') {
          setError('Something went wrong. Sorry!')
        } else {
          setError('Failed to delete file. Sorry!')
        }
      })
      .finally(() => {
        const newFiles = [...uploadedFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setUploadedFiles((oldFiles) => {
          const newFiles = [...oldFiles]
          newFiles.splice(newFiles.indexOf(file), 1)
          return newFiles
        })
      })
  }

  const mergeFiles = () => {
    if (uploadedFiles.length == 1) {
      // no need to merge
      setMergedFile(uploadedFiles[0])
      setUploadedFiles([])
      navigate('/track/' + uploadedFiles[0].id)
    } else {
      const params = uploadedFiles.map((file) => 'fileId=' + file.id)
      const joinedParams = params.join('&')

      API.post('/merge?' + joinedParams)
        .then((response) => {
          setMergedFile(response.data)
          uploadedFiles.forEach((file) => API.delete('/files/' + file.id))
          setUploadedFiles([])
          navigate('/track/' + response.data.id)
        })
        .catch((error) => {
          if (error.code === 'ERR_NETWORK') {
            setError(
              'The backend server is not available at the moment. Sorry!'
            )
          } else if (error.code === 'ERR_BAD_REQUEST') {
            const grammaticalNumber =
              uploadedFiles.length == 1 ? 'file' : 'files'
            setError(
              `The ${grammaticalNumber} could not be found on the server. Please upload again!`
            )
            uploadedFiles.map((file) => removeUploadedFile(file))
          } else {
            setError('Failed to merge files. Sorry!')
          }
        })
    }
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
        isLoading,
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
