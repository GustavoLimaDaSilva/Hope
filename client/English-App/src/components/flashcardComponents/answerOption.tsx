import type { UseFormRegister } from "react-hook-form"
import type { Opts, FlashcardType } from "../../types/react.ts";
import { useRef } from "react";

type MultipleOptionsProps = {
    hasBeenSelected: string | null | undefined,
    register: UseFormRegister<{ cardFront: string; options: { a: string; b?: string | undefined; c?: string | undefined; d?: string | undefined; }; imageUrl?: FileList | undefined; correct_answer?: string | null | undefined; }>,
    value:  typeof Opts[number],
    index: number
}
export default function AnswerOption({ register, hasBeenSelected, value, index }: MultipleOptionsProps) {

    const optionRef = useRef<HTMLInputElement>(null)
    const { ref } = register(`options.${value}`)
    return (
        <>
            <input key={`radio${index}`} type="radio" id={`radio-${value}`} value={!optionRef.current?.value ? '' : value} {...register('correct_answer', { required: !hasBeenSelected ? true : false })} />
            <input key={`input${index}`} id={`input-${value}`} {...register(`options.${value}`, { required: true })} ref={el => {
                optionRef.current = el
                ref(el)
            }} />

        </>
    )
}