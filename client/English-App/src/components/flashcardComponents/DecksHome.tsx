import { Link, useOutlet, useOutletContext } from "react-router"
import type { DeckType, DecksType } from "../../types/react"

export default function DecksHome() {

    const decks: DecksType = useOutletContext()

    const createDeckLinks = (d: DeckType, index: number) => <Link to={`flashcards/deck/${d.id}`} key={index}>{d.name}</Link>

    return (
        <>
            <h2>Decks desbloqueados</h2>
            {decks.lesson_decks.map(createDeckLinks)}
            <h2>Seus decks personalizados</h2>
            {decks.personal_decks.map(createDeckLinks)}
            <div>
                <Link to={'newdeck'}>+ criar deck</Link>
            </div>
        </>)
}