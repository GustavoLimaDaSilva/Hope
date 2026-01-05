import type { UseFormRegister } from "react-hook-form"
import { Opts, type FlashcardType } from "../../types/react";
import { useRef } from "react";

type transformedOpts = typeof Opts[number]
type MultipleOptionsProps = {
    hasBeenSelected: string | null | undefined,
    register: UseFormRegister<{ cardFront: string; options: { a: string; b?: string; c?: string; d?: string; }; imageUrl?: FileList | undefined; correctAnswer?: string | null | undefined; }>,
    value: transformedOpts,
    index: number
}
export default function AnswerOption({ register, hasBeenSelected, value, index }: MultipleOptionsProps) {

    const optionRef = useRef<HTMLInputElement>(null)
    const { ref } = register(`options.${value}`)
    return (
        <>
            <input key={`radio${index}`} type="radio" id={`radio-${value}`} value={!optionRef.current?.value ? '' : value} {...register('correctAnswer', { required: !hasBeenSelected ? true : false })} />
            <input key={`input${index}`} id={`input-${value}`} {...register(`options.${value}`, { required: true })} ref={el => {
                optionRef.current = el
                ref(el)
            }} />

        </>
    )
}