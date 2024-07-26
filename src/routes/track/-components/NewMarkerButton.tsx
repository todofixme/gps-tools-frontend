import React, { Dispatch, SetStateAction } from 'react'
import { useMap } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { WayPoint } from '../../../@types/gps'
import { v4 as uuidv4 } from 'uuid'
import { MdAddLocation } from 'react-icons/md'

type NewMarkerButtonProps = {
  setMarkerPositions: Dispatch<SetStateAction<WayPoint[]>>
}

const NewMarkerButton: React.FC<NewMarkerButtonProps> = ({
  setMarkerPositions: setMarkerPositions,
}) => {
  const map = useMap()
  const { t } = useTranslation('merge')

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
      data-tip={t('tooltip.newmarker') as string}
    >
      <MdAddLocation className="text-5xl text-black" />
    </button>
  )
}

export default NewMarkerButton
