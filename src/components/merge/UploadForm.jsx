import { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadedFilesContext from '../../context/UploadedFilesContext'

function UploadForm() {
  const { uploadFile, mergedFile } = useContext(UploadedFilesContext)

  const onDrop = useCallback((acceptedFiles) =>
    acceptedFiles.map((file) => uploadFile(file))
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {mergedFile === null && (
        <div>
          <section className='container'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default UploadForm
