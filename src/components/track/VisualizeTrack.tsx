import React, { createRef, useCallback, useEffect, useState } from 'react'
import { LayersControl, MapContainer, Polyline, TileLayer, ZoomControl } from 'react-leaflet'
import {
  LatLng,
  LatLngBoundsExpression,
  LatLngExpression,
  Polyline as LeafletPolyline,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Control from 'react-leaflet-custom-control'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { PoiType, WayPoint } from '../../@types/gps'
import DraggableMarker from './DraggableMarker'
import FitBoundsButton from './FitBoundsButton'
import NewMarkerButton from './NewMarkerButton'
import MarkerSearch from './MarkerSearch'
import useLanguage from '../../hooks/useLanguage'

type VisualizeTrackProps = {
  bounds: LatLngBoundsExpression
  positions: LatLngExpression[]
  markerPositions: WayPoint[]
  setMarkerPositions: React.Dispatch<React.SetStateAction<WayPoint[]>>
}

const VisualizeTrack: React.FC<VisualizeTrackProps> = ({
  bounds,
  positions,
  markerPositions,
  setMarkerPositions,
}) => {
  const [showPolyline, setShowPolyline] = useState(true)
  const polylineRef = createRef<LeafletPolyline>()
  const { getMessage } = useLanguage()

  const changeMarkerPosition = useCallback((markerId: string, newPosition: LatLng) => {
    setMarkerPositions((prevState) =>
      prevState.map((wp) =>
        wp.id === markerId
          ? {
              ...wp,
              position: [newPosition.lat, newPosition.lng],
            }
          : wp,
      ),
    )
  }, [])

  const changeMarkerName = useCallback((markerId: string, newName: string) => {
    setMarkerPositions((prevState) =>
      prevState.map((wp) =>
        wp.id === markerId
          ? {
              ...wp,
              name: newName ?? '',
            }
          : wp,
      ),
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
          : wp,
      ),
    )
  }, [])

  const removeMarker = useCallback((id: string) => {
    setMarkerPositions((prevState) => prevState.filter((wp) => wp.id !== id))
  }, [])

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

  return (
    <>
      <div>
        <div className="mb-2 tooltip" data-tip={getMessage('mute_tooltip') as string}>
          {showPolyline ? (
            <FaEye className="top-1 text-2xl" onClick={() => setShowPolyline(false)} />
          ) : (
            <FaEyeSlash className="top-1 text-2xl" onClick={() => setShowPolyline(true)} />
          )}
        </div>
      </div>

      <MapContainer bounds={bounds} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control position="topleft">
          <MarkerSearch setMarkerPositions={setMarkerPositions} />
        </Control>
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Streets" checked={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Topo">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
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
        <ZoomControl position="topright" />
        <Control prepend position="topright">
          <div className="flex flex-col">
            <FitBoundsButton polylineRef={polylineRef} />
            <NewMarkerButton setMarkerPositions={setMarkerPositions} />
          </div>
        </Control>
      </MapContainer>
    </>
  )
}

export default VisualizeTrack
