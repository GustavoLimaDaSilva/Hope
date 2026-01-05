import type { User } from "firebase/auth"
import type { ProfileData } from "./src/types/react"
let LengthParamsTurple: [number, {error: string}]

export function streamTextEffect(text: string) {

    const everyWord = text.split(' ')

    const el = everyWord.map(w => `<span class='visible'>${w}</span>`).join('')

    console.log(el)
    return el
}

export function speak(word: string) {

    const utterThis = new SpeechSynthesisUtterance(word)
    utterThis.lang = "en-US"
    window.speechSynthesis.speak(utterThis)
}

export function isEmpty<T extends object>(obj: T): obj is T & Record<string, unknown> {

    return Object.keys(obj).length === 0
}

export async function postProfile(profileData: ProfileData | {}) {
    
    if (isEmpty(profileData)) return

    await fetch(`http://localhost:3000/users`, {
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

export function postNewLevel(profileData: ProfileData) {

    if (isEmpty(profileData)) return

    fetch(`http://localhost:3000/users/${profileData.uid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profile_level: profileData.level
        })
    })
}

export function minLengthParams(min: number = 4) {

    LengthParamsTurple = [min, { error: 'muito curto' }]
    return LengthParamsTurple
}

export function maxLengthParams(max: number = 80) {

    LengthParamsTurple = [max, { error: 'muito longo' }]
    return LengthParamsTurple
}

