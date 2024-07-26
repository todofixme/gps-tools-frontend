import React, { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Polyline as LeafletPolyline } from 'leaflet'
import { useMap } from 'react-leaflet'
import { MdCenterFocusStrong } from 'react-icons/md'

type FitBoundsButtonProps = {
  polylineRef: RefObject<LeafletPolyline>
}

const FitBoundsButton: React.FC<FitBoundsButtonProps> = ({ polylineRef }) => {
  const map = useMap()
  const { t } = useTranslation('merge')

  const handleFitBounds = () => {
    map.fitBounds(polylineRef.current!.getBounds())
  }

  return (
    <button
      id="controlButton"
      onClick={handleFitBounds}
      className="tooltip tooltip-left"
      data-tip={t('tooltip.fitbounds') as string}
    >
      <MdCenterFocusStrong className="text-5xl text-black" />
    </button>
  )
}

export default FitBoundsButton
