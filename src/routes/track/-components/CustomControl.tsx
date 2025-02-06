/* Based on (no longer maintained) https://github.com/chris-m92/react-leaflet-custom-control ) */
import L from 'leaflet'
import { createRef, useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'

// Classes used by Leaflet to position controls
const POSITION_CLASSES: Record<L.ControlPosition, string> = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

type CustomControlProps = {
  position: L.ControlPosition
  children: React.ReactNode
  prepend?: boolean
}

const CustomControl: React.FC<CustomControlProps> = ({
  position,
  children,
  prepend,
}: CustomControlProps) => {
  const map = useMap()
  const [portalRoot, setPortalRoot] = useState(document.createElement('div'))
  const controlContainerRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (controlContainerRef.current !== null) {
      L.DomEvent.disableClickPropagation(controlContainerRef.current)
      L.DomEvent.disableScrollPropagation(controlContainerRef.current)
    }
  }, [controlContainerRef])

  useEffect(() => {
    const mapContainer = map.getContainer()
    const targetDiv = mapContainer.getElementsByClassName(POSITION_CLASSES[position])
    setPortalRoot(targetDiv[0] as HTMLDivElement)
  }, [position])

  useEffect(() => {
    if (portalRoot !== null && controlContainerRef.current !== null) {
      if (prepend) {
        portalRoot.prepend(controlContainerRef.current)
      } else {
        portalRoot.append(controlContainerRef.current)
      }
    }
  }, [portalRoot, prepend, controlContainerRef])

  return (
    <div ref={controlContainerRef} className="leaflet-control">
      {children}
    </div>
  )
}

export default CustomControl
