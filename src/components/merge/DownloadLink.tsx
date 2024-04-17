import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { GeoJsonObject } from 'geojson'
import { encodeToBase64 } from '../common/tools.ts'

type DownloadLinkProps = {
  fileId: string
  type: string
  trackname: string
  optimizeWaypoints: boolean
  geoJson?: GeoJsonObject | null
}

const DownloadLink: React.FC<DownloadLinkProps> = ({
  fileId,
  type,
  trackname,
  optimizeWaypoints,
  geoJson,
}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  return (
    <a
      href={
        baseUrl +
        '/files/' +
        fileId +
        '?mode=dl&type=' +
        type +
        (optimizeWaypoints ? '&mode=opt' : '') +
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
}

export default DownloadLink
