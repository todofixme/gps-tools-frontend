import { http, HttpResponse } from 'msw'

export const tileHandlers = [
  // OpenStreetMap
  http.get('https://*.tile.openstreetmap.org/*/*/*.png', async () => {
    const buffer = await fetch('/mocks/tile.png').then((response) => response.arrayBuffer())
    return HttpResponse.arrayBuffer(buffer, {
      headers: { 'Content-Type': 'image/png' },
    })
  }),
  // OpenTopoMap
  http.get('https://*.tile.opentopomap.org/*/*/*.png', async () => {
    const buffer = await fetch('/mocks/topo.png').then((response) => response.arrayBuffer())
    return HttpResponse.arrayBuffer(buffer, {
      headers: { 'Content-Type': 'image/png' },
    })
  }),
  // Esri / ArcGIS
  http.get(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/*/*/*',
    async () => {
      const buffer = await fetch('/mocks/tile.jpeg').then((response) => response.arrayBuffer())
      return HttpResponse.arrayBuffer(buffer, {
        headers: { 'Content-Type': 'image/jpeg' },
      })
    },
  ),
]
