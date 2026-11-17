import type { UseFormRegister } from "react-hook-form"
import { Opts } from "../../types/index.ts";
import { useRef } from "react";
import type { FlashcardSchema } from "../../schemas/deckForm.ts";

type MultipleOptionsProps = {
    hasBeenSelected: string | null | undefined,
    register: UseFormRegister<FlashcardSchema>,
    value: typeof Opts[number],
    index: number,
}
export default function AnswerOption({ register, hasBeenSelected, value, index }: MultipleOptionsProps) {

    const optionRef = useRef<HTMLInputElement>(null)
    const { ref } = register(`options.${value}`)
    const optNumber = index + 1

    return (
        <label htmlFor={`radio-${value}`} className="option">
            <div className="option-upper">
            {"opção " + optNumber}
            <input key={`radio${optNumber}`} type="radio" 
            id={`radio-${value}`} value={!optionRef.current?.value ? '' : value} 
            {...register('correctAnswer', { required: !hasBeenSelected ? true : false })} />
            </div>
            <input key={`input${optNumber}`} id={`input-${value}`} 
            {...register(`options.${value}`, { required: true })} 
           className="deck-form-input" ref={el => {
                optionRef.current = el
                ref(el)
            }} />
        </label>
    )
}