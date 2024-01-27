import { useState, useEffect, createRef } from 'react'
import GpxParser from 'gpxparser'
import API from '../http-common'
import 'leaflet/dist/leaflet.css'
import { MdCenterFocusStrong } from 'react-icons/md'

import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'

function VisualizeTrack({ trackId }) {
  const [isLoading, setIsLoading] = useState(true)
  const [positions, setPositions] = useState([])
  const [bounds, setBounds] = useState([
    [0, 0],
    [0, 0],
  ])
  const polylineRef = createRef()

  useEffect(() => {
    setIsLoading(true)
    API.get('/files/' + trackId).then((file) => {
      var gpx = new GpxParser()
      gpx.parse(file.data)

      var _positions = gpx.tracks[0].points.map((point) => [
        point.lat,
        point.lon,
      ])
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
      ]
      setBounds(_bounds)

      setIsLoading(false)
    })
  }, [trackId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!positions) {
    return <div>Error...</div>
  }

  return (
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
      <FitBoundsButton polylineRef={polylineRef} />
    </MapContainer>
  )
}

const FitBoundsButton = ({ polylineRef }) => {
  const map = useMap()

  const handleFitBounds = () => {
    map.fitBounds(polylineRef.current.getBounds())
  }

  return (
    <button id='fitBoundsButton' onClick={handleFitBounds}>
      <MdCenterFocusStrong className='text-5xl text-black' />
    </button>
  )
}

export default VisualizeTrack
