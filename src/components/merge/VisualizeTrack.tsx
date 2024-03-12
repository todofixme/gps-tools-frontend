import {
  useState,
  useEffect,
  createRef,
  RefObject,
  useRef,
  SetStateAction,
  Dispatch,
} from 'react'
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
  Marker,
  Popup,
} from 'react-leaflet'
import L, {
  LatLngBoundsExpression,
  LatLngExpression,
  LatLngTuple,
  Polyline as LeafletPolyline,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import GpxParser from 'gpxparser'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { MdCenterFocusStrong } from 'react-icons/md'
import API from '../common/gps-backend-api'
import { WayPoint } from '../../@types/gps'
import { sanitizeFilename } from '../common/tools'

type VisualizeTrackProps = {
  trackId: string
  setTrackname: Dispatch<SetStateAction<string>>
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const VisualizeTrack: React.FC<VisualizeTrackProps> = ({
  trackId,
  setTrackname,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [positions, setPositions] = useState<LatLngExpression[]>([])
  const [markerPositions, setMarkerPositions] = useState<WayPoint[]>([])
  const [bounds, setBounds] = useState<LatLngBoundsExpression>([
    [0, 0],
    [0, 0],
  ])
  const polylineRef = createRef<LeafletPolyline>()
  const tracknameRef = useRef('')

  useEffect(() => {
    setIsLoading(true)
    const config = {
      headers: {
        accept: 'application/gpx+xml',
      },
    }
    API.get('/files/' + trackId, config).then((file) => {
      var gpx = new GpxParser()
      gpx.parse(file.data)

      var _markerPositions: WayPoint[] = gpx.waypoints.map((point) => ({
        position: [point.lat, point.lon],
        name: point.name,
      })) as WayPoint[]
      setMarkerPositions(_markerPositions)

      var _positions: LatLngTuple[] = gpx.tracks[0].points.map((point) => [
        point.lat,
        point.lon,
      ]) as LatLngTuple[]
      setPositions(_positions)

      const lats = []
      const lngs = []
      for (var i = 0; i < _positions.length; i++) {
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

      if (gpx.metadata !== undefined && gpx.metadata.name !== undefined) {
        tracknameRef.current = gpx.metadata.name
        setTrackname(sanitizeFilename(gpx.metadata.name))
      }

      setIsLoading(false)
    })
  }, [trackId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!positions) {
    return <div>Error...</div>
  }

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
      <br />
      <div className='mb-7 grid'>
        <div className='text-xs'>Trackname</div>
        <ContentEditable
          html={tracknameRef.current}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div>
          <hr />
        </div>
      </div>
      <MapContainer bounds={bounds}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Polyline
          pathOptions={{ fillColor: 'red', color: 'blue' }}
          positions={positions}
          ref={polylineRef}
        />
        {markerPositions.map((waypoint, index) => (
          <Marker position={waypoint.position} key={index}>
            <Popup>{waypoint.name}</Popup>
          </Marker>
        ))}
        <FitBoundsButton polylineRef={polylineRef} />
      </MapContainer>
    </>
  )
}

type FitBoundsButtonProps = {
  polylineRef: RefObject<LeafletPolyline>
}

const FitBoundsButton: React.FC<FitBoundsButtonProps> = ({ polylineRef }) => {
  const map = useMap()

  const handleFitBounds = () => {
    map.fitBounds(polylineRef.current!.getBounds())
  }

  return (
    <button id='fitBoundsButton' onClick={handleFitBounds}>
      <MdCenterFocusStrong className='text-5xl text-black' />
    </button>
  )
}

export default VisualizeTrack
