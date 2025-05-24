import classNames from 'classnames'
import React, { useEffect } from 'react'
import useLanguage from '../../../hooks/useLanguage.ts'
import DownloadLink from "./DownloadLink.tsx";
import { FaCircleInfo } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip'
import useAppContext from "../../../hooks/useAppContext.ts";

type DownloadModalProps = {
  trackId: string
}

const DownloadModal: React.FC<DownloadModalProps> = ({ trackId }) => {
  const { getMessage } = useLanguage()
  const { optimizeWaypoints, setOptimizeWaypoints, downloadModalOpen, setDownloadModalOpen } = useAppContext()

  const onClose = () => {
    setDownloadModalOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className={classNames(
        'fixed inset-0 z-1000 p-8 text-white bg-gray-600/90',
        `${downloadModalOpen ? 'block' : 'hidden'}`,
      )}
    >
      <div className="relative w-100 sm:w-130 mx-auto mt-8">
        <button
          className="absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-700 cursor-pointer shadow-xl"
          onClick={() => onClose()}
          title={`${getMessage('reload_close')}`}
        >
          <span className="text-2xl leading-7 select-none">&times;</span>
        </button>
        <div className="bg-gray-800 rounded shadow-xl p-5 space-y-3">
          <div className="text-2xl ml-2">{getMessage('download_track')}</div>
          <DownloadLink trackId={trackId} type="gpx"/>
          <DownloadLink trackId={trackId} type="tcx"/>
          <div className="ml-3 mr-5 flex items-center gap-2">
            <input
              id="optimize-waypoints-checkbox"
              type="checkbox"
              onChange={(e) => setOptimizeWaypoints(e.target.checked)}
              value=""
              className="w-4 h-4"
              checked={optimizeWaypoints}
            />
            <label htmlFor="optimize-waypoints-checkbox" className="ms-0">
              {getMessage('optimize_waypoints')}
            </label>
            <button
              type="button"
              data-tooltip-id="optimize-waypoints-tooltip"
              data-tooltip-content={getMessage('optimize_waypoints_tooltip') as string}
              className="cursor-pointer p-0 bg-transparent border-0 align-middle"
              aria-label={getMessage('optimize_waypoints_tooltip') as string}
            >
              <FaCircleInfo/>
            </button>
            <Tooltip id="optimize-waypoints-tooltip" className="max-w-xs break-words"/>
          </div>
          <hr className="mt-7 mb-5"/>
          <div className="text-2xl ml-2">{getMessage('download_waypoints')}</div>
          <DownloadLink trackId={trackId} type="points"/>
        </div>
      </div>
    </div>
  )
}

export default DownloadModal
