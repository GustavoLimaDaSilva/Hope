import { Link, createFileRoute, useLoaderData } from "@tanstack/react-router"
import type { DeckType, DecksType } from "../../types/react.ts"
import { useGoogleUser, useProfileData } from "../../userStore.ts";

const user = useGoogleUser.getState().googleUser
const profileData = useProfileData.getState().profileData

export const Route = createFileRoute('/flashcards/')({
    component: FlashcardsIndex,
    loader: async () => {

        if (!user) {
            return {
                lesson_decks: [],
                personal_decks: []
            }
        }

        const raw = await fetch(`http://localhost:3000/decks/${user?.uid}?level=${profileData.level}`)
        const data = await raw.json()
        return data
    }
})

export default function FlashcardsIndex() {
    const decks: DecksType = Route.useLoaderData()

    const createDeckLinks = (d: DeckType, index: number) => <Link to={`flashcards/deck/${d.id}`} key={index}>{d.name}</Link>

    return (
        <>
            <h2>Decks desbloqueados</h2>
            {decks.lesson_decks.map(createDeckLinks)}
            <h2>Seus decks personalizados</h2>
            {decks.personal_decks.map(createDeckLinks)}
            <div>
                <Link to={'criarDeck'}>+ criar deck</Link>
            </div>
        </>)
}