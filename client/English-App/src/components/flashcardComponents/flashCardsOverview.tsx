import { Link, Outlet, useLoaderData } from "react-router"
import type { DecksType, DeckType } from "../../types/react"
import { isEmpty } from "../../../utils"

export default function FlashCardsOverview() {

    const decks: DecksType = useLoaderData()

    return (
        <div className="className">
            <Outlet context={decks}/>
        </div>
    )
}