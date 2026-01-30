import type { DeckType } from '../../shared-types/API.js';
import { users } from './fileReader.js'
import type { ServerUser } from './types/index.js';
const fs = await import('fs/promises')
const crypto = await import('crypto')


function createHexId() {

    return [...crypto.getRandomValues(new Uint8Array(20))].map(m => ('0' + m.toString(16)).slice(-2)).join('');
}


export async function writePersonalDeck(deck: Omit<DeckType, 'id'>, uid: string) {

    const userIndex: number = users.findIndex((u: ServerUser) => u.uid === uid)
    const user = users[userIndex]

    if (user) {
        const newDeck = { ...deck, id: createHexId()} satisfies DeckType
        
        user.flashcard_decks ?
            user.flashcard_decks.push(newDeck)
            :
            user.flashcard_decks = [newDeck]
        users.splice(userIndex, 1, user)
    }

    if (!user?.flashcard_decks) return false
    try {
        await fs.writeFile('D:/dev/English-Learning-App/server/data/users.json', JSON.stringify(users))
    } catch (err) {
        console.error('happened at writePersonalDeck: ', err)
        throw err
    }
    return true
}

