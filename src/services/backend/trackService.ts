import { LatLngBoundsExpression, LatLngExpression, LatLngTuple } from 'leaflet'
import { PoiType, WayPoint } from '../../@types/gps'
import { v4 as uuidv4 } from 'uuid'
import API from './gps-backend-api'
import { FeatureCollection, LineString, Point } from 'geojson'
import { sanitizeFilename } from '../../utils/tools'
import { useQuery } from '@tanstack/react-query'

export type TrackResult = {
  trackName: string
  positions: LatLngExpression[]
  markerPositions: WayPoint[]
  bounds: LatLngBoundsExpression
}

const fetchTrack = async (trackId: string): Promise<TrackResult> => {
  const config = {
    headers: {
      accept: 'application/geo+json',
    },
  }

  const trackResult = API.get('/tracks/' + trackId, config)
    .then((track) => {
      const featureCollection: FeatureCollection = track.data as FeatureCollection
      const positions = findPositions(featureCollection)
      const markerPositions = findMarkerPositions(featureCollection);

      return {
        trackName: findTrackName(featureCollection),
        positions: positions,
        markerPositions: markerPositions,
        bounds: findBounds(positions, markerPositions),
      }
    })
    .catch((error) => {
      throw error
    })

  return await trackResult
}

export function useFetchTrack(trackId: string) {
  return useQuery({
    queryKey: ['track', { trackId }],
    queryFn: () => fetchTrack(trackId),
    retry: 2,
  })
}

export const findMarkerPositions = (featureCollection: FeatureCollection): WayPoint[] => {
  return featureCollection.features
    .filter((f) => f.geometry.type == 'Point')
    .map((feat) => {
      const point: Point = feat.geometry as Point
      const type: PoiType = feat.properties?.type ?? 'GENERIC'

      return {
        id: feat.properties?.id ?? uuidv4(),
        position: [point.coordinates[0], point.coordinates[1]],
        name: feat.properties?.name ?? 'unnamed',
        type: type,
      }
    }) as WayPoint[]
}

export const findPositions = (featureCollection: FeatureCollection): LatLngTuple[] =>
  featureCollection.features
    .filter(({ geometry }) => geometry.type === 'LineString' && geometry.coordinates?.length)
    .flatMap(({ geometry }) => (geometry as LineString).coordinates)
    .map(([lng, lat]) => [lat, lng] as LatLngTuple)

export const findBounds = (positions: LatLngTuple[], markerPositions: WayPoint[]) => {
  const lats = positions.length > 0
    ? positions.map(([lat]) => lat)
    : markerPositions.map(({ position: [lat] }) => lat)

  const lngs = positions.length > 0
    ? positions.map(([, lng]) => lng)
    : markerPositions.map(({ position: [, lng] }) => lng)

  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ] as LatLngBoundsExpression
}

export const findTrackName = (featureCollection: FeatureCollection) => {
  const lines = featureCollection.features.filter((f) => f.geometry.type == 'LineString')
  let trackName: string
  if (lines?.[0]?.properties?.['name']) {
    trackName = lines[0].properties['name']
  } else {
    trackName = 'unnamed'
  }

  return sanitizeFilename(trackName)
}
