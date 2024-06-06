import React, { Dispatch, SetStateAction } from 'react'
import { useMap } from 'react-leaflet'
import { WayPoint } from '../../@types/gps'
import { v4 as uuidv4 } from 'uuid'
import { MdAddLocation } from 'react-icons/md'
import useLanguage from '../../hooks/useLanguage'

type NewMarkerButtonProps = {
  setMarkerPositions: Dispatch<SetStateAction<WayPoint[]>>
}

const NewMarkerButton: React.FC<NewMarkerButtonProps> = ({
  setMarkerPositions: setMarkerPositions,
}) => {
  const map = useMap()
  const { getMessage } = useLanguage()

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
    <button
      id="controlButton"
      onClick={handleNewMarker}
      className="tooltip tooltip-left"
      data-tip={getMessage('tooltip_newmarker') as string}
    >
      <MdAddLocation className="text-5xl text-black" />
    </button>
  )
}

export default NewMarkerButton
