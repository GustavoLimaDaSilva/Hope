import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postPersonalDeck, rightPhraseCartao } from "../../../utils.ts"
import { deckSchema } from "../../../schemas/deckForm.ts"
import { useNavigate } from "@tanstack/react-router"
import type { DeckSchema, FlashcardSchema } from "../../../schemas/deckForm.ts"
import { useProfileData } from "../../../userStore.ts"
import CreateNewFlashcard from "../../../components/flashcardComponents/createNewFlashcard.tsx"


export const Route = createFileRoute('/decks/$uid/createDeck')({
    component: CreateNewDeck,

}
)

export default function CreateNewDeck() {

    const profileData = useProfileData((state) => state.profileData)
    const [flashcardData, setFlashcardData] = useState<FlashcardSchema[]>([])
    const [cardForm, setCardForm] = useState(false)
    const navigate = useNavigate()
    const form = useForm<DeckSchema>({
        resolver: zodResolver(deckSchema)
    })
    const { register, control, handleSubmit, formState: { errors } } = form
    const hasInput = useWatch({ name: 'deckDescription', control })

    return (
        <main className="grandient-background form-wrapper">
            <form className={cardForm ? "translate-left deck-form" : "deck-form"} id="form" onSubmit={handleSubmit((formData) => postPersonalDeck(formData, profileData, flashcardData, navigate))}>
                <h1>Deck</h1>
                <p className="card-count">{rightPhraseCartao(flashcardData.length)}</p>
                <label htmlFor="name">Nome do deck</label>
                <br />
                <input type="text" id="name" placeholder="coloque um nome" className="deck-form-input" {...register("name")} />
                {errors.name?.message && <p style={{ color: 'red' }}>{errors.name?.message}</p>}
                <br />
                <label htmlFor="descrição">Descrição (opcional)</label>
                <br />
                <input type="text" id="descrição" placeholder="coloque uma descrição" className="deck-form-input" {...register("deckDescription", { required: hasInput ? true : false })} />
                <br />
                <div className="align-buttons">
                    <button onClick={() => setCardForm(true)} form="cardForm">adicionar cartão</button>
                    <button type="submit" disabled={flashcardData.length === 0}>Salvar deck</button>
                </div>
            </form>
            <CreateNewFlashcard setFlashcardData={setFlashcardData} cardForm={cardForm} setCardForm={setCardForm} />
        </main>
    )
}