import * as React from 'react'
import { Outlet, createRootRoute, Link, ErrorComponent } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useGoogleUser } from '../userStore.ts'

export const Route = createRootRoute({
    component: RootComponent,

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
