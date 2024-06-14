import React, { RefObject } from 'react'
import { Polyline as LeafletPolyline } from 'leaflet'
import { useMap } from 'react-leaflet'
import { MdCenterFocusStrong } from 'react-icons/md'
import useLanguage from '../../../hooks/useLanguage'

type FitBoundsButtonProps = {
  polylineRef: RefObject<LeafletPolyline>
}

const FitBoundsButton: React.FC<FitBoundsButtonProps> = ({ polylineRef }) => {
  const map = useMap()
  const { getMessage } = useLanguage()

  const handleFitBounds = () => {
    map.fitBounds(polylineRef.current!.getBounds())
  }

  return (
    <button
      id="controlButton"
      onClick={handleFitBounds}
      className="tooltip tooltip-left"
      data-tip={getMessage('tooltip_fitbounds') as string}
    >
      <MdCenterFocusStrong className="text-5xl text-black" />
    </button>
  )
}

export default FitBoundsButton
