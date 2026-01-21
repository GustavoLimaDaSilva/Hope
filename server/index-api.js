// import { createHexId, normalizeDeckData, writePersonalDeck } from './utils.ts'

const fs = await import('fs/promises')
const { personal_decks, lessons, users } = (await import('./fileReader.js'))
const express = (await import('express')).default
const cors = (await import('cors')).default
const app = express()
const imageAuthRoute = (await import('./imageKitAuth.js')).default

app.use('/auth', imageAuthRoute)
app.use(express.json())
const port = 3000

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

app.use('/videos', express.static('./lessons/videos'))

app.get('/lessons', (req, res) => {

    res.json(lessons)
})

app.get('/lessons/:id', (req, res) => {

    const id = req.params.id

    const lesson = lessons.find(l => l.id === id)
    res.json(lesson)
})


app.get('/decks/:uid', (req, res) => {

    if (!req.query) return
    const level = req.query.level
    if (!level) return

    const uid = req.params.uid

    const lesson_decks_data = []
    lessons?.some(l => {

        lesson_decks_data.push({ name: l.name, id: l.id })
        if (l.level === level) return true
    })

    const user_decks_data = []
    users.find(u => u.uid === uid)
        .flashcard_deck.forEach(deck => {
            user_decks_data.push({ name: deck.name, id: deck.id })
        })

    res.json({
        lessonDecksData: lesson_decks_data,
        personalDecksData: user_decks_data
    })
})

app.get('/lessonDecks/:id', (req, res) => {

    const id = req.params.id

   const deck = lessons.find(l => l.id === id).flashcard_deck

    res.json(deck)
})

app.get('/personalDecks/:uid/:deckId', async (req, res) => {

    const uid = req.params.uid
    const deckId = req.params.deckId
    const deck = users.find(u => (u.uid === uid))
        .flashcard_deck.find(d => d.id === deckId)

    res.json(deck)
})

app.post('/personalDecks/:id', async (req, res) => {

    // const form_data = req.body?.form_data
    // const uid = req.params.uid
    // if (!form_data) return

    // const normalizedDeck = normalizeDeckData(form_data)
    // const success = await writePersonalDeck(normalizedDeck, uid)

    // success ? res.status(201).json('Deck created successfully') : res.status(500).json('Internal Server Error')
    res.status(201).json('Deck created successfully')
})

app.get('/users/:uid', (req, res) => {

    if (users.length === 0) {
        res.json([])
        return
    }
    const uid = req.params.uid
    const user = users.find(u => u.uid === uid)
    user ? res.json(user) : res.json({})
})


app.post('/users', async (req, res) => {

    const newUser = req.body
    if (!newUser) return

    let usersArr = []
    users.length ? usersArr = users : []

    if (usersArr.some(u => u.uid === newUser.uid)) {

        res.status(409).json({ message: 'User already exists' })
        return
    }
    usersArr.push({ ...newUser.profile_data })
    await fs.writeFile('users.json', JSON.stringify(usersArr))
    res.status(201).json({ message: 'User created successfully' })
})


app.put('/users/:uid', async (req, res) => {

    const new_level = req.body.profile_level
    if (!new_level) return

    const uid = req.params.uid
    const index = users.findIndex(u => u.uid === uid)

    users[index].level = new_level

    await fs.writeFile('users.json', JSON.stringify(users))
    res.status(201).json({ message: 'User updated successfully' })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})


