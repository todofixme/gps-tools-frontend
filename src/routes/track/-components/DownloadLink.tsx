import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

type DownloadLinkProps = {
  trackId: string
  type: string
  optimizeWaypoints: boolean
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ trackId, type, optimizeWaypoints }) => {
  const { t } = useTranslation('merge')

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const linkTo: string =
    baseUrl +
    '/tracks/' +
    trackId +
    '?mode=dl&type=' +
    type +
    (optimizeWaypoints ? '&mode=opt' : '')

  return (
    <>
      <Link to={linkTo} className="lg:hidden flex flex-1 inline-button py-2 px-3 mx-2">
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {type.toUpperCase()}
      </Link>
      <Link to={linkTo} className="hidden lg:flex inline-button py-2 px-3 mx-2">
        <FiDownload className="inline mr-1 relative -bottom-0.5" />
        {t('download_as')} {type.toUpperCase()}
      </Link>
    </>
  )
}

export default DownloadLink
