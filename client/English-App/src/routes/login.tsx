import { createFileRoute } from '@tanstack/react-router'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useUserContext } from '../RouterProvider.tsx'
import { auth } from '../../firebaseConfig.ts'
import { useGoogleUser } from '../userStore.ts'

export const Route = createFileRoute('/login')({
component: loginn})

function loginn() {

    const setUser = useGoogleUser((state) => state.setGoogleUser)

    return (
        <>
            <button onClick={loginGoogle}>Sign in</button>
        </>
    )

    async function loginGoogle() {

        const provider = new GoogleAuthProvider()

        try {
            const data = await signInWithPopup(auth, provider)
            setUser(data.user)

        } catch (err) {
            console.error("the following happened at loginGoogle: " + err)
        }
    }
}