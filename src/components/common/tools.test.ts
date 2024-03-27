import { describe, it, expect } from 'vitest'
import { decodeFromBase64, encodeToBase64, sanitizeFilename } from './tools'

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
