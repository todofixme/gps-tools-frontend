import React, { useEffect, useState } from 'react'
import API from '../services/backend/gps-backend-api'
import { WayPoint } from '../@types/gps'
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
import { useThrottle } from '@uidotdev/usehooks'
import { BsEmojiDizzy } from 'react-icons/bs'
import { FaAngleRight } from 'react-icons/fa6'
import { useAppContext, useLanguage } from '../hooks'
import { useFetchTrack } from '../services/backend/trackService.ts'
import { generateFeatureCollection, removeDuplicateWaypoints } from '../utils/tools.ts'
import { Loading } from '../components'
import { DownloadModal, TrackHeader, VisualizeTrack } from '../components/track'
import { ReloadModal } from '../components/merge'

type TrackProps = {
  trackId: string
}

export const TrackScreen: React.FC<TrackProps> = ({ trackId }) => {
  const { getMessage } = useLanguage()
  const { preserveWaypoints } = useAppContext()

  const [trackname, setTrackname] = useState<string>('')
  const [showPolyline, setShowPolyline] = useState(true)
  const [positions, setPositions] = useState<LatLngExpression[]>([])
  const [markerPositions, setMarkerPositions] = useState<WayPoint[]>([])
  const [bounds, setBounds] = useState<LatLngBoundsExpression>([
    [0, 0],
    [0, 0],
  ])

  const { data: trackResult, isLoading, isError } = useFetchTrack(trackId)
  useEffect(() => {
    if (isLoading || isError || !trackResult) return

    setMarkerPositions((prevState) => {
      return preserveWaypoints
        ? removeDuplicateWaypoints([...prevState, ...trackResult.markerPositions])
        : trackResult.markerPositions
    })
    setPositions(trackResult.positions)
    setBounds(trackResult.bounds)
    setTrackname(trackResult.trackName)
  }, [isLoading, isError, trackResult])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        document.activeElement?.id === 'editTrackname' ||
        document.activeElement?.id === 'markerSearchInput'
      ) {
        return null
      }
      if (event.key === 'm') {
        setShowPolyline(false)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        document.activeElement?.id === 'editTrackname' ||
        document.activeElement?.id === 'markerSearchInput'
      ) {
        return null
      }
      if (event.key === 'm') {
        setShowPolyline(true)
      }
    }

    document.addEventListener('keypress', handleKeyPress)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
      document.removeEventListener('keyup', handleKeyPress)
    }
  }, [])

  const throttledMarkerPositions = useThrottle(markerPositions, 500)
  useEffect(() => {
    if (throttledMarkerPositions !== undefined && !isLoading) {
      const featureCollection = generateFeatureCollection(markerPositions)
      API.put(`/tracks/${trackId}/points`, featureCollection, {
        headers: {
          'Content-Type': 'application/geo+json',
        },
      }).catch((error) => {
        console.error('Failed to update waypoint', error)
      })
    }
  }, [throttledMarkerPositions])

  const throttledTrackname = useThrottle(trackname, 500)
  useEffect(() => {
    if (throttledTrackname !== undefined && !isLoading) {
      const changeRequest = {
        properties: {
          name: throttledTrackname,
        },
      }
      API.patch(`/tracks/${trackId}`, changeRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error('Failed to update waypoint', error)
      })
    }
  }, [throttledTrackname])

  return (
    <>
      {isLoading ? (
        <div className="ml-2 md:ml-6 lg:ml-10 mt-8 text-base-content">
          <Loading size="lg" />
        </div>
      ) : (positions.length > 0 || markerPositions.length > 0) && trackId !== undefined ? (
        <div className="flex flex-col" style={{ height: '100%' }}>
          <TrackHeader
            trackname={trackname}
            setTrackname={setTrackname}
            showPolyline={showPolyline}
            setShowPolyline={setShowPolyline}
          />
          <div className="flex grow">
            <VisualizeTrack
              bounds={bounds}
              positions={positions}
              markerPositions={markerPositions}
              setMarkerPositions={setMarkerPositions}
              showPolyline={showPolyline}
            />
          </div>
          <ReloadModal />
          <DownloadModal trackId={trackId} />
        </div>
      ) : (
        <>
          <div className="ml-2 md:ml-6 lg:ml-10 mt-8 text-base-content">
            <h1 className="text-6xl font-medium tracking-wide flex items-center">
              {getMessage('track_not_found_headline')}
              <BsEmojiDizzy className="ml-3" />
            </h1>
            <div className="mb-4 text-2xl font-light mt-8">
              {getMessage('track_not_found_text')}
              <br />
              {getMessage('not_found_back')}:
              <a href="/">
                <FaAngleRight className="inline" />
                <div className="inline font-bold">GPS-Tools</div>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
