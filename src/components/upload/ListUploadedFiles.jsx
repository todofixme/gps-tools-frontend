import { useCallback, useContext, useState } from 'react'
import UploadedFilesContext from '../../context/UploadedFilesContext'
import { FaDownload } from 'react-icons/fa'

function ListUploadedFiles() {
  const { uploadedFiles } = useContext(UploadedFilesContext)

  const files = uploadedFiles.map((file) => {
    const htmlUrl = 'http://localhost:7001/show/' + file.id

    return (
      <li key={file.id}>
        <a href={htmlUrl} target='_blank'>
          <div className='flex mt-2'>
            <FaDownload className='mr-2'/>
            {file.filename} - {file.size} bytes{' '}
          </div>
        </a>
      </li>
    )
  })

  return (
    <div>
      <h4>Uploaded files</h4>
      <ul>{files}</ul>
    </div>
  )
}

export default ListUploadedFiles
