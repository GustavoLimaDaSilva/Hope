import { createFileRoute } from "@tanstack/react-router"
import Deck from "../../../components/flashcardComponents/deck.tsx"

export const Route = createFileRoute('/decks/$uid/$deckId')({
    component: DeckLoader,
    loader: async ({ params }) => {
        debugger
        const raw = await fetch(`http://localhost:3000/decks/personalDecks/${params.uid}/${params.deckId}`)
        return await raw.json()
    }
})

export default function DeckLoader() {
    
    const data = Route.useLoaderData()

    return (
        <Deck setIndex={null} loaderDeck={data}/>
    )
}