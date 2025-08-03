import { createFileRoute, useParams } from '@tanstack/react-router'
import { TrackScreen } from '../../screens'

export const Route = createFileRoute('/$lang/track/$trackId')({
  component: TrackScreenWrapper,
})

function TrackScreenWrapper() {
  const { trackId } = useParams({ from: '/$lang/track/$trackId' })
  return <TrackScreen trackId={trackId} />
}
