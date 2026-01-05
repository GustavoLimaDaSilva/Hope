import { personal_decks } from './fileReader.js'
const fs = await import('fs/promises')

const crypto = await import('crypto')

export function createHexId() {

    return crypto.randomBytes(16).toString("hex")
}

export function normalizeDeckData(deckData: Record<string, string>) {

    deckData.imageFile ? deckData.deckType = 'image' : 'written'

    deckData.id = createHexId()

    return deckData
}

export async function writePersonalDeck(normalizedDeck: Record<string, string>, uid: string) {

    const userIndex = personal_decks.findIndex((d: Record<string, string>) => d.uid === uid)
    let decks = []
    if (userIndex >= 0) {
        const user = personal_decks[userIndex]
        user.decks.push({...normalizedDeck })
        personal_decks.splice(userIndex, 1, user)

    } 
    else {
        decks.push({...normalizedDeck })
        personal_decks.push({
            uid: uid,
            decks: decks
        })
    }
    try {
        await fs.writeFile('personalDecks.json', JSON.stringify(personal_decks))
    } catch (err) {
        console.error('happened at writePersonalDeck: ', err)
        throw err
    }

    return true
}