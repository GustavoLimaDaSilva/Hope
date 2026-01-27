import { users } from './fileReader.js';
const fs = await import('fs/promises');
const crypto = await import('crypto');
function createHexId() {
    return [...crypto.getRandomValues(new Uint8Array(20))].map(m => ('0' + m.toString(16)).slice(-2)).join('');
}
export async function writePersonalDeck(deck, uid) {
    const userIndex = users.findIndex((u) => u.uid === uid);
    if (userIndex >= 0 && users[userIndex]?.flashcard_decks) {
        const user = users[userIndex];
        user.flashcard_decks.push({ ...deck, id: createHexId() });
        users.splice(userIndex, 1, user);
    }
    try {
        await fs.writeFile('./data/users.json', JSON.stringify(users));
    }
    catch (err) {
        console.error('happened at writePersonalDeck: ', err);
        throw err;
    }
    return true;
}
//# sourceMappingURL=utils.js.map