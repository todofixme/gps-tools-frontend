import { describe, expect, it } from 'vitest'
import { v4 as uuidv4 } from 'uuid'
import { isKnownRoute } from './routing'

describe('isKnownRoute', () => {
  describe('exact routes', () => {
    it('should return true for /faq', () => {
      expect(isKnownRoute('/faq')).toBe(true)
    })

    it('should return true for /about', () => {
      expect(isKnownRoute('/about')).toBe(true)
    })
  })

  describe('unknown routes', () => {
    it('should return false for /foobar', () => {
      expect(isKnownRoute('/foobar')).toBe(false)
    })

    it('should return false for /track without UUID', () => {
      expect(isKnownRoute('/track')).toBe(false)
    })

    it('should return false for /track with invalid UUID', () => {
      expect(isKnownRoute('/track/123')).toBe(false)
    })
  })

  describe('track UUID routes', () => {
    it('should return true for valid track UUID', () => {
      expect(isKnownRoute('/track/4d2dd253-ddbe-4825-a041-b017a3fc4001')).toBe(true)
    })

    it('should return true for dynamically generated UUID', () => {
      const uuid = uuidv4()
      expect(isKnownRoute(`/track/${uuid}`)).toBe(true)
    })

    it('should return false for track UUID with additional path segments', () => {
      const uuid = uuidv4()
      expect(isKnownRoute(`/track/${uuid}/something`)).toBe(false)
    })

    it('should handle uppercase UUIDs', () => {
      expect(isKnownRoute('/track/4D2DD253-DDBE-4825-A041-B017A3FC4001')).toBe(true)
    })

    it('should handle mixed case UUIDs', () => {
      expect(isKnownRoute('/track/4d2DD253-ddBE-4825-a041-B017a3fc4001')).toBe(true)
    })
  })

  describe('routes with query parameters', () => {
    it('should return true for /about with query parameters', () => {
      expect(isKnownRoute('/about?param=value')).toBe(true)
    })

    it('should return true for track UUID with query parameters', () => {
      const uuid = uuidv4()
      expect(isKnownRoute(`/track/${uuid}?tab=details`)).toBe(true)
    })
  })

  describe('routes with hash fragments', () => {
    it('should return true for /about with hash fragment', () => {
      expect(isKnownRoute('/about#section')).toBe(true)
    })

    it('should return true for track UUID with hash fragment', () => {
      const uuid = uuidv4()
      expect(isKnownRoute(`/track/${uuid}#overview`)).toBe(true)
    })
  })

  describe('routes with both query parameters and hash fragments', () => {
    it('should return true for /about with both', () => {
      expect(isKnownRoute('/about?param=value#section')).toBe(true)
    })

    it('should return true for track UUID with both', () => {
      const uuid = uuidv4()
      expect(isKnownRoute(`/track/${uuid}?tab=details#section`)).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should return false for malformed UUIDs', () => {
      expect(isKnownRoute('/track/4d2dd253-ddbe-4825-a041')).toBe(false) // too short
      expect(isKnownRoute('/track/4d2dd253-ddbe-4825-a041-b017a3fc4001-extra')).toBe(false) // too long
      expect(isKnownRoute('/track/4d2dd253ddbe4825a041b017a3fc4001')).toBe(false) // no dashes
      expect(isKnownRoute('/track/4d2dd253-ddbe-4825-a041-b017a3fc400g')).toBe(false) // invalid character
    })

    it('should return false for empty or invalid inputs', () => {
      expect(isKnownRoute('')).toBe(false)
      expect(isKnownRoute('/')).toBe(true) // root should be true if in exactRoutes
    })

    it('should return false for routes with trailing slashes on track', () => {
      const uuid = uuidv4()
      expect(isKnownRoute(`/track/${uuid}/`)).toBe(false)
    })
  })
})
