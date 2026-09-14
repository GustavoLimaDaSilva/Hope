import { useForm, useWatch } from "react-hook-form";
import { flashcardSchema } from "../../schemas/deckForm.ts";
import type { FlashcardSchema } from "../../schemas/deckForm.ts";
import type { StateSetter } from "../../types/index.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Opts } from "../../../../../shared-types/deck.ts";
import AnswerOption from "./answerOption.tsx";
import useStoreFile from "../../hooks/useStoreFile.tsx";

type keys = { [key: string]: string | undefined }
export default function CreateNewFlashcard({ setFlashcardData, cardForm, setCardForm }: { setFlashcardData: StateSetter<FlashcardSchema[]>, cardForm: boolean, setCardForm: StateSetter<boolean> }) {

    const [multipleOptions, setMultipleOptions] = useState(false)
    const [file, setFile] = useStoreFile<FlashcardSchema>(setFlashcardData)
    const form = useForm<FlashcardSchema>({
        resolver: zodResolver(flashcardSchema)
    })
    const { handleSubmit, control, register, reset, formState: { errors } } = form
    const hasBeenSelected = useWatch({ name: 'correctAnswer', control })
    const options = useWatch({ name: 'options', control })
    
    const optionInputs = Opts.map((o, index) => {

        return <AnswerOption key={index} index={index} 
        hasBeenSelected={hasBeenSelected} register={register} value={o} 
        />

    })

    const setData = (data: FlashcardSchema) => {

        if (!multipleOptions) {

            for (const key in options) {

                if (key !== 'a') {
                    delete (data.options as keys)[key]
                }
            }
        }

        if (setFile !== undefined && data.imageFile) {
            const safeSetFile = setFile as React.Dispatch<React.SetStateAction<File | undefined>>
            safeSetFile(data.imageFile[0])
        }
        setFlashcardData(prev => [...prev, { ...data, addedAt: new Date().toLocaleString('pt-br', { day: "numeric", month: "numeric", year: "numeric" }) }])
        reset()
    }

    return (
            <form onSubmit={handleSubmit(setData)} id="cardForm" className={cardForm ? "translate-right flashcard-form" : "flashcard-form"}>
                <h2>Flashcards</h2>
                <label htmlFor="front">Parte da frente</label>
                <input id="front" placeholder="escreva a parte da frente" className="deck-form-input" {...register('cardFront')} />
                {errors.cardFront?.message && <p className="form-error">{errors.cardFront?.message}</p>}
                <label htmlFor="image">Coloque uma imagem <small>(fortemente recomendado)</small></label>
                <input type="file" id="image" placeholder="uma imagem" {...register('imageFile')} />
                {!multipleOptions &&
                    <>
                        <label htmlFor="back1">Parte de trás</label>
                        <input id="back1" placeholder="escreva a parte de trás" className="deck-form-input" {...register('options.a')} />
                        {errors.options?.['a']?.message && <p className="form-error">{errors.options?.['a']?.message}</p>}
                    </>
                }
                <label className="switch-label">modo mútipla escolha
                    <div className={multipleOptions ? "switch turn-on-background" : "switch"} onClick={() => setMultipleOptions(prev => !prev)}>
                        <span className={multipleOptions ? "slider turn-on" : "slider"}></span>
                    </div>
                    <input type="checkbox" />
                </label>
                <div className="opts-wrapper">
                    {multipleOptions && optionInputs}
                </div>
                {errors.correctAnswer?.message && <p className="form-error">{errors.correctAnswer?.message}</p>}
                <button className="bottom-btn" onClick={() => setCardForm(true)} type="submit" form="cardForm">Adicionar cartão</button>
            </form>
    )
}