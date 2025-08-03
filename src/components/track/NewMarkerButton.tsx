import React, { Dispatch, SetStateAction } from 'react'
import { useMap } from 'react-leaflet'
import { v4 as uuidv4 } from 'uuid'
import { MdAddLocation } from 'react-icons/md'
import { WayPoint } from '../../@types/gps'
import { useLanguage } from '../../hooks'

type NewMarkerButtonProps = {
  setMarkerPositions: Dispatch<SetStateAction<WayPoint[]>>
}

export const NewMarkerButton: React.FC<NewMarkerButtonProps> = ({
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

    setMarkerPositions((prevState) => {
      const exists = prevState.some(
        (wp) => wp.position[0] === waypoint.position[0] && wp.position[1] === waypoint.position[1],
      )

      if (exists) {
        console.log('A marker already exists at this position!')
        return prevState
      }

      return [...prevState, waypoint]
    })
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
