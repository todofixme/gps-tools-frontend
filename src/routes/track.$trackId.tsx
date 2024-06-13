import { createFileRoute } from '@tanstack/react-router'
import TrackScreen from '../pages/TrackScreen'

export const Route = createFileRoute('/track/$trackId')({
  component: TrackScreen,
})
