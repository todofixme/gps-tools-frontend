import React, { useState } from 'react'
import { UploadedFile } from '../../../@types/upload'
import { useFeedbackContext } from '../../../hooks/useFeedbackContext'
import { useNavigate } from '@tanstack/react-router'
import API from '../../backend/gps-backend-api'
import { UploadContext } from './UploadContext'

export type UploadProviderType = {
  children: React.ReactNode
}

export const UploadProvider: React.FC<UploadProviderType> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFile>>([])
  const [mergedFile, setMergedFile] = useState<UploadedFile | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { setError } = useFeedbackContext()
  const navigate = useNavigate()

  const uploadFile = async (file: File) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    API.post('/tracks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => setUploadedFiles((prevState) => [...prevState, response.data[0]]))
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setError('error_backend_server_na')
        } else if (error.code === 'ERR_BAD_REQUEST') {
          setError('error_not_gps_data')
        } else {
          setError('error_upload_failure')
        }
      })
      .finally(() => setLoading(false))
  }

  const removeUploadedFile = async (file: UploadedFile) => {
    API.delete('/tracks/' + file.id)
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setError('error_backend_server_na')
        } else if (error.code === 'ERR_BAD_REQUEST') {
          setError('error_generic')
        } else {
          setError('error_delete')
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
      navigate({ to: '/track/' + uploadedFiles[0].id })
    } else {
      const params = uploadedFiles.map((file) => 'trackIds=' + file.id)
      const joinedParams = params.join('&')

      API.post('/merge?' + joinedParams)
        .then((response) => {
          setMergedFile(response.data)
          setUploadedFiles([])
          navigate({ to: '/track/' + response.data.id })
        })
        .catch((error) => {
          if (error.code === 'ERR_NETWORK') {
            setError('error_backend_server_na')
          } else if (error.code === 'ERR_BAD_REQUEST') {
            uploadedFiles.length == 1
              ? setError('error_download_failure_sn')
              : setError('error_download_failure_pl')
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
