import App from './App.tsx'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
// import Login from './routes/login.tsx'
// import Dashboard from './components/dashboardLogic.tsx'
// import DashboardOverview from './components/dashboardOverview.tsx'
import FlashCardsOverview from './components/flashcardComponents/flashCardsOverview.tsx'
import Deck from './components/flashcardComponents/deck.tsx'
import Lesson from './components/Lesson.tsx'
import { useState, createContext, useContext } from 'react'
import type { LessonType, ProfileData, StateSetter } from './types/react.ts';
import type { User } from 'firebase/auth'
import Explanation from './components/explanation.tsx'
import Video from './components/video.tsx'
import CreateNewDeck from './components/flashcardComponents/createNewDeck.tsx'
import DecksHome from './components/flashcardComponents/DecksHome.tsx'

type UserContextType = { user: User | null, setUser: StateSetter<User | null>, profileData: ProfileData, setProfileData: StateSetter<ProfileData> }
const UserContext = createContext<UserContextType | null>(null)

export default function CreateCustomBrowserRouter() {

    const [user, setUser] = useState<User | null>(null)
    const [profileData, setProfileData] = useState<ProfileData>({ uid: '', level: 0 })

    const router = createBrowserRouter([
        {
            path: '/',
            Component: App,
            errorElement: <div>Route Error</div>,
            children: [
                // {
                //     path: 'login',
                //     Component: Login
                // },
                {
                    path: '',
                    // Component: Dashboard,
                    loader: async () => {
                        if (!user) return

                        const raw = await fetch(`http://localhost:3000/users/${user.uid}`)
                        return raw.ok ? await raw.json() : {}
                    },
                    children: [
                        {
                            index: true,
                            // Component: DashboardOverview,
                            loader: async () => {

                                const raw = await fetch('http://localhost:3000/lessons')
                                const data = await raw.json()
                                return data
                            }
                        },
                        {
                            path: 'lessons/:id',
                            Component: Lesson,
                            children: [{
                                path: 'intro',
                                Component: Explanation
                            },
                            {
                                path: 'listening',
                                Component: Video
                            },
                            {
                                path: 'flashcards',
                                Component: Deck
                            }
                            ],
                            loader: async ({ params }) => {

                                const id = params.id
                                const raw = await fetch(`http://localhost:3000/lessons/${id}`)

                                return await raw.json()
                            }
                        },
                        // {
                        //     path: 'chat',
                        //     Component: ChatWithAI
                        // },
                        {
                            path: 'flashcards',
                            Component: FlashCardsOverview,
                            loader: async () => {
                                const raw = await fetch(`http://localhost:3000/decks/${user?.uid}?level=${profileData.level}`)
                                const data = await raw.json()
                                return data
                            },
                            children: [
                                {
                                    index: true,
                                    Component: DecksHome
                                },
                                {
                                    path: 'deck/:id',
                                    Component: Deck,
                                    loader: async ({ params }) => {

                                        const id = params.id
                                        const raw = await fetch(`http://localhost:3000/decks/${id}`)

                                        return await raw.json()
                                    }
                                },
                                {
                                    path: 'newdeck',
                                    Component: CreateNewDeck
                                }
                            ]
                        }
                    ],
                },
            ]
        }
    ])
    return (
        <UserContext.Provider value={{ user: user, setUser: setUser, profileData, setProfileData }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}