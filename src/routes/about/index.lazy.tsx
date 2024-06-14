import { createLazyFileRoute } from '@tanstack/react-router'
import AboutScreen from './-screens/AboutScreen'

export const Route = createLazyFileRoute('/about/')({
  component: AboutScreen,
})
