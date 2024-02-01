import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { useUploadContext } from '../../context/UploadContext'

const UploadForm: React.FC = () => {
  const { uploadFile, mergedFile } = useUploadContext()

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.map((file) => uploadFile(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {mergedFile === null && (
        <div className='my-7'>
          <section className='container'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>
                  <FiUpload className='inline' /> Drop the files here ...
                </p>
              ) : (
                <p>
                  <FiUpload className='inline' /> Drag 'n' drop some files here,
                  or click to select files
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
