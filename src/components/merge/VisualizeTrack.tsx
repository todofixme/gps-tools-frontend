import React, {
  createRef,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { LayersControl, MapContainer, Polyline, TileLayer } from 'react-leaflet'
import {
  LatLng,
  LatLngBoundsExpression,
  LatLngExpression,
  LatLngTuple,
  Polyline as LeafletPolyline,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import Control from 'react-leaflet-custom-control'
import { v4 as uuidv4 } from 'uuid'
import { FaEye, FaEyeSlash, FaPenToSquare } from 'react-icons/fa6'
import {
  Feature,
  FeatureCollection,
  GeoJsonObject,
  LineString,
  Point,
} from 'geojson'
import { PoiType, WayPoint } from '../../@types/gps'
import API from '../common/gps-backend-api'
import { sanitizeFilename } from '../common/tools'
import DraggableMarker from './DraggableMarker.tsx'
import FitBoundsButton from './FitBoundsButton.tsx'
import NewMarkerButton from './NewMarkerButton.tsx'

type VisualizeTrackProps = {
  trackId: string
  setTrackname: Dispatch<SetStateAction<string>>
  setGeoJson: (geoJson: GeoJsonObject) => void
}

const VisualizeTrack: React.FC<VisualizeTrackProps> = ({
  trackId,
  setTrackname,
  setGeoJson,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [positions, setPositions] = useState<LatLngExpression[]>([])
  const [markerPositions, setMarkerPositions] = useState<WayPoint[]>([])
  const [bounds, setBounds] = useState<LatLngBoundsExpression>([
    [0, 0],
    [0, 0],
  ])

  const [showPolyline, setShowPolyline] = useState(true)
  const polylineRef = createRef<LeafletPolyline>()
  const tracknameRef = useRef('')
  const tracknameInputFieldRef: React.RefObject<HTMLElement> = useRef(null)
  const geoJson = useMemo(
    () => generateGeoJson(markerPositions),
    [markerPositions]
  )
  useEffect(() => {
    setGeoJson(geoJson)
  }, [geoJson])

  useEffect(() => {
    setIsLoading(true)
    const config = {
      headers: {
        accept: 'application/geo+json',
      },
    }
    API.get('/files/' + trackId, config).then((file) => {
      const feat: FeatureCollection = file.data as FeatureCollection

      var _markerPositions: WayPoint[] = feat.features
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
      tracknameRef.current = trackName
      setTrackname(sanitizeFilename(trackName))

      setIsLoading(false)
    })
  }, [trackId])

  const handleChange = (evt: ContentEditableEvent) => {
    tracknameRef.current = evt.currentTarget.innerHTML
  }

  const handleBlur = () => {
    const sanitized = sanitizeFilename(tracknameRef.current)
    tracknameRef.current = sanitized
    setTrackname(sanitized)
  }

  function generateGeoJson(markerPositions: WayPoint[]): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: markerPositions.map(
        (waypoint) =>
          ({
            type: 'Feature',
            properties: {
              name: waypoint.name,
              type: waypoint.type,
            },
            geometry: {
              type: 'Point',
              coordinates: [waypoint.position[1], waypoint.position[0]],
            },
          } as Feature)
      ),
    }
  }

  const changeMarkerPosition = useCallback(
    (markerId: string, newPosition: LatLng) => {
      setMarkerPositions((prevState) =>
        prevState.map((wp) =>
          wp.id === markerId
            ? {
                ...wp,
                position: [newPosition.lat, newPosition.lng],
              }
            : wp
        )
      )
    },
    []
  )

  const changeMarkerName = useCallback((markerId: string, newName: string) => {
    setMarkerPositions((prevState) =>
      prevState.map((wp) =>
        wp.id === markerId
          ? {
              ...wp,
              name: newName ?? '',
            }
          : wp
      )
    )
  }, [])

  const changeMarkerType = useCallback((markerId: string, newType: PoiType) => {
    setMarkerPositions((prevState) =>
      prevState.map((wp) =>
        wp.id === markerId
          ? {
              ...wp,
              type: newType ?? 'GENERIC',
            }
          : wp
      )
    )
  }, [])

  const removeMarker = useCallback((id: string) => {
    setMarkerPositions((prevState) => prevState.filter((wp) => wp.id !== id))
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (document.activeElement?.id === 'editTrackname') {
        return null
      }
      if (event.key === 'm') {
        setShowPolyline(false)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (document.activeElement?.id === 'editTrackname') {
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

  return isLoading ? (
    <div>Loading...</div>
  ) : !positions ? (
    <div>Error...</div>
  ) : (
    <>
      <br />
      <div>
        <div className='mb-5'>
          <div className='text-'>Trackname</div>
          <div className='flex underline'>
            <ContentEditable
              id='editTrackname'
              html={tracknameRef.current}
              onChange={handleChange}
              onBlur={handleBlur}
              innerRef={tracknameInputFieldRef}
            />
            &nbsp;
            <FaPenToSquare
              className='mx-0 relative top-1'
              onClick={() => {
                tracknameInputFieldRef?.current?.focus()
              }}
            />
          </div>
        </div>
        <div className='mb-2 tooltip' data-tip='Mute track on map (M)'>
          {showPolyline ? (
            <FaEye
              className='top-1 text-2xl'
              onClick={() => setShowPolyline(false)}
            />
          ) : (
            <FaEyeSlash
              className='top-1 text-2xl'
              onClick={() => setShowPolyline(true)}
            />
          )}
        </div>
      </div>

      <MapContainer bounds={bounds}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LayersControl position='topright'>
          <LayersControl.BaseLayer name='Streets' checked={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='Topo'>
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='Satellite'>
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {showPolyline && (
          <Polyline
            pathOptions={{ fillColor: 'red', color: '#27e' }}
            positions={positions}
            ref={polylineRef}
          />
        )}
        {markerPositions.map((waypoint) => (
          <DraggableMarker
            key={waypoint.id}
            waypoint={waypoint}
            changeMarkerPosition={changeMarkerPosition}
            changeMarkerName={changeMarkerName}
            changeMarkerType={changeMarkerType}
            removeMarker={removeMarker}
          />
        ))}
        <Control prepend position='topright'>
          <div className='flex flex-col'>
            <FitBoundsButton polylineRef={polylineRef} />
            <NewMarkerButton setMarkerPositions={setMarkerPositions} />
          </div>
        </Control>
      </MapContainer>
    </>
  )
}

export default VisualizeTrack
