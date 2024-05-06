import React, { useCallback, useMemo } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { Loading } from 'react-daisyui'
import { useUploadContext } from '../../hooks/useUploadContext'
import useLanguage from '../../hooks/useLanguage'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: 'secondary-content',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const UploadForm: React.FC = () => {
  const { uploadFile, mergedFile, isLoading } = useUploadContext()
  const { getMessage } = useLanguage()

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.map((file) => uploadFile(file))
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop })

  const style: DropzoneRootProps = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <>
      {isLoading && (
        <div className='mt-8'>
          <Loading size='md' />
        </div>
      )}

      {mergedFile === null && (
        <div className='my-7'>
          <section className='container'>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>
                  <FiUpload className='inline relative bottom-0.5' />{' '}
                  {getMessage('uploader_drop')}
                </p>
              ) : (
                <p>
                  <FiUpload className='inline relative bottom-0.5' />{' '}
                  {getMessage('uploader_description')}
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default UploadForm
