import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { useGoogleUser, useProfileData } from './userStore.ts'
import type { TanstackRouterContext } from './types/react.ts'

const router = createRouter({
  routeTree,
  context: {
    getUser: () => useGoogleUser.getState().googleUser,
    getProfileData: () => useProfileData.getState().profileData
  } satisfies TanstackRouterContext
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
