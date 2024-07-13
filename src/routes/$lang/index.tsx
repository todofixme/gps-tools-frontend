import { createFileRoute, notFound, ParsedLocation, redirect } from '@tanstack/react-router'
import MergeScreen from '../(root)/-screens/MergeScreen'

export const Route = createFileRoute('/$lang/')({
  loader: ({ location }) => handleLanguages(location),
  component: MergeScreen,
})

export const handleLanguages = (location: ParsedLocation) => {
  const supportedLanguages = ['en', 'de']
  const pathElements = location.pathname.split('/')
  const lang = pathElements[1]

  if (supportedLanguages.includes(lang)) {
    console.log({ lang: lang })

    if (lang === 'en') {
      const elementsWithoutLanguage = pathElements.slice(2)
      const pathWithoutLanguage = '/' + elementsWithoutLanguage.join('/')
      throw redirect({ to: pathWithoutLanguage })
    }
  } else {
    console.log('language unknown: ' + lang)
    throw notFound()
  }
}
