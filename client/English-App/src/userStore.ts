import type { User } from 'firebase/auth'
import { create } from 'zustand'
import type { ProfileData } from './types/index.ts'

type UseGoogleUser = {
    googleUser: null | User,
    setGoogleUser: (params: User) => void
}

type UseProfileData = {
    profileData: ProfileData,
    setProfileData: (params: ProfileData) => void
}

export const useGoogleUser = create<UseGoogleUser>((set) => ({
    googleUser: null,
    setGoogleUser: (actualUser: User) => set({ googleUser: actualUser }),
}))

export const useProfileData = create<UseProfileData>((set) => ({
    profileData: { uid: '', level: 0 },
    setProfileData: (actualData: ProfileData) => set({ profileData: actualData })
}))