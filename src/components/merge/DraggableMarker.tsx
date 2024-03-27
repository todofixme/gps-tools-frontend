import React, { FocusEvent, useRef, useState } from 'react'
import L, { LatLngTuple } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { FaTrashCan } from 'react-icons/fa6'
import { WayPoint } from '../../@types/gps.ts'

type DraggableMarkerProps = {
  position: LatLngTuple
  waypoint: WayPoint
  markerPositions: WayPoint[]
  setMarkerPositions: (waypoints: WayPoint[]) => void
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({
  position,
  waypoint,
  markerPositions,
  setMarkerPositions,
}) => {
  const [isEditing, setIsEditing] = useState(false)
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
    setIsEditing(false)
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

  const removeWaypoint = (id: string) => () => {
    setMarkerPositions(markerPositions.filter((wp) => wp.id !== id))
  }

  const setFocus = () => {
    myInputRef.current?.focus()
  }

  const removeFocus = () => {
    myInputRef.current?.blur()
    setIsEditing(false)
  }

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{ dragend: changePosition }}
      key={waypoint.id}
    >
      <Popup>
        <div className='flex flex-col'>
          <div
            ref={myInputRef}
            className='text-lg'
            contentEditable
            onBlur={changeName}
            onFocus={() => setIsEditing(true)}
            onChange={() => setIsEditing(false)}
            dangerouslySetInnerHTML={{ __html: waypoint.name }}
          />

          <div className='flex justify-between'>
            <div>
              {isEditing ? (
                <div className='underline' onClick={removeFocus}>
                  Save
                </div>
              ) : (
                <div className='underline' onClick={setFocus}>
                  Edit
                </div>
              )}
            </div>
            <div>
              <FaTrashCan
                className='ml-1 relative self-end'
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
