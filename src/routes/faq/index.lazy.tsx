import { createLazyFileRoute } from '@tanstack/react-router'
import FaqScreen from './-screens/FaqScreen'

export const Route = createLazyFileRoute('/faq/')({
  component: FaqScreen,
})
