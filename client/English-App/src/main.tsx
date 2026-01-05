import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CreateCustomBrowserRouter from './RouterProvider'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
    // <CreateCustomBrowserRouter />
    <RouterProvider router={router}/>
)
