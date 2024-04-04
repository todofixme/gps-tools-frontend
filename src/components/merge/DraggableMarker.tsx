import React, { FocusEvent, memo, useMemo, useRef, useState } from 'react'
import L, { LatLng } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { FaTrashCan } from 'react-icons/fa6'
import { PoiType, WayPoint } from '../../@types/gps.ts'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import foodIcon from '/icons/food.png'

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
  waypoint: WayPoint
  changeMarkerPosition: (markerId: string, newPosition: LatLng) => void
  changeMarkerName: (markerId: string, newName: string) => void
  changeMarkerType: (markerId: string, newType: PoiType) => void
  removeMarker: (markerId: string) => void
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({
  waypoint,
  changeMarkerPosition,
  changeMarkerName,
  changeMarkerType,
  removeMarker,
}) => {
  const [selectedType, setSelectedType] = useState<PoiType>(waypoint.type)
  const myInputRef = useRef<HTMLDivElement>(null)

  const icon = useMemo(
    () => (selectedType === 'FOOD' ? FoodIcon : DefaultIcon),
    [selectedType]
  )

  const changePosition = (event: L.DragEndEvent) => {
    const newPosition = event.target.getLatLng()
    changeMarkerPosition(waypoint.id, newPosition)
  }

  const changeName = (event: FocusEvent<HTMLDivElement>) => {
    const newName = event.target.textContent ?? ''
    changeMarkerName(waypoint.id, newName)
  }

  const changeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as PoiType
    setSelectedType(newType)
    changeMarkerType(waypoint.id, newType)
  }

  const remove = () => {
    removeMarker(waypoint.id)
  }

  return (
    <Marker
      position={waypoint.position}
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
              <FaTrashCan className='mt-1 relative self-end' onClick={remove} />
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default memo(DraggableMarker)
