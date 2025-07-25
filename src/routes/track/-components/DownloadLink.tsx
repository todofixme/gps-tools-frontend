import React from 'react'
import { FiDownload } from 'react-icons/fi'
import useLanguage from '../../../hooks/useLanguage'
import { Link } from '@tanstack/react-router'
import useAppContext from '../../../hooks/useAppContext.ts'

type DownloadLinkProps = {
  trackId: string
  type: string
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ trackId, type }) => {
  const { getMessage } = useLanguage()
  const { optimizeWaypoints } = useAppContext()
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const [linkTo, downloadAs] =
    type === 'points'
      ? [`${baseUrl}/tracks/${trackId}/points?mode=dl`, 'GeoJSON']
      : [
          `${baseUrl}/tracks/${trackId}?mode=dl&type=${type}` +
            (optimizeWaypoints ? '&mode=opt' : ''),
          type.toUpperCase(),
        ]

  return (
    <>
      <Link to={linkTo} className="sm:hidden flex flex-1 inline-button py-2 px-3 mx-2">
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {type.toUpperCase()}
      </Link>
      <Link to={linkTo} className="hidden sm:flex inline-button py-2 px-3 mx-2">
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {getMessage('download_as')} {downloadAs}
      </Link>
    </>
  )
}

export default DownloadLink
