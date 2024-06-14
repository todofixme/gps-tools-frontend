import { createFileRoute } from '@tanstack/react-router'
import MergeScreen from './-screens/MergeScreen'

export const Route = createFileRoute('/(root)/')({
  component: MergeScreen,
})
