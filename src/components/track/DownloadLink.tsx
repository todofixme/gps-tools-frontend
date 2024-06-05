import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { GeoJsonObject } from 'geojson'
import { encodeToBase64 } from '../../utils/tools'
import useLanguage from '../../hooks/useLanguage'
import { Link } from 'react-router-dom'

type DownloadLinkProps = {
  trackId: string
  type: string
  trackname: string
  optimizeWaypoints: boolean
  geoJson?: GeoJsonObject | null
}

const DownloadLink: React.FC<DownloadLinkProps> = ({
  trackId,
  type,
  trackname,
  optimizeWaypoints,
  geoJson,
}) => {
  const { getMessage } = useLanguage()
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const linkTo: string =
    baseUrl +
    '/tracks/' +
    trackId +
    '?mode=dl&type=' +
    type +
    (optimizeWaypoints ? '&mode=opt' : '') +
    (trackname.length > 0 ? `&name=${encodeToBase64(trackname)}` : '') +
    (geoJson != null ? `&wp=${encodeToBase64(JSON.stringify(geoJson))}` : '')

  return (
    <>
      <Link to={linkTo} className="lg:hidden flex flex-1 inline-button py-2 px-3 mx-2">
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {type.toUpperCase()}
      </Link>
      <Link to={linkTo} className="hidden lg:flex inline-button py-2 px-3 mx-2">
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {getMessage('download_as')} {type.toUpperCase()}
      </Link>
    </>
  )
}

export default DownloadLink
