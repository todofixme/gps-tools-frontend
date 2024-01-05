import { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadedFilesContext from '../../context/UploadedFilesContext'

function UploadForm() {
  const { filesToUpload, setFilesToUpload, uploadFile, mergedFile } =
    useContext(UploadedFilesContext)

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFilesToUpload([...filesToUpload, ...acceptedFiles])
    },
    [filesToUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeFile = (file) => () => {
    const newFiles = [...filesToUpload]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFilesToUpload(newFiles)
  }

  const removeAllFiles = () => {
    setFilesToUpload([])
  }

  const files = filesToUpload.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes{' '}
      <button onClick={removeFile(file)}>Remove File</button>
    </li>
  ))

  async function handleOnSubmit(e) {
    e.preventDefault()

    if (typeof filesToUpload === 'undefined') return
    if (filesToUpload.length == 0) return

    filesToUpload.map((file) => {
      uploadFile(file)
    })
  }

  return (
    <>
      {mergedFile === null && (
        <form onSubmit={handleOnSubmit}>
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

              {files.length > 0 && (
                <aside>
                  <h4>Files to upload</h4>
                  <ul>{files}</ul>
                </aside>
              )}
            </section>
          </div>

          <div>
            <button className='btn {filesToUpload.length == 0 ? "btn-disabled" : "btn-active"}'>
              Submit
            </button>
          </div>

          <div>
            {filesToUpload.length > 0 && (
              <button onClick={removeAllFiles}>Remove All</button>
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default UploadForm
