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

      return {
        trackName: findTrackName(featureCollection),
        positions: positions,
        markerPositions: findMarkerPositions(featureCollection),
        bounds: findBounds(positions),
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

export const findPositions = (featureCollection: FeatureCollection): LatLngTuple[] => {
  return featureCollection.features
    .filter((f) => f.geometry.type == 'LineString')
    .flatMap((line) => (line.geometry as LineString).coordinates)
    .map((position) => [position[1], position[0]]) as LatLngTuple[]
}

export const findBounds = (positions: LatLngTuple[]) => {
  const lats = []
  const lngs = []
  for (let i = 0; i < positions.length; i++) {
    lats.push(positions[i][0])
    lngs.push(positions[i][1])
  }

  const minlat = Math.min.apply(null, lats)
  const maxlat = Math.max.apply(null, lats)
  const minlng = Math.min.apply(null, lngs)
  const maxlng = Math.max.apply(null, lngs)

  const bounds = [
    [minlat, minlng],
    [maxlat, maxlng],
  ] as LatLngBoundsExpression

  return bounds
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
