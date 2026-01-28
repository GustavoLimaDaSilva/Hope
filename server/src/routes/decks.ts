import { Router } from "express"
import { lessons, users } from "../fileReader.js"
import { writePersonalDeck } from "../utils.js"
import type { DeckType } from "../../../shared-types/API.js"
const router = Router()

router.get('/:uid', (req, res) => {

    if (!req.query) return
    const level = req.query.level
    if (!level) return

    const uid = req.params.uid
    type Data = { name: string, id: string }

    const lesson_decks_data: Data[] = []
    lessons?.some(l => {

        lesson_decks_data.push({ name: l.name, id: l.id })
        if (l.level === Number(level)) return true
    })

    const user_decks_data: Data[] = []
    const user = users.find(u => u.uid === uid)

    user?.flashcard_decks?.forEach((deck: DeckType) => {
        user_decks_data.push({ name: deck.name, id: deck.id })
    }) ?? []

    res.json({
        lessonDecksData: lesson_decks_data,
        personalDecksData: user_decks_data
    })
})

router.get('/lessonDecks/:id', (req, res) => {

    const id = req.params.id
    const deck = lessons.find(l => l.id === id)?.flashcard_deck

    if (deck) {
        res.json(deck)
    }
    res.json([])
})

router.get('/personalDecks/:uid/:deckId', async (req, res) => {

    const uid = req.params.uid
    const deckId = req.params.deckId
    const deck = users.find(u => (u.uid === uid))?.flashcard_decks?.find((d: DeckType) => d.id === deckId)
    
        if (deck) {
        res.json(deck)
    }
    res.json([])

})

router.post('/personalDecks/:uid', async (req, res) => {

    const form_data = req.body?.form_data
    const uid = req.params.uid
    if (!form_data) return

    const success = await writePersonalDeck(form_data, uid)

    success ? res.status(201).json('Deck created successfully') : res.status(500).json('Internal Server Error')
    res.status(201).json('Deck created successfully')
})

export default router