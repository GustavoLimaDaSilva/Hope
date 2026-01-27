import { useEffect, useState } from "react"
import CreateNewFlashcard from "./createNewFlashcard"
import { z } from "zod"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { isEmpty } from "../../../utils"
import { deckSchema } from "../../schemas"
import type { DeckSchema, FlashcardSchema } from "../../schemas"
import { useUserContext } from "../../RouterProvider"
import { useNavigate } from "react-router"
// import { postPersonalDeck } from "../../../utils"

export default function CreateNewDeck() {

    const context = useUserContext()
    if (!context) return
    const { profileData } = context
    const [flashcardData, setFlashcardData] = useState<FlashcardSchema[]>([])
    const [cardForm, setCardForm] = useState(false)
    const navigate = useNavigate()
    const form = useForm<DeckSchema>({
        resolver: zodResolver(deckSchema)
    })
    const { register, control, handleSubmit, formState: { errors } } = form
    const hasInput = useWatch({ name: 'deckDescription', control })

    return (
        <>
            <p>{flashcardData.length} cartões</p>
            <form id="form" onSubmit={handleSubmit(postPersonalDeck)}>
                <label htmlFor="name">Nome do deck</label>
                <br />
                <input type="text" id="name" placeholder="coloque um nome" {...register("name")} />
                {errors.name?.message && <p style={{ color: 'red' }}>{errors.name?.message}</p>}
                <br />
                <label htmlFor="descrição">Descrição (opcional)</label>
                <br />
                <input type="text" id="descrição" placeholder="coloque uma descrição"  {...register("deckDescription", { required: hasInput ? true : false })} />
                <br />
                <button onClick={() => setCardForm(true)} form="cardForm">adicionar cartão</button>
                <button type="submit" disabled={isEmpty(flashcardData)}>Salvar deck</button>
            </form>
            <CreateNewFlashcard setFlashcardData={setFlashcardData} cardForm={cardForm} setCardForm={setCardForm} />
        </>
    )
    async function postPersonalDeck(form_data: object) {

        if (flashcardData.length === 0) return

        const res = await fetch(`http://localhost:3000/decks/personalDecks/${profileData.uid}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                form_data: { ...form_data, cards: flashcardData }
            })
        })

        if (res.status === 201) {
            navigate(`/flashcards`)
        }
    }
}