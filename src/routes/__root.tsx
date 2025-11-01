import React, { Suspense } from 'react'
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import Providers from '../services/providers'
import { defaultLanguage, Language, languageIndexPathPattern, languagePagePathPattern, } from '../@types/language.ts'
import { isKnownRoute } from '../utils/routing.ts'
import { LanguageProvider } from '../services/providers/language/LanguageProvider.tsx'
import { Feedback, Footer, Navbar } from '../components'
import { NotFoundScreen } from '../screens'

const TanStackRouterDevtools =
  import.meta.env.DEV
    ? React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
    : () => null

const TanStackQueryDevtools =
  import.meta.env.DEV
    ? React.lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
    : () => null

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const pathname = location.pathname

    const langMatch = pathname.match(languageIndexPathPattern)
    if (langMatch) {
      console.log('INDEX page')
      console.log(`Valid language ${langMatch[1]}`)
      return { language: langMatch[1] as Language }
    }

    const validLanguageWithPath = pathname.match(languagePagePathPattern)
    if (validLanguageWithPath) {
      const lang = validLanguageWithPath[1]
      const pagePath = validLanguageWithPath[2]

      if (lang === 'en' || lang === 'de') {
        console.log(`Valid language ${lang}`)
        const showNotFound = !isKnownRoute(pagePath) // if route is not known, show 404 page
        console.log(`path ${pagePath} is known: ${isKnownRoute(pagePath)}`)
        return { language: lang as Language, showNotFound: showNotFound }
      }

      console.log(`Unknown language ${lang}`)
      return { language: defaultLanguage, showNotFound: true }
    }

    if (isKnownRoute(pathname)) {
      const targetPath = pathname === '/' ? '/en/' : `/en${pathname}`
      throw redirect({
        to: targetPath as never,
        replace: true,
      })
    }

    return { language: defaultLanguage, showNotFound: true }
  },
  component: () => {
    const context = Route.useRouteContext()
    const { language, showNotFound } = context as never

    return (
      <LanguageProvider language={language}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="grow h-0">
              <Feedback/>
              {showNotFound ? <NotFoundScreen/> : <Outlet/>}
            </main>
            <Footer/>
          </div>
          <Suspense>
            <TanStackRouterDevtools position="bottom-left"/>
            <TanStackQueryDevtools position="bottom" initialIsOpen={false}/>
          </Suspense>
        </Providers>
      </LanguageProvider>
    )
  },
})
