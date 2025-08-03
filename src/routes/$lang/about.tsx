import { createFileRoute } from '@tanstack/react-router'
import { AboutScreen } from '../../screens'

export const Route = createFileRoute('/$lang/about')({
  component: AboutScreen,
})
