import { createFileRoute } from '@tanstack/react-router'
import LangAboutScreen from './-screens/LangAboutScreen'

export const Route = createFileRoute('/$lang/about/')({
  component: LangAboutScreen,
})
