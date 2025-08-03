import { createFileRoute } from '@tanstack/react-router'
import { FaqScreen } from '../../screens'

export const Route = createFileRoute('/$lang/faq')({
  component: FaqScreen,
})
