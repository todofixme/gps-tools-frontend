import { createFileRoute } from '@tanstack/react-router'
import { MergeScreen } from '../../screens'

export const Route = createFileRoute('/$lang/')({
  component: MergeScreen,
})
