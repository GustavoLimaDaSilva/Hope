import type { FlashcardType, StateSetter } from "../../types/react.ts";

type flashcardProps = {
    card: FlashcardType | undefined, 
    selectedOption: HTMLButtonElement | null,
     isCorrect: boolean | null,
     isMultipleOption: boolean
}

export default function Flashcard({ card, selectedOption, isCorrect, isMultipleOption }: flashcardProps) {

    if (!card) return

    const optButtons = []
    for (const opt in card.options) {

        optButtons.push(
            <button key={opt} data-key={opt} className={opt === selectedOption?.dataset.key ?
                isCorrect ? 'flashcard-btn correct' : 'flashcard-btn wrong'
                : 'flashcard-btn'}>
                {card.options[opt]}
            </button>)
    }
    return (
        <>
            {/* {assignCorrectEl(url, cardType)} primeira face do card  */}
            <p>assinale a alternativa correta: </p>
            {}
            <div>
            </div>
        </>
    )
}