import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from './-components/Navbar'
import Feedback from './-components/Feedback'
import Providers from '../services/providers'
import Footer from './-components/Footer'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'development'
    ? React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )
    : () => null

const TanStackQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? React.lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      )
    : () => null

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow h-0">
          <Feedback />
          <Outlet />
        </main>
        <Footer />
      </div>
      <Suspense>
        <TanStackRouterDevtools position="bottom-left" />
        <TanStackQueryDevtools position="bottom" initialIsOpen={false} />
      </Suspense>
    </Providers>
  ),
})
