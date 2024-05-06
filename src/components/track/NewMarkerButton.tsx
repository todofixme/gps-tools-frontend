import React, { Dispatch, SetStateAction } from 'react'
import { useMap } from 'react-leaflet'
import { WayPoint } from '../../@types/gps'
import { v4 as uuidv4 } from 'uuid'
import { MdAddLocation } from 'react-icons/md'

type NewMarkerButtonProps = {
  setMarkerPositions: Dispatch<SetStateAction<WayPoint[]>>
}

const NewMarkerButton: React.FC<NewMarkerButtonProps> = ({
  setMarkerPositions: setMarkerPositions,
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
    setMarkerPositions((prevState) => [...prevState, waypoint])
  }

  return (
    <div id='controlButton' onClick={handleNewMarker}>
      <MdAddLocation className='text-5xl text-black' />
    </div>
  )
}

export default NewMarkerButton
