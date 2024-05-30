import { http, HttpResponse } from 'msw'

export const photonHandlers = [
  http.get('https://photon.komoot.io/api/', async () => {
    const buffer = await fetch('/mocks/photon.json').then((response) => response.arrayBuffer())
    return HttpResponse.arrayBuffer(buffer, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
  }),
]
