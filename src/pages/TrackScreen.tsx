import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../components/services/backend/gps-backend-api'
import { FeatureCollection, LineString, Point } from 'geojson'
import { PoiType, WayPoint } from '../@types/gps'
import { v4 as uuidv4 } from 'uuid'
import { LatLngBoundsExpression, LatLngExpression, LatLngTuple } from 'leaflet'
import { sanitizeFilename } from '../utils/tools'
import VisualizeTrack from '../components/track/VisualizeTrack'
import TrackHeader from '../components/track/TrackHeader'
import ResetButton from '../components/track/ResetButton'
import { useFeedbackContext } from '../hooks/useFeedbackContext'
import useLanguage from '../hooks/useLanguage'

const TrackScreen = () => {
  const { id: trackId } = useParams()

  const { setError } = useFeedbackContext()
  const { getMessage } = useLanguage()

  const [isLoading, setIsLoading] = useState(true)
  const [trackname, setTrackname] = useState<string>('')
  const [positions, setPositions] = useState<LatLngExpression[]>([])
  const [markerPositions, setMarkerPositions] = useState<WayPoint[]>([])
  const [bounds, setBounds] = useState<LatLngBoundsExpression>([
    [0, 0],
    [0, 0],
  ])

  useEffect(() => {
    setIsLoading(true)
    const config = {
      headers: {
        accept: 'application/geo+json',
      },
    }
    API.get('/tracks/' + trackId, config)
      .then((file) => {
        const feat: FeatureCollection = file.data as FeatureCollection

        const _markerPositions: WayPoint[] = feat.features
          .filter((f) => f.geometry.type == 'Point')
          .map((feat) => {
            const point: Point = feat.geometry as Point
            const type: PoiType = feat.properties?.type ?? 'GENERIC'

            return {
              id: uuidv4(),
              position: [point.coordinates[0], point.coordinates[1]],
              name: feat.properties?.name ?? 'unnamed',
              type: type,
            }
          }) as WayPoint[]
        setMarkerPositions(_markerPositions)

        const _positions: LatLngTuple[] = feat.features
          .filter((f) => f.geometry.type == 'LineString')
          .flatMap((line) => (line.geometry as LineString).coordinates)
          .map((position) => [position[1], position[0]]) as LatLngTuple[]
        setPositions(_positions)

        const lats = []
        const lngs = []
        for (let i = 0; i < _positions.length; i++) {
          lats.push(_positions[i][0])
          lngs.push(_positions[i][1])
        }

        const minlat = Math.min.apply(null, lats)
        const maxlat = Math.max.apply(null, lats)
        const minlng = Math.min.apply(null, lngs)
        const maxlng = Math.max.apply(null, lngs)

        const _bounds = [
          [minlat, minlng],
          [maxlat, maxlng],
        ] as LatLngBoundsExpression
        setBounds(_bounds)

        const lines = feat.features.filter((f) => f.geometry.type == 'LineString')
        let trackName: string
        if (lines?.[0]?.properties?.['name']) {
          trackName = lines[0].properties['name']
        } else {
          trackName = 'unnamed'
        }
        setTrackname(sanitizeFilename(trackName))

        setIsLoading(false)
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setError('error_track_not_found')
        } else {
          setError('error_loading_track')
        }
        setIsLoading(false)
      })
  }, [trackId])

  return (
    <>
      <h1 className="text-6xl">GPS-Tools</h1>
      {isLoading ? (
        <p>{getMessage('loading')}</p>
      ) : positions.length > 0 && trackId !== undefined ? (
        <>
          <TrackHeader
            trackId={trackId}
            markerPositions={markerPositions}
            trackname={trackname}
            setTrackname={setTrackname}
          />
          <VisualizeTrack
            bounds={bounds}
            positions={positions}
            markerPositions={markerPositions}
            setMarkerPositions={setMarkerPositions}
          />
        </>
      ) : (
        <>
          <p>{getMessage('error_track_not_found')}</p>
          <ResetButton />
        </>
      )}
    </>
  )
}

export default TrackScreen
