import { createFileRoute } from '@tanstack/react-router'
import FaqScreen from '../../faq/-screens/FaqScreen'
import { handleLanguages } from '..'

export const Route = createFileRoute('/$lang/faq/')({
  loader: ({ location }) => handleLanguages(location),
  component: FaqScreen,
})
