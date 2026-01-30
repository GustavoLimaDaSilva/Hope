import { useState } from "react";
import type { FlashcardType } from "../../../../../shared-types/API.d.ts";
import type { StateSetter } from "../../types/index.ts";
import { isCardOptions } from "../../../../../typeGuards.ts";

type flashcardProps = {
    card: FlashcardType | undefined,
    selectedOption: HTMLButtonElement | null,
    isCorrect: boolean | null,
    isMultipleOption: boolean,
    showAnswer: boolean,
    setShowAnswer: StateSetter<boolean>
}

export default function Flashcard({ card, selectedOption, isCorrect, isMultipleOption, showAnswer, setShowAnswer }: flashcardProps) {

    if (!card) return


    return (
        <>
            {card.cardFront && <p>{card.cardFront}</p>}
            {card.imageUrl && <img src={card.imageUrl} />}
            {isMultipleOption ? <p>assinale a alternativa correta: </p> : <button onClick={() => setShowAnswer(true)}>Mostar a parte de trás</button>}
            {assignCorrectEl()}
            <div>
            </div>
        </>
    )

    function assignCorrectEl() {

        if (!card) return
        if (!isMultipleOption) {

            return <p className={showAnswer ? 'answer' : 'invisible'}>{card?.options['a']}</p>
        }

        const optButtons = []
        for (const opt of Object.keys(card.options)) {

            if (!isCardOptions(opt)) return
            
            optButtons.push(
                <button key={opt} data-key={opt} className={opt === selectedOption?.dataset.key ?
                    isCorrect ? 'flashcard-btn correct' : 'flashcard-btn wrong'
                    : 'flashcard-btn'}>
                    {card.options[opt]}
                </button>)
        }
        return optButtons
    }
}
