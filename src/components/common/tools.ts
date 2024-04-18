import DOMPurify from 'dompurify'
import { WayPoint } from '../../@types/gps.ts'
import { Feature, FeatureCollection } from 'geojson'

export const sanitizeFilename = (input: string) => {
  var sanitized = input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()

  sanitized = DOMPurify.sanitize(sanitized, {
    USE_PROFILES: { html: false },
  })

  sanitized = sanitized.replace(/&lt;/g, '<').replace(/&gt;/g, '>')

  if (sanitized.length > 0) {
    return sanitized
  } else {
    return 'unnamed'
  }
}

export const decodeFromBase64 = (input: string) => {
  const binString = atob(input)
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) ?? 0)
  return new TextDecoder().decode(bytes)
}

export const encodeToBase64 = (input: string) => {
  const bytes = new TextEncoder().encode(input)
  const binString = String.fromCodePoint(...bytes)
  return btoa(binString)
}

export const generateGeoJson = (
  markerPositions: WayPoint[]
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: markerPositions.map(
      (waypoint) =>
        ({
          type: 'Feature',
          properties: {
            name: waypoint.name,
            type: waypoint.type,
          },
          geometry: {
            type: 'Point',
            coordinates: [waypoint.position[1], waypoint.position[0]],
          },
        } as Feature)
    ),
  }
}
