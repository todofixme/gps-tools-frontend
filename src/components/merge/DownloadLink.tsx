import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { useUploadContext } from '../../context/UploadContext'

type DownloadLinkProps = {
  type: string
  trackname: string
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ type, trackname }) => {
  const { mergedFile } = useUploadContext()

  if (mergedFile !== null) {
    return (
      <a
        href={
          mergedFile.href +
          '?mode=dl&type=' +
          type +
          (trackname.length > 0 ? `&name=${trackname}` : '')
        }
      >
        <FiDownload className='inline mr-1' />
        Download as {type.toUpperCase()}
      </a>
    )
  } else {
    return <></>
  }
}

export default DownloadLink
