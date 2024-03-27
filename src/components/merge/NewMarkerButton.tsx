import React from 'react'
import { useMap } from 'react-leaflet'
import { WayPoint } from '../../@types/gps.ts'
import { v4 as uuidv4 } from 'uuid'
import { MdAddLocation } from 'react-icons/md'

type NewMarkerButtonProps = {
  markerState: Array<WayPoint>
  markerStateSetter: (markerPositions: Array<WayPoint>) => void
}

const NewMarkerButton: React.FC<NewMarkerButtonProps> = ({
  markerState: markerPositions,
  markerStateSetter: setMarkerPositions,
}) => {
  const map = useMap()

  const handleNewMarker = () => {
    const latlng = map.getCenter()
    const waypoint: WayPoint = {
      id: uuidv4(),
      position: [latlng.lat, latlng.lng],
      name: 'unnamed',
      type: 'GENERIC',
    }
    setMarkerPositions([...markerPositions, waypoint])
  }

  return (
    <div id='controlButton' onClick={handleNewMarker}>
      <MdAddLocation className='text-5xl text-black' />
    </div>
  )
}

export default NewMarkerButton
