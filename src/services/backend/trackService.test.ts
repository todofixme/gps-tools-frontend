import { describe, expect, it } from 'vitest'
import { LatLngTuple } from 'leaflet'
import { findBounds, findMarkerPositions, findPositions, findTrackName } from './trackService'
import { FeatureCollection } from 'geojson'
import { WayPoint } from '../../@types/gps.ts'
import { v4 as uuidv4 } from 'uuid'

describe('process track', () => {
  it('find marker positions', () => {
    const featureCollection = {
      features: [
        {
          geometry: {
            coordinates: [1, 1],
            type: 'Point',
          },
          properties: {
            name: 'way point 1',
          },
          type: 'Feature',
        },
        {
          geometry: {
            coordinates: [
              [3, 3],
              [4, 4],
            ],
            type: 'LineString',
          },
          properties: {},
          type: 'Feature',
        },
        {
          geometry: {
            coordinates: [2, 2],
            type: 'Point',
          },
          properties: {
            id: 'someId',
            name: 'way point 2',
            type: 'FOOD',
          },
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    } as FeatureCollection

    const actual = findMarkerPositions(featureCollection)

    expect(actual).toStrictEqual([
      {
        id: expect.any(String),
        name: 'way point 1',
        position: [1, 1],
        type: 'GENERIC',
      },
      {
        id: 'someId',
        name: 'way point 2',
        position: [2, 2],
        type: 'FOOD',
      },
    ])
  })

  it('find marker positions, create missing id', () => {
    const featureCollection = {
      features: [
        {
          geometry: {
            coordinates: [1, 1],
            type: 'Point',
          },
          properties: {
            name: 'way point 1',
            type: 'SUMMIT',
          },
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    } as FeatureCollection

    const actual = findMarkerPositions(featureCollection)

    expect(actual).toStrictEqual([
      {
        id: expect.any(String),
        name: 'way point 1',
        position: [1, 1],
        type: 'SUMMIT',
      },
    ])
  })

  it('find marker positions, set default type', () => {
    const featureCollection = {
      features: [
        {
          geometry: {
            coordinates: [1, 1],
            type: 'Point',
          },
          properties: {
            name: 'way point 1',
          },
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    } as FeatureCollection

    const actual = findMarkerPositions(featureCollection)

    expect(actual).toStrictEqual([
      {
        id: expect.any(String),
        name: 'way point 1',
        position: [1, 1],
        type: 'GENERIC',
      },
    ])
  })

  it('find positions', () => {
    const featureCollection = {
      features: [
        {
          geometry: {
            coordinates: [
              [1, 1],
              [2, 2],
            ],
            type: 'LineString',
          },
          properties: {},
          type: 'Feature',
        },
        {
          geometry: {
            coordinates: [
              [3, 3],
              [4, 4],
            ],
            type: 'LineString',
          },
          properties: {},
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    } as FeatureCollection

    const actual = findPositions(featureCollection)

    expect(actual).toStrictEqual([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ])
  })

  it('find bounds', () => {
    const positions = [
      [1, 3],
      [3, 5],
      [5, 2],
      [4, 1],
      [2, 4],
    ] as LatLngTuple[]

    const actual = findBounds(positions, [])

    expect(actual).toStrictEqual([
      [1, 1],
      [5, 5],
    ])
  })

  it('find bounds, use markerPositions as fallback', () => {
    const markerPositions = [
      { position: [1, 3], id: uuidv4(), name: 'rand', type: 'GENERIC' },
      { position: [3, 5], id: uuidv4(), name: 'rand', type: 'GENERIC' },
      { position: [5, 2], id: uuidv4(), name: 'rand', type: 'GENERIC' },
      { position: [4, 1], id: uuidv4(), name: 'rand', type: 'GENERIC' },
      { position: [2, 4], id: uuidv4(), name: 'rand', type: 'GENERIC' },
    ] as WayPoint[]

    const actual = findBounds([], markerPositions)

    expect(actual).toStrictEqual([
      [1, 1],
      [5, 5],
    ])
  })

  it('find track name', () => {
    const trackName = 'track name'

    const featureCollection = {
      features: [
        {
          geometry: {
            coordinates: [
              [1, 1],
              [5, 5],
            ],
            type: 'LineString',
          },
          properties: {
            name: trackName,
          },
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    } as FeatureCollection

    const actual = findTrackName(featureCollection)

    expect(actual).toStrictEqual(trackName)
  })
})
