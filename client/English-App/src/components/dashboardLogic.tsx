import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router";
import { isEmpty, postNewLevel, postProfile } from "../../utils.ts";
import type { ProfileData } from "../../../../shared-types/API.ts";
import { useGoogleUser, useProfileData } from "../userStore.ts";
import { isObjEmpty } from "../../../../typeGuards.ts";

export default function DashboardLogic({ children, storedProfile }: { children: React.ReactNode, storedProfile: ProfileData | {} }) {

    const user = useGoogleUser((state) => state.googleUser)
    const profileData = useProfileData((state) => state.profileData)
    const setProfileData = useProfileData((state) => state.setProfileData)

    useEffect(() => {

        initializeProfile()
    }, [])

    const data = localStorage.getItem('new_level')

    const newLevel: number | null =
        data !== null ? JSON.parse(data) : null

    useEffect(() => {
        if (!newLevel) return

        if (newLevel > profileData.level) {

            setProfileData({ uid: profileData.uid, level: newLevel })
            postNewLevel({ uid: profileData.uid, level: newLevel })
        }
        localStorage.removeItem('new_level')
    }, [newLevel])

    return (
        <>
            {children}
        </>
    )

    async function initializeProfile() {

        if (!user?.uid || profileData.uid) return

        const newProfile = { uid: user!.uid, level: 0 }

        if (isObjEmpty(storedProfile) || user!.uid !== (storedProfile as ProfileData).uid) {

            setProfileData(newProfile)
            await postProfile(newProfile)
            return
        }

        if (storedProfile) setProfileData(storedProfile as ProfileData)
    }
}