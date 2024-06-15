import { createFileRoute } from '@tanstack/react-router'
import TrackScreen from './-screens/TrackScreen'

export const Route = createFileRoute('/track/$trackId')({
  component: TrackScreen,
})
