import DownloadLink from './DownloadLink'
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import React, { useMemo, useRef, useState } from 'react'
import { WayPoint } from '../../@types/gps'
import { generateGeoJson, sanitizeFilename } from '../../utils/tools'
import ResetButton from './ResetButton'
import useLanguage from '../../hooks/useLanguage'

type TrackHeaderProps = {
  trackId: string
  markerPositions: WayPoint[]
  trackname: string
  setTrackname: React.Dispatch<React.SetStateAction<string>>
}

const TrackHeader: React.FC<TrackHeaderProps> = ({
  trackId,
  markerPositions,
  trackname,
  setTrackname,
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
    <>
      <div>
        <ResetButton />
        <div className="flex flex-row">
          <div>
            <DownloadLink
              fileId={trackId}
              type="gpx"
              trackname={trackname}
              optimizeWaypoints={optimizeWaypoints}
              geoJson={markerGeoJson}
            />
            <br />
            <DownloadLink
              fileId={trackId}
              type="tcx"
              trackname={trackname}
              optimizeWaypoints={optimizeWaypoints}
              geoJson={markerGeoJson}
            />
          </div>
          <div className="flex items-center ml-6">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={(e) => setOptimizeWaypoints(e.target.checked)}
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="default-checkbox" className="ms-2">
              {getMessage('optimize_waypoints')}
            </label>
            &nbsp;
            <div className="tooltip" data-tip={getMessage('optimize_waypoints_tooltip')}>
              <FaCircleInfo className="" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        <div className="mb-5">
          <div className="text-">Trackname</div>
          <div className="flex underline">
            <ContentEditable
              id="editTrackname"
              html={tracknameRef.current}
              onChange={handleChange}
              onBlur={handleBlur}
              innerRef={tracknameInputFieldRef}
            />
            &nbsp;
            <FaPenToSquare
              className="mx-0 relative top-1"
              onClick={() => {
                tracknameInputFieldRef?.current?.focus()
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackHeader
