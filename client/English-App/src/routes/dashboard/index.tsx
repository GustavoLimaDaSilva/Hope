import { Link } from "@tanstack/react-router"
import type { ProfileData } from "../../types/index.ts"
import DashboardLogic from "../../components/dashboardLogic.tsx"
import { createFileRoute } from "@tanstack/react-router"
import { useGoogleUser, useProfileData } from "../../userStore.ts"
import { nanoid } from "nanoid"
import type { decksSearchSchema } from "../../schemas/searchParams.ts"
import type z from "zod"
import Welcome from "../../components/welcome.tsx"
import LessonsTable from "../../components/lessonsTable.tsx"
import { getFromStorage, getStoredProfile, isEmpty } from "../../utils.ts"
import Tutorial from "../../components/tutorial.tsx"
import Loading from "../../components/loading.tsx"
import FirstLevelUp from "../../components/firstLevelUp.tsx"

export const Route = createFileRoute('/dashboard/')({
    component: DashBoardOverview,
    shouldReload: () => true,
    loader: async ({ context }) => {

        const user = context.getUser()

        if (!user) {
            return { storedProfile: null }
        }
        const storedProfile = await getStoredProfile(user.uid)
        const rawLesson = await fetch('https://api-o37g4y27ua-uc.a.run.app/lessons')
        const lessons = await rawLesson.json()

        const res = await fetch("https://api-o37g4y27ua-uc.a.run.app/lessons/allVideos")
        const { lessonVideos, playlistId } = await res.json()
        return { storedProfile: storedProfile, lessons: lessons, lessonVideos: lessonVideos, playlistId }
    },
})

function DashBoardOverview() {

    const { storedProfile } = Route.useLoaderData() satisfies { storedProfile: ProfileData | Record<string, never> }
    const profileData = useProfileData((state) => state.profileData)
    const user = useGoogleUser((state) => state.googleUser)

    const tutorialToastFired = getFromStorage<boolean | undefined>("tutorialToastFired")
    const levelUpToastFired = getFromStorage("levelUpToastFired")
    const welcomeFired = getFromStorage("welcomeFired")
    return (
        storedProfile === null || !user ? <Loading />
            :
            <DashboardLogic storedProfile={storedProfile}>
                <div className="dashboard-wrapper">
                    {profileData.level === 1 && !levelUpToastFired ?
                        <FirstLevelUp />
                        : null
                    }
                    {isEmpty(storedProfile) && !tutorialToastFired ?
                        <Tutorial />
                        : null
                    }
                    {!isEmpty(storedProfile) && !welcomeFired ?
                        !tutorialToastFired && 
                        <Welcome />
                        : null}
                    <main className="main">
                        <div key={nanoid()} className="card has-background studying-illustration">
                            <Link to={`/decks/${user.uid}`} search={{ level: profileData.level } satisfies z.infer<typeof decksSearchSchema>}>Ver Flashcards</Link>
                        </div>
                        <div key={nanoid()} className="card has-background AI-illustration">
                            <Link to={'/chat'}> Converse com a nossa IA em inglês</Link>
                        </div>
                        <LessonsTable />
                    </main>
                </div>
            </DashboardLogic >
    )
}