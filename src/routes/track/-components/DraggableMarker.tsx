import React, { FocusEvent, memo, useMemo, useRef, useState } from 'react'
import L, { LatLng } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { FaTrashCan } from 'react-icons/fa6'
import { PoiType, WayPoint } from '../../../@types/gps'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconGeneric from '../../../icons/Generic.svg'
import iconSummit from '../../../icons/Summit.svg'
import iconValley from '../../../icons/Valley.svg'
import iconWater from '../../../icons/Water.svg'
import iconFood from '../../../icons/Food.svg'
import iconDanger from '../../../icons/Danger.svg'
import iconLeft from '../../../icons/Left.svg'
import iconRight from '../../../icons/Right.svg'
import iconStraight from '../../../icons/Straight.svg'
import iconFirstAid from '../../../icons/FirstAid.svg'
import iconResidence from '../../../icons/Residence.svg'
import iconSprint from '../../../icons/Sprint.svg'

const GenericIcon = L.icon({
  iconUrl: iconGeneric,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const SummitIcon = L.icon({
  iconUrl: iconSummit,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const ValleyIcon = L.icon({
  iconUrl: iconValley,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const WaterIcon = L.icon({
  iconUrl: iconWater,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const FoodIcon = L.icon({
  iconUrl: iconFood,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const DangerIcon = L.icon({
  iconUrl: iconDanger,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const LeftIcon = L.icon({
  iconUrl: iconLeft,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const RightIcon = L.icon({
  iconUrl: iconRight,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const StraightIcon = L.icon({
  iconUrl: iconStraight,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const FirstAidIcon = L.icon({
  iconUrl: iconFirstAid,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const ResicenceIcon = L.icon({
  iconUrl: iconResidence,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const SprintIcon = L.icon({
  iconUrl: iconSprint,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type MapOfIcons = Record<PoiType, L.Icon<L.IconOptions>>
const iconMap: MapOfIcons = {
  GENERIC: GenericIcon,
  SUMMIT: SummitIcon,
  VALLEY: ValleyIcon,
  WATER: WaterIcon,
  FOOD: FoodIcon,
  DANGER: DangerIcon,
  LEFT: LeftIcon,
  RIGHT: RightIcon,
  STRAIGHT: StraightIcon,
  FIRST_AID: FirstAidIcon,
  FOURTH_CATEGORY: SummitIcon,
  THIRD_CATEGORY: SummitIcon,
  SECOND_CATEGORY: SummitIcon,
  FIRST_CATEGORY: SummitIcon,
  HORS_CATEGORY: SummitIcon,
  RESIDENCE: ResicenceIcon,
  SPRINT: SprintIcon,
}

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

  const icon = useMemo(() => iconMap[selectedType] ?? GenericIcon, [selectedType])

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
        <div className="flex flex-col">
          <div className="flex">
            <div
              ref={myInputRef}
              className="text-lg"
              contentEditable
              onBlur={changeName}
              dangerouslySetInnerHTML={{ __html: waypoint.name }}
            />
          </div>

          <div className="text-l bg-white">
            Type:
            <select className="bg-white" onChange={changeType} value={selectedType}>
              <option value="GENERIC">Generic</option>
              <option value="SUMMIT">Summit</option>
              <option value="VALLEY">Valley</option>
              <option value="WATER">Water</option>
              <option value="FOOD">Food</option>
              <option value="DANGER">Danger</option>
              <option value="LEFT">Left</option>
              <option value="RIGHT">Right</option>
              <option value="STRAIGHT">Straight</option>
              <option value="FIRST_AID">First Aid</option>
              <option value="RESIDENCE">Residence</option>
              <option value="SPRINT">Sprint</option>
            </select>
          </div>

          <div className="flex justify-between">
            <div>
              <FaTrashCan className="mt-1 relative self-end" onClick={remove} />
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default memo(DraggableMarker)
