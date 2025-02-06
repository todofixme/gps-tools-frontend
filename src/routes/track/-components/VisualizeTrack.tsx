import React, { createRef, useCallback } from 'react'
import { LayersControl, MapContainer, Polyline, TileLayer, ZoomControl } from 'react-leaflet'
import {
  LatLng,
  LatLngBoundsExpression,
  LatLngExpression,
  Polyline as LeafletPolyline,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PoiType, WayPoint } from '../../../@types/gps'
import DraggableMarker from './DraggableMarker'
import FitBoundsButton from './FitBoundsButton'
import NewMarkerButton from './NewMarkerButton'
import MarkerSearch from './MarkerSearch'
import CustomControl from './CustomControl'

type VisualizeTrackProps = {
  bounds: LatLngBoundsExpression
  positions: LatLngExpression[]
  markerPositions: WayPoint[]
  setMarkerPositions: React.Dispatch<React.SetStateAction<WayPoint[]>>
  showPolyline: boolean
}

const VisualizeTrack: React.FC<VisualizeTrackProps> = ({
  bounds,
  positions,
  markerPositions,
  setMarkerPositions,
  showPolyline,
}) => {
  const polylineRef = createRef<LeafletPolyline>()

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

  return (
    <MapContainer bounds={bounds} zoomControl={false} style={{ width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomControl position="topleft">
        <MarkerSearch setMarkerPositions={setMarkerPositions} />
      </CustomControl>
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
      <CustomControl prepend position="topright">
        <div className="flex flex-col">
          <FitBoundsButton polylineRef={polylineRef} />
          <NewMarkerButton setMarkerPositions={setMarkerPositions} />
        </div>
      </CustomControl>
    </MapContainer>
  )
}

export default VisualizeTrack
