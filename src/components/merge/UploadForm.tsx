import React, { useCallback, useMemo } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { Loading } from '../.'
import { useLanguage, useUploadContext } from '../../hooks'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 16,
  borderStyle: 'dashed',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#06D26A',
  borderWidth: 3,
  borderStyle: 'solid',
}

const acceptStyle = {
  borderColor: '#06D26A',
  borderWidth: 3,
  borderStyle: 'solid',
}

const rejectStyle = {
  borderColor: '#06D26A',
  borderWidth: 3,
  borderStyle: 'solid',
}

export const UploadForm: React.FC = () => {
  const { uploadFile, uploadedFiles, mergedFile, isLoading } = useUploadContext()
  const { getMessage } = useLanguage()

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.map((file) => uploadFile(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'application/gpx+xml': ['.gpx'],
        'application/geo+json': ['.json'],
        'application/octet-stream': ['.fit', '.tcx'],
      },
    })

  const style: DropzoneRootProps = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )

  return (
    <>
      {isLoading && (
        <div className="mt-8">
          <Loading size="md" />
        </div>
      )}

      {mergedFile === null && (
        <div className="my-7">
          <section className="container">
            <div
              {...getRootProps({ style })}
              className="text-base-content dropzone w-80 sm:w-[480px]"
            >
              <input {...getInputProps()} aria-label="File Upload" />
              {isDragActive ? (
                <>
                  <FiUpload
                    className={
                      uploadedFiles.length > 0
                        ? 'highlight-color inline relative bottom-0.5 text-5xl mt-1 mb-2'
                        : 'highlight-color inline relative bottom-0.5 text-6xl mt-8 mb-8'
                    }
                  />
                  {getMessage('uploader_drop')}
                </>
              ) : (
                <>
                  <FiUpload
                    className={
                      uploadedFiles.length > 0
                        ? 'highlight-color inline relative bottom-0.5 text-5xl mt-1 mb-2'
                        : 'highlight-color inline relative bottom-0.5 text-6xl mt-8 mb-8'
                    }
                  />
                  {getMessage('uploader_description')}
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  )
}
