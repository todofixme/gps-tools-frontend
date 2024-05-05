import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import axios from 'axios'
import { useDebounce } from '@uidotdev/usehooks'
import { Feature, FeatureCollection, Point } from 'geojson'
import { WayPoint } from '../../@types/gps'
import { v4 as uuidv4 } from 'uuid'
import { useMap } from 'react-leaflet'
import { convertOsmToPoiType } from '../../utils/tools.ts'

type MarkerSearchProps = {
  setMarkerPositions: Dispatch<SetStateAction<WayPoint[]>>
}

const MarkerSearch: React.FC<MarkerSearchProps> = ({ setMarkerPositions }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  const [results, setResults] = useState<Feature[]>([])
  const dropdownDivRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const map = useMap()

  useEffect(() => {
    if (debouncedSearchTerm === undefined || debouncedSearchTerm.length == 0) {
      return
    }

    const bounds = map.getBounds()
    const west = bounds.getWest()
    const east = bounds.getEast()
    const north = bounds.getNorth()
    const south = bounds.getSouth()
    const minLon = Math.min(west, east)
    const maxLon = Math.max(west, east)
    const minLat = Math.min(north, south)
    const maxLat = Math.max(north, south)

    axios
      .get('https://photon.komoot.io/api/', {
        params: {
          q: debouncedSearchTerm,
          bbox: `${minLon},${minLat},${maxLon},${maxLat}`,
        },
      })
      .then((response) => {
        const featureCollection: FeatureCollection =
          response.data as FeatureCollection
        setResults(featureCollection.features)
      })
      .catch((error) => {
        console.error('error', error)
      })
  }, [debouncedSearchTerm])

  const createMarker = (marker: Feature) => {
    const point = marker.geometry as Point
    const poiType = convertOsmToPoiType(
      marker.properties?.osm_key,
      marker.properties?.osm_value
    )
    const newWayPoint: WayPoint = {
      id: uuidv4(),
      name: marker.properties?.name ?? 'unnamed',
      type: poiType,
      position: [point.coordinates[1], point.coordinates[0]],
    }
    setMarkerPositions((prevState) => [...prevState, newWayPoint])

    // clear input
    setSearchTerm('')
    setResults([])

    // close dropdown
    const elem = document.activeElement
    if (elem && elem instanceof HTMLElement) {
      elem.blur()
    }
  }

  return (
    <div className='container mx-auto px-3 pt-2'>
      <div className='dropdown w-full' ref={dropdownDivRef}>
        <input
          id='markerSearchInput'
          type='text'
          ref={inputRef}
          className='input input-bordered w-full'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for waypoints…'
          tabIndex={0}
        />
        <div className='dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md'>
          {results.length > 0 && (
            <ul
              className='menu menu-compact'
              // calculate the width of the dropdown
              style={{ width: dropdownDivRef.current?.clientWidth }}
            >
              {results.map((item, index) => {
                return (
                  <li
                    key={index}
                    tabIndex={index + 1}
                    onClick={() => {
                      createMarker(item)
                    }}
                    className='border-b border-b-base-content/10 w-full'
                  >
                    <button>{item.properties!.name}</button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkerSearch
