import type { UseNavigateResult } from "@tanstack/react-router"
import type { decksSearchSchema } from "./schemas/searchParams.ts"
import type { DeckType, ProfileData } from "./types/index.ts"
import type { FlashcardSchema } from "./schemas/deckForm.ts"
import type z from "zod"
let LengthParamsTurple: [number, { error: string }]

export function streamTextEffect(text: string) {

    const everyWord = text.split(' ')

    const el = everyWord.map(w => `<span class='visible'>${w}</span>`).join('')

    return el
}

export function speak(word: string) {

    const utterThis = new SpeechSynthesisUtterance(word)
    utterThis.lang = "en-US"
    window.speechSynthesis.speak(utterThis)
}

export function isEmpty<T extends object>(obj: T): obj is T & Record<string, unknown> {

    if (!obj) return true

    return Object.keys(obj).length === 0
}

export function getLocationBeforeRefresh() {
    const raw = sessionStorage.getItem("location")
    if (!raw) return

    const locationBeforeRefresh = JSON.parse(raw)
    return locationBeforeRefresh
}

export async function postProfile(profileData: ProfileData | {}) {

    if (isEmpty(profileData)) return

    await fetch(`https://api-o37g4y27ua-uc.a.run.app/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profile_data: profileData
        })
    })
}

export default async function deleteProfile(uid: string) {

    await fetch(`https://api-o37g4y27ua-uc.a.run.app/users/${uid}`, {
         method: 'DELETE'
    })
}

export function postNewLevel(profileData: ProfileData) {

    if (isEmpty(profileData)) return

    fetch(`https://api-o37g4y27ua-uc.a.run.app/users/${profileData.uid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profileLevel: profileData.level
        })
    })
}

export async function putDeck(updatedDeck: DeckType, uid: string | undefined) {

    if (!uid) return

    const req = await fetch(`https://api-o37g4y27ua-uc.a.run.app/decks/updateDeck/${uid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updatedDeck: updatedDeck
        })
    })
    const res = await req.json()
    return res
}

export function minLengthParams(min: number = 4) {

    LengthParamsTurple = [min, { error: 'muito curto' }]
    return LengthParamsTurple
}

export function maxLengthParams(max: number = 80) {

    LengthParamsTurple = [max, { error: 'muito longo' }]
    return LengthParamsTurple
}


export async function postPersonalDeck(formData: { deckDescription: string | null; name: string; }, profileData: ProfileData, flashcardData: FlashcardSchema[], navigate: UseNavigateResult<string>) {

    if (flashcardData.length === 0) return

    const res = await fetch(`https://api-o37g4y27ua-uc.a.run.app/decks/personalDecks/${profileData.uid}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            formData: { ...formData, cards: flashcardData }
        })
    })

    if (res.status === 201) {
        navigate({
            to: '..',
            search: () => ({ level: profileData.level } satisfies z.infer<typeof decksSearchSchema>)
        })
    }
}

export function rightPhraseCartao(cardLength: number) {

    if (cardLength === 0) return "nenhum cartão ainda!"

    if (cardLength === 1) return `${cardLength} cartão`

    if (cardLength > 1) return `${cardLength} cartões`
}

export function scrollToBottom(el: HTMLElement) {

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
}

export function getNameFirstLetters(username: string | null) {

    if (username) {

        return username.charAt(0) + username[username?.indexOf(" ") + 1]
    }
}

export function getFromStorage<T>(item: string): T | undefined {

    const localData = localStorage.getItem(item)

    if (localData) {

        return JSON.parse(localData)
    }

    const sessionData = sessionStorage.getItem(item)

    if (sessionData) {
        return JSON.parse(sessionData)
    }
}


export async function getStoredProfile(uid: string) {

    const rawProfile = await fetch(`https://api-o37g4y27ua-uc.a.run.app/users/${uid}`)
    const storedProfile: ProfileData | Record<string, never> = await rawProfile.json()
    return storedProfile
}