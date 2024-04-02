import { LatLngTuple } from 'leaflet'

export type PoiType =
  | 'GENERIC'
  | 'SUMMIT'
  | 'VALLEY'
  | 'WATER'
  | 'FOOD'
  | 'DANGER'
  | 'LEFT'
  | 'RIGHT'
  | 'STRAIGHT'
  | 'FIRST_AID'
  | 'FOURTH_CATEGORY'
  | 'THIRD_CATEGORY'
  | 'SECOND_CATEGORY'
  | 'FIRST_CATEGORY'
  | 'HORS_CATEGORY'
  | 'RESIDENCE'
  | 'SPRINT'

export type WayPoint = {
  id: string
  position: LatLngTuple
  name: string
  type: PoiType
}
