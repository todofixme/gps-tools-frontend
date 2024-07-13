import { createFileRoute } from '@tanstack/react-router'
import { handleLanguages } from '..'
import AboutScreen from '../../about/-screens/AboutScreen'

export const Route = createFileRoute('/$lang/about/')({
  loader: ({ location }) => handleLanguages(location),
  component: AboutScreen,
})
