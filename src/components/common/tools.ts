import DOMPurify from 'dompurify'
import {PoiType, WayPoint} from '../../@types/gps.ts'
import {Feature, FeatureCollection} from 'geojson'

export const sanitizeFilename = (input: string) => {
    var sanitized = input
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()

    sanitized = DOMPurify.sanitize(sanitized, {
        USE_PROFILES: {html: false},
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

export const convertOsmToPoiType = (
    osm_key: string,
    osm_value: string
): PoiType => {
    if (osm_key === 'amenity') {
        switch (osm_value) {
            case 'bar':
            case 'biergarten':
            case 'cafe':
            case 'fast_food':
            case 'food_court':
            case 'ice_cream':
            case 'pub':
            case 'restaurant':
                return 'FOOD'

            case 'hotel':
            case 'spa_resort':
                return 'RESIDENCE'

            case 'drinking_water':
                return 'WATER'

            default:
                return 'GENERIC'
        }
    } else if (osm_key === 'mountain_pass') {
        return 'SUMMIT'
    } else if (
        osm_key === 'natural') {
        switch (osm_value) {
            case 'peak':
            case 'saddle':
                return 'SUMMIT'
            case 'spring':
                return 'WATER'
            default:
                return 'GENERIC'
        }
    } else if (
        osm_key === 'shop') {
        switch (osm_value) {
            case 'convenience':
            case 'supermarket':
                return 'FOOD'
            default:
                return 'GENERIC'
        }
    } else if (osm_key === 'tourism' && osm_value === 'hotel') {
        return 'RESIDENCE'
    } else if (osm_key === 'man_made' && osm_value === 'water_tap') {
        return 'WATER'
    }

    return 'GENERIC'
}
