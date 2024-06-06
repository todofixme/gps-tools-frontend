import DownloadLink from './DownloadLink'
import { FaCircleInfo, FaEye, FaEyeSlash, FaPenToSquare } from 'react-icons/fa6'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import React, { useMemo, useRef, useState } from 'react'
import { WayPoint } from '../../@types/gps'
import { generateGeoJson, sanitizeFilename } from '../../utils/tools'
import useLanguage from '../../hooks/useLanguage'

type TrackHeaderProps = {
  trackId: string
  markerPositions: WayPoint[]
  trackname: string
  setTrackname: React.Dispatch<React.SetStateAction<string>>
  showPolyline: boolean
  setShowPolyline: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackHeader: React.FC<TrackHeaderProps> = ({
  trackId,
  markerPositions,
  trackname,
  setTrackname,
  showPolyline,
  setShowPolyline,
}) => {
  const [optimizeWaypoints, setOptimizeWaypoints] = useState<boolean>(false)
  const tracknameInputFieldRef: React.RefObject<HTMLElement> = useRef(null)
  const tracknameRef = useRef('')
  const { getMessage } = useLanguage()
  const markerGeoJson = useMemo(() => generateGeoJson(markerPositions), [markerPositions])

  useMemo(() => {
    tracknameRef.current = trackname
  }, [])

  const handleChange = (evt: ContentEditableEvent) => {
    tracknameRef.current = evt.currentTarget.innerHTML
  }

  const handleBlur = () => {
    const sanitized = sanitizeFilename(tracknameRef.current)
    tracknameRef.current = sanitized
    setTrackname(sanitized)
  }

  return (
    <div className="flex flex-row ml-5 text-base-content">
      <div className="mb-4">
        <div className="text-">Trackname</div>
        <div className="flex text-2xl">
          <ContentEditable
            id="editTrackname"
            html={tracknameRef.current}
            onChange={handleChange}
            onBlur={handleBlur}
            innerRef={tracknameInputFieldRef}
          />
          &nbsp;
          <FaPenToSquare
            className="mx-0 relative top-[2px] highlight-color"
            onClick={() => {
              tracknameInputFieldRef?.current?.focus()
            }}
          />
        </div>
      </div>
      <div className="mx-5 mb-2 tooltip flex top-6" data-tip={getMessage('tooltip_mute') as string}>
        {showPolyline ? (
          <FaEye className="text-3xl" onClick={() => setShowPolyline(false)} />
        ) : (
          <FaEyeSlash className="text-3xl" onClick={() => setShowPolyline(true)} />
        )}
      </div>
      <div className="flex-1 flex mb-4 justify-end items-center">
        <div className="flex flex-row flex-1 justify-end items-center">
          <DownloadLink
            trackId={trackId}
            type="gpx"
            trackname={trackname}
            optimizeWaypoints={optimizeWaypoints}
            geoJson={markerGeoJson}
          />
          <DownloadLink
            trackId={trackId}
            type="tcx"
            trackname={trackname}
            optimizeWaypoints={optimizeWaypoints}
            geoJson={markerGeoJson}
          />
        </div>
        <div className="ml-3 mr-5">
          <input
            id="default-checkbox"
            type="checkbox"
            onChange={(e) => setOptimizeWaypoints(e.target.checked)}
            value=""
            className="w-4 h-4"
          />
          <label htmlFor="default-checkbox" className="ms-2">
            {getMessage('optimize_waypoints')}
          </label>
          &nbsp;
          <div className="tooltip tooltip-left" data-tip={getMessage('optimize_waypoints_tooltip')}>
            <FaCircleInfo className="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackHeader
