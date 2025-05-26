import { describe, expect, it } from 'vitest'
import {
  convertOsmToPoiType,
  decodeFromBase64,
  encodeToBase64,
  generateFeatureCollection,
  removeDuplicateWaypoints,
  sanitizeFilename,
} from './tools'
import { WayPoint } from '../@types/gps'
import { v4 as uuidv4 } from 'uuid'

describe('sanitizeFilename', () => {
  it('nothing to sanitize', () => {
    const sanitized = sanitizeFilename('Foobar')
    expect(sanitized).toStrictEqual('Foobar')
  })

  it('fallback if empty', () => {
    const sanitized = sanitizeFilename('  ')
    expect(sanitized).toStrictEqual('unnamed')
  })

  it('trim whitespace', () => {
    const sanitized = sanitizeFilename(' Foo Bar ')
    expect(sanitized).toStrictEqual('Foo Bar')
  })

  it('trim HTML whitespaces', () => {
    const sanitized = sanitizeFilename('&nbsp;Foo&nbsp;Bar&nbsp;')
    expect(sanitized).toStrictEqual('Foo Bar')
  })

  it('remove HTML tags', () => {
    const sanitized = sanitizeFilename(' Foo<br /> Bar ')
    expect(sanitized).toStrictEqual('Foo Bar')
  })

  it(`don't remove greater-than`, () => {
    const sanitized = sanitizeFilename('Foo > Bar')
    expect(sanitized).toStrictEqual('Foo > Bar')
  })

  it(`convert greater-than as html`, () => {
    const sanitized = sanitizeFilename('Foo &gt; Bar')
    expect(sanitized).toStrictEqual('Foo > Bar')
  })

  it(`don't remove lower-than`, () => {
    const sanitized = sanitizeFilename('Foo < Bar')
    expect(sanitized).toStrictEqual('Foo < Bar')
  })

  it(`convert lower-than as html`, () => {
    const sanitized = sanitizeFilename('Foo &lt; Bar')
    expect(sanitized).toStrictEqual('Foo < Bar')
  })
})

describe('Base64 encode/decode', () => {
  it('encode UTF-8', () => {
    const encoded = encodeToBase64('Hotel Don Cándido')
    expect(encoded).toStrictEqual('SG90ZWwgRG9uIEPDoW5kaWRv')
  })

  it('decode UTF-8', () => {
    const encoded = decodeFromBase64('SG90ZWwgRG9uIEPDoW5kaWRv')
    expect(encoded).toStrictEqual('Hotel Don Cándido')
  })
})

describe('generate GeoJSON', () => {
  it('generate', () => {
    const id1 = uuidv4()
    const id2 = uuidv4()
    const given: WayPoint[] = [
      {
        id: id1,
        position: [11, 21],
        name: 'way point 1',
        type: 'GENERIC',
      },
      {
        id: id2,
        position: [12, 22],
        name: 'way point 2',
        type: 'FOOD',
      },
    ]
    const actual = generateFeatureCollection(given)

    expect(actual).toEqual({
      features: [
        {
          geometry: {
            coordinates: [21, 11],
            type: 'Point',
          },
          properties: {
            name: 'way point 1',
            type: 'GENERIC',
            uuid: id1,
          },
          type: 'Feature',
        },
        {
          geometry: {
            coordinates: [22, 12],
            type: 'Point',
          },
          properties: {
            name: 'way point 2',
            type: 'FOOD',
            uuid: id2,
          },
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    })
  })
})

describe('convert OSM key and value to PoiType', () => {
  it('convert amenity / food', () => {
    const actual = convertOsmToPoiType('amenity', 'cafe')
    expect(actual).toStrictEqual('FOOD')
  })

  it('convert amenity / non-food', () => {
    const actual = convertOsmToPoiType('amenity', 'library')
    expect(actual).toStrictEqual('GENERIC')
  })

  it('convert mountain pass', () => {
    const actual = convertOsmToPoiType('mountain_pass', '')
    expect(actual).toStrictEqual('SUMMIT')
  })

  it('convert peak', () => {
    const actual = convertOsmToPoiType('natural', 'peak')
    expect(actual).toStrictEqual('SUMMIT')
  })

  it('convert saddle', () => {
    const actual = convertOsmToPoiType('natural', 'saddle')
    expect(actual).toStrictEqual('SUMMIT')
  })

  it('convert hotel', () => {
    const actual = convertOsmToPoiType('tourism', 'hotel')
    expect(actual).toStrictEqual('RESIDENCE')
  })

  it('convert / fallback', () => {
    const actual = convertOsmToPoiType('unknown', 'whatever')
    expect(actual).toStrictEqual('GENERIC')
  })
})

describe('removeDuplicateWaypoints', () => {
  it('should return an empty array when given an empty array', () => {
    const input: WayPoint[] = [];
    const output = removeDuplicateWaypoints(input);

    expect(output).toEqual([]);
    expect(output).toHaveLength(0);
  });

  it('should return the same array when there are no duplicates', () => {
    const input: WayPoint[] = [
      { id: '1', position: [50.1, 8.1], name: 'Point A', type: 'GENERIC' },
      { id: '2', position: [50.2, 8.2], name: 'Point B', type: 'SPRINT' },
      { id: '3', position: [50.3, 8.3], name: 'Point C', type: 'SUMMIT' }
    ];

    const output = removeDuplicateWaypoints(input);

    expect(output).toHaveLength(3);
    expect(output).toEqual(expect.arrayContaining(input));
  });

  it('should remove exact duplicates', () => {
    const waypoint1 = { id: '1', position: [50.1, 8.1], name: 'Point A', type: 'GENERIC' as const } as WayPoint;
    const waypoint2 = { id: '2', position: [50.2, 8.2], name: 'Point B', type: 'GENERIC' as const } as WayPoint;

    const input: WayPoint[] = [
      waypoint1,
      waypoint2,
      { ...waypoint1, id: '3' } // Same position and name, but different ID
    ];

    const output = removeDuplicateWaypoints(input);

    expect(output).toHaveLength(2);
  });

  it('should remove duplicates based on position and name, regardless of type', () => {
    const input: WayPoint[] = [
      { id: '1', position: [50.1, 8.1], name: 'Point A', type: 'GENERIC' },
      { id: '2', position: [50.1, 8.1], name: 'Point A', type: 'SUMMIT' } // Same position and name, different type
    ];

    const output = removeDuplicateWaypoints(input);

    expect(output).toHaveLength(1);
  });

  it('should keep waypoints with same position but different names', () => {
    const input: WayPoint[] = [
      { id: '1', position: [50.1, 8.1], name: 'Point A', type: 'GENERIC' },
      { id: '2', position: [50.1, 8.1], name: 'Point B', type: 'GENERIC' } // Same position, different name
    ];

    const output = removeDuplicateWaypoints(input);

    expect(output).toHaveLength(2);
    expect(output.map(wp => wp.name)).toEqual(expect.arrayContaining(['Point A', 'Point B']));
  });

  it('should handle coordinate precision correctly', () => {
    const input: WayPoint[] = [
      { id: '1', position: [50.123456, 8.123456], name: 'Point A', type: 'GENERIC' },
      { id: '2', position: [50.123457, 8.123455], name: 'Point A', type: 'GENERIC' } // Very similar, but not identical coordinates
    ];

    const output = removeDuplicateWaypoints(input);

    expect(output).toHaveLength(2);
  });
});
