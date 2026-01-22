import { Link, createFileRoute, useLoaderData, useParams } from "@tanstack/react-router"
import type { DeckLinks, DeckType, DecksType } from "../../../types/react.ts"
import { useGoogleUser, useProfileData } from "../../../userStore.ts";

export const Route = createFileRoute('/decks/$uid/')({
    component: FlashcardsIndex,
    validateSearch: (search) => {
        search as {
            level: number
        }
    },
    loaderDeps: ({ search: { level } }) => ({
        level //adicionar validação com zod
    }),
    loader: async ({ params, deps: { level } }) => {

        if (!level) return

        const raw = await fetch(`http://localhost:3000/decks/${params.uid}?level=${level}`)
        const data = await raw.json()

        return data
    }
})

export default function FlashcardsIndex() {

    const decksData : DeckLinks = Route.useLoaderData()
    const { uid } = Route.useParams()

    return (
        <>
            <h2>Decks desbloqueados</h2>
            {decksData.lessonDecksData.map((d, index: number) => <Link to={`../lessonDecks/${d.id}`} key={index}>{d.name}</Link>)}
            <h2>Seus decks personalizados</h2>
            {decksData.personalDecksData.map((d, index: number) => <Link to={`../${uid}/${d.id}`} key={index}>{d.name}</Link>)}
            <div>
                <Link to={`criarDeck`}>+ criar deck</Link>
            </div>
        </>)
}