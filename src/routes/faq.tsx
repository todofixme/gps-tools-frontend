import { createFileRoute } from '@tanstack/react-router'
import FaqScreen from '../pages/FaqScreen'

export const Route = createFileRoute('/faq')({
  component: FaqScreen,
})
