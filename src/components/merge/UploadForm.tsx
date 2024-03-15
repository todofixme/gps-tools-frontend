import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { useUploadContext } from '../../context/UploadContext'
import { Loading } from 'react-daisyui'

const UploadForm: React.FC = () => {
  const { uploadFile, mergedFile, isLoading } = useUploadContext()

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.map((file) => uploadFile(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>
                  <FiUpload className='inline relative bottom-0.5' /> Drop the
                  files here ...
                </p>
              ) : (
                <p>
                  <FiUpload className='inline relative bottom-0.5' /> Drag 'n'
                  drop some files here, or click to select files
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
