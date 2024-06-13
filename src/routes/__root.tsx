import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/layout/Navbar'
import Feedback from '../components/layout/Feedback'
import Providers from '../components/services/providers'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'development'
    ? React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
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
      </div>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </Providers>
  ),
})
