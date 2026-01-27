// import { createHexId, normalizeDeckData, writePersonalDeck } from './utils.ts'

const { lessons, users } = (await import('./fileReader.js'))
const express = (await import('express')).default
const cors = (await import('cors')).default
const usersRoute = (await import('./routes/users.js')).default
const lessonsRoute = (await import('./routes/lessons.js')).default
const decksRoute = (await import('./routes/decks.js')).default
const imageAuthRoute = (await import('./imageKitAuth.js')).default
const app = express()

app.use(express.json())
const port = 3000

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

app.use('/users', usersRoute)
app.use('/lessons', lessonsRoute)
app.use('/decks', decksRoute)
app.use('/auth', imageAuthRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})


