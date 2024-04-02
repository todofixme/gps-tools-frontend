import React, {
  Dispatch,
  FocusEvent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react'
import L, { LatLngTuple } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { FaTrashCan } from 'react-icons/fa6'
import { PoiType, WayPoint } from '../../@types/gps.ts'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import foodIcon from '/public/icons/restaurant.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const FoodIcon = L.icon({
  iconUrl: foodIcon,
  shadowUrl: iconShadow,
  iconSize: [38, 41],
  iconAnchor: [18, 41],
})

type DraggableMarkerProps = {
  position: LatLngTuple
  waypoint: WayPoint
  markerPositions: WayPoint[]
  setMarkerPositions: Dispatch<SetStateAction<WayPoint[]>>
  type: PoiType
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({
  position,
  waypoint,
  markerPositions,
  setMarkerPositions,
  type,
}) => {
  const [selectedType, setSelectedType] = useState<PoiType>(type)
  const myInputRef = useRef<HTMLDivElement>(null)

  const changePosition = (event: L.DragEndEvent) => {
    const newPosition = event.target.getLatLng()
    setMarkerPositions(
      markerPositions.map((wp) =>
        wp.id === waypoint.id
          ? {
              ...wp,
              position: [newPosition.lat, newPosition.lng],
            }
          : wp
      )
    )
  }

  const changeName = (event: FocusEvent) => {
    const newContent = event.target.textContent
    setMarkerPositions(
      markerPositions.map((wp) =>
        wp.id === waypoint.id
          ? {
              ...wp,
              name: newContent ?? '',
            }
          : wp
      )
    )
  }

  const changeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as PoiType
    setMarkerPositions(
      markerPositions.map((wp) =>
        wp.id === waypoint.id
          ? {
              ...wp,
              type: newType ?? 'GENERIC',
            }
          : wp
      )
    )
    setSelectedType(event.target.value as PoiType)
  }

  const removeWaypoint = (id: string) => () => {
    setMarkerPositions(markerPositions.filter((wp) => wp.id !== id))
  }

  const icon = useMemo(
    () => (selectedType === 'FOOD' ? FoodIcon : DefaultIcon),
    [selectedType]
  )

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{ dragend: changePosition }}
      key={waypoint.id}
      icon={icon}
    >
      <Popup>
        <div className='flex flex-col'>
          <div className='flex'>
            <div
              ref={myInputRef}
              className='text-lg'
              contentEditable
              onBlur={changeName}
              dangerouslySetInnerHTML={{ __html: waypoint.name }}
            />
          </div>

          <div className='text-l bg-white'>
            Type:
            <select
              className='bg-white'
              onChange={changeType}
              value={selectedType}
            >
              <option value='GENERIC'>Generic</option>
              <option value='SUMMIT'>Summit</option>
              <option value='VALLEY'>Valley</option>
              <option value='WATER'>Water</option>
              <option value='FOOD'>Food</option>
              <option value='DANGER'>Danger</option>
              <option value='LEFT'>Left</option>
              <option value='RIGHT'>Right</option>
              <option value='STRAIGHT'>Straight</option>
              <option value='FIRST_AID'>First Aid</option>
              <option value='RESIDENCE'>Residence</option>
              <option value='SPRINT'>Sprint</option>
            </select>
          </div>

          <div className='flex justify-between'>
            <div>
              <FaTrashCan
                className='mt-1 relative self-end'
                onClick={removeWaypoint(waypoint.id)}
              />
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker
