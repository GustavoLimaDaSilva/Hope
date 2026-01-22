import type { FlashcardType, Opts, StateSetter } from "../../types/react.ts";

type flashcardProps = {
    card: FlashcardType | undefined,
    selectedOption: HTMLButtonElement | null,
    isCorrect: boolean | null,
    isMultipleOption: boolean
}

export default function Flashcard({ card, selectedOption, isCorrect, isMultipleOption }: flashcardProps) {

    if (!card) return
    console.log(card)
    return (
        <>
            {card.cardFront && <p>{card.cardFront}</p> }
            {card.imageUrl && <img src={card.imageUrl}/>}
            <p>assinale a alternativa correta: </p>
            {assignCorrectEl()}
            <div>
            </div>
        </>
    )

    function assignCorrectEl() {

        if (!card) return
        if (!isMultipleOption) {

            return <p>{card?.options['a']}</p>
        }

        const optButtons = []
        for (const opt of Object.keys(card.options) as (keyof typeof card.options)[]) {

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
