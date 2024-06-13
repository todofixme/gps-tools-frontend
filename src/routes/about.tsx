import { createFileRoute } from '@tanstack/react-router'
import AboutScreen from '../pages/AboutScreen'

export const Route = createFileRoute('/about')({
  component: AboutScreen,
})
