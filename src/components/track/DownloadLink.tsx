import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { GeoJsonObject } from 'geojson'
import { encodeToBase64 } from '../../utils/tools'
import useLanguage from '../../hooks/useLanguage'

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
  const { getMessage } = useLanguage()
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  return (
    <button className="btn btn-active mx-1">
      <a
        href={
          baseUrl +
          '/files/' +
          fileId +
          '?mode=dl&type=' +
          type +
          (optimizeWaypoints ? '&mode=opt' : '') +
          (trackname.length > 0 ? `&name=${encodeToBase64(trackname)}` : '') +
          (geoJson != null ? `&wp=${encodeToBase64(JSON.stringify(geoJson))}` : '')
        }
      >
        <FiDownload className="inline mr-1 relative bottom-0.5" />
        {getMessage('download_as')} {type.toUpperCase()}
      </a>
    </button>
  )
}

export default DownloadLink
