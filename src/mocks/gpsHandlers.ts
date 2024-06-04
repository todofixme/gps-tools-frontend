import { http, HttpResponse } from 'msw'
import { v4 as uuidv4 } from 'uuid'

export const gpsHandlers = [
  http.get(import.meta.env.VITE_BACKEND_BASE_URL + '/version', () => {
    return HttpResponse.json({ app: '1.2.3', git: '0.1.0-SNAPSHOT' })
  }),
  http.get(import.meta.env.VITE_BACKEND_BASE_URL + '/tracks/:trackId', async ({ request }) => {
    if (request.headers.has('Accept') && request.headers.get('Accept') === 'application/geo+json') {
      const buffer = await fetch('/mocks/track.json').then((response) => response.arrayBuffer())
      return HttpResponse.arrayBuffer(buffer, {
        headers: { 'Content-Type': 'application/geo+json' },
      })
    }

    return new HttpResponse('Not found', { status: 404 })
  }),
  http.post(import.meta.env.VITE_BACKEND_BASE_URL + '/tracks', async ({ request }) => {
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
      return new HttpResponse('Missing document', { status: 400 })
    }

    if (!(file instanceof File)) {
      return new HttpResponse('Uploaded document is not a File', { status: 400 })
    }

    const uuid = uuidv4()
    return HttpResponse.json([
      {
        id: uuid,
        filename: file.name,
        mimeType: 'application/octet-stream',
        href: 'http://localhost:7001/files/' + uuid,
        size: 1733,
      },
    ])
  }),
  http.post(import.meta.env.VITE_BACKEND_BASE_URL + '/merge', async () => {
    const uuid = uuidv4()
    return HttpResponse.json({
      id: uuid,
      filename: 'merged.gpx',
      mimeType: 'application/octet-stream',
      href: 'http://localhost:7001/files/' + uuid,
      size: 3444,
    })
  }),
  http.delete(import.meta.env.VITE_BACKEND_BASE_URL + '/tracks/*', async () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
