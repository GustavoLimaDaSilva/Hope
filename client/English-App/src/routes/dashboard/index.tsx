import { Link, useLoaderData } from "@tanstack/react-router"
import type { LessonType, ProfileData } from "../../types/react.ts"
import { isEmpty } from "../../../utils.ts"
import Toast from "../../components/toast.tsx"
import DashboardLogic from "../../components/dashboardLogic.tsx"
import { createFileRoute } from "@tanstack/react-router"
import { useGoogleUser, useProfileData } from "../../userStore.ts"
const user = useGoogleUser.getState().googleUser

export const Route = createFileRoute('/dashboard/')({
    component: DashBoardOverview,
    loader: async () => {

        if (!user) {
            return { storedProfile: null }
        }
        const rawProfile = await fetch(`http://localhost:3000/users/${user.uid}`)
        const storedProfile = await rawProfile.json()

        // const rawLesson = await fetch('http://localhost:3000/lessons')
        // const lessons =  rawProfile.ok ? await rawLesson.json() : {}

        return { storedProfile: storedProfile }
    },
})

function DashBoardOverview() {

    const { storedProfile } = Route.useLoaderData() satisfies { storedProfile: ProfileData }

    const profileData = useProfileData((state) => state.profileData)


    const data = localStorage.getItem('toastFired')
    const toastFired = data ? JSON.parse(data) : false

    return (
        <DashboardLogic storedProfile={storedProfile}>
            <div>
                {profileData.level === 1 && !toastFired ? <Toast toastFired={toastFired} className="toast" msg="agora você já pode encontrar o deck da sua lição na área de flashcards!" /> : null}
                <p>hello </p>
                <Link to={'/flashcards'}>Ver flashcards</Link>
                <Link to={'/chat'}>
                    <div>
                        Converse com a nossa IA em inglês
                    </div>
                </Link>
                {/* {lessons.map((l, index) => <Link to={`lessons/${l.id}/intro`} key={index}>{l.name}</Link>)} */}
            </div>
        </DashboardLogic>
    )
}