import { useForm, useWatch, type UseFormRegister } from "react-hook-form";
import { z } from "zod"
import { flashcardSchema } from "../../schemas.ts";
import type { FlashcardSchema } from "../../schemas.ts";
import type { StateSetter } from "../../types/react.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Opts } from "../../types/react.ts";
import AnswerOption from "./answerOption.tsx";
import useStoreFile from "../../hooks/useStoreFile.tsx";

type keys = { [key: string]: string | undefined }
export default function CreateNewFlashcard({ setFlashcardData, cardForm, setCardForm }: { setFlashcardData: StateSetter<FlashcardSchema[] | []>, cardForm: boolean, setCardForm: StateSetter<boolean> }) {

    const [multipleOptions, setMultipleOptions] = useState(false)
    const [file, setFile] = useStoreFile<FlashcardSchema>(setFlashcardData)
    const form = useForm<FlashcardSchema>({
        resolver: zodResolver(flashcardSchema)
    })
    
    const { handleSubmit, control, register, reset, formState: { errors } } = form
    const hasBeenSelected = useWatch({ name: 'correct_answer', control })
    const options = useWatch({ name: 'options', control })

    const optionInputs = Opts.map((o, index) => {
        if (o === 'a') return

        return <AnswerOption key={index} index={index} hasBeenSelected={hasBeenSelected} register={register} value={o} />

    })

    const setData = (data: FlashcardSchema) => {

        if (!multipleOptions) {

            for (let key in options) {

                if (key !== 'a') {
                    delete (data.options as keys)[key]
                }
            }
        }

        if (setFile !== undefined && data.imageFile) {
            const safeSetFile = setFile as React.Dispatch<React.SetStateAction<File | undefined>>
            safeSetFile(data.imageFile[0])
        }
        setFlashcardData(prev => [...prev, { ...data }])
        reset()
    }

    return (
        <>
            <h2>Flashcards</h2>
            <button onClick={() => setCardForm(true)} type="submit" form="cardForm">Adicionar cartão</button>
            {cardForm &&
                <form onSubmit={handleSubmit(setData)} id="cardForm">
                    <label htmlFor="front">Parte da frente</label>
                    <br />
                    <input id="front" placeholder="escreva a parte da frente" {...register('cardFront')} />
                    {errors.cardFront?.message && <p style={{ color: 'red' }}>{errors.cardFront?.message}</p>}
                    <br />
                    <label htmlFor="image">Coloque uma imagem (fortemente recomendado)</label>
                    <br />
                    <input type="file" id="image" placeholder="uma imagem" {...register('imageFile')} />
                    <br />
                    <label htmlFor="back">Parte de trás</label>
                    <br />
                    <label className="switch">
                        modo mútipla escolha
                        <input type="checkbox" onClick={() => setMultipleOptions(prev => !prev)} />
                        <span className="slider round"></span>
                    </label>
                    {multipleOptions && <input type="radio" id="a" value="a" {...register('correct_answer', { required: multipleOptions && !hasBeenSelected ? true : false })} />}
                    <input id="back1" placeholder="escreva a parte de trás" {...register('options.a')} />
                    {errors.options?.['a']?.message && <p style={{ color: 'red' }}>{errors.options?.['a']?.message}</p>}
                    {multipleOptions && optionInputs}
                    {errors.correct_answer?.message && <span>{errors.correct_answer?.message}</span>}
                </form>
            }
        </>
    )
}