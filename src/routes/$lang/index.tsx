import { createFileRoute } from '@tanstack/react-router'
import MergeScreen from './-screens/MergeScreen'

export const Route = createFileRoute('/$lang/')({
  component: MergeScreen,
  notFoundComponent: () => {
    return <p>Site not found!</p>
  },
  errorComponent: (_) => {
    return <p>Error: something went wrong</p>
  }
})
