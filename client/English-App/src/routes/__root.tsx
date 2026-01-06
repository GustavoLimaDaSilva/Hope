import * as React from 'react'
import { Outlet, createRootRoute, Link, ErrorComponent, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useGoogleUser } from '../userStore.ts'
import type { User } from 'firebase/auth'
import type { ProfileData, TanstackRouterContext } from '../types/react.ts'

export const Route = createRootRouteWithContext<TanstackRouterContext>()({
    component: RootComponent
})

function RootComponent() {

    const user = useGoogleUser((state) => state.googleUser)
    const navigate = useNavigate()

    useEffect(() => {
        user ? navigate({ to: '/dashboard' }) : navigate({ to: '/login' })

    }, [user])

    return (
        <React.Fragment>
            <Outlet />
            <TanStackRouterDevtools />
        </React.Fragment>
    )
}
