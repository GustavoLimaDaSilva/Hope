import type { FlashcardType, StateSetter } from "../../types/react";

type flashcardProps<Opts extends Record<string, string>> = {
    card: FlashcardType<Opts>, setOffset: StateSetter<number>, selectedOption: string
}

export default function Flashcard<Opts extends Record<string, string>>({ card, setOffset, selectedOption }: flashcardProps<Opts>) {

    const optButtons = []
    for (const opt in card.options) {

        optButtons.push(<button key={opt} className={opt === selectedOption ? 'selected' : ''}>{card.options[opt]}</button>)
    }
    return (
        <>
            {/* {assignCorrectEl(url, cardType)} primeira face do card  */}
            <p>assinale a alternativa correta: </p>
            {optButtons}
            <div>
            </div>
        </>
    )


    function nextCard() {

        setOffset(prev => prev + 1)
    }
}