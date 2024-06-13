import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { routeTree } from './routeTree.gen'
import NotFoundScreen from './pages/NotFoundScreen'

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFoundScreen })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const prepareMockServiceWorker = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }

  return Promise.resolve()
}

prepareMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
})
