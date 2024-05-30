import { setupWorker } from 'msw/browser'
import { gpsHandlers } from './gpsHandlers'
import { tileHandlers } from './tileHandlers'
import { photonHandlers } from './photonHandlers'

export const worker = setupWorker(...gpsHandlers, ...tileHandlers, ...photonHandlers)
