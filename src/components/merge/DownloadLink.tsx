import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { useUploadContext } from '../../context/UploadContext'
import { GeoJsonObject } from 'geojson'
import { encodeToBase64 } from '../common/tools.ts'

type DownloadLinkProps = {
  type: string
  trackname: string
  geoJson?: GeoJsonObject | null
}

const DownloadLink: React.FC<DownloadLinkProps> = ({
  type,
  trackname,
  geoJson,
}) => {
  const { mergedFile } = useUploadContext()

  if (mergedFile !== null) {
    return (
      <a
        href={
          mergedFile.href +
          '?mode=dl&type=' +
          type +
          (trackname.length > 0 ? `&name=${trackname}` : '') +
          (geoJson != null
            ? `&wp=${encodeToBase64(JSON.stringify(geoJson))}`
            : '')
        }
      >
        <FiDownload className='inline mr-1 relative bottom-0.5' />
        Download as {type.toUpperCase()}
      </a>
    )
  } else {
    return <></>
  }
}

export default DownloadLink
