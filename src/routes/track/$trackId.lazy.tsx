import { createLazyFileRoute } from '@tanstack/react-router'
import TrackScreen from './-screens/TrackScreen'

export const Route = createLazyFileRoute('/track/$trackId')({
  component: TrackScreen,
})
