import React, { RefObject } from 'react'
import { Polyline as LeafletPolyline } from 'leaflet'
import { useMap } from 'react-leaflet'
import { MdCenterFocusStrong } from 'react-icons/md'

type FitBoundsButtonProps = {
  polylineRef: RefObject<LeafletPolyline>
}

const FitBoundsButton: React.FC<FitBoundsButtonProps> = ({ polylineRef }) => {
  const map = useMap()

  const handleFitBounds = () => {
    map.fitBounds(polylineRef.current!.getBounds())
  }

  return (
    <button id="controlButton" onClick={handleFitBounds}>
      <MdCenterFocusStrong className="text-5xl text-black" />
    </button>
  )
}

export default FitBoundsButton
