import { describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Providers from '../../../services/providers'
import MergeScreen from './MergeScreen'
import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import type { AnyRouter, RouterHistory } from '@tanstack/react-router'

let history: RouterHistory

beforeEach(() => {
  history = createBrowserHistory()
  expect(window.location.pathname).toBe('/')
})
afterEach(() => {
  history.destroy()
  window.history.replaceState(null, 'root', '/')
  vi.clearAllMocks()
  vi.resetAllMocks()
  cleanup()
})

describe.skip('Root/Merge Screen', () => {
  it('load page', () => {
    const rootRoute = createRootRoute()
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => {
        return (
          <Providers>
            <MergeScreen />
          </Providers>
        )
      },
    })

    const routeTree = rootRoute.addChildren([indexRoute])
    const router: AnyRouter = createRouter({ routeTree, history })

    render(<RouterProvider router={router} />)

    expect(
      screen.getByText("Drag 'n' drop GPX- or FIT-files, or click to select files."),
    ).toBeInTheDocument()
  })
})
