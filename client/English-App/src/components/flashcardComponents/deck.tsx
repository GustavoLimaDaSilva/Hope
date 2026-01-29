import { useEffect, useState } from "react"
import { useProfileData } from "../../userStore.ts"
import type { StateSetter } from "../../types/index.ts"
import type { LessonType, DeckType } from "../../../../../shared-types/API.ts"
import Flashcard from "./flashcard.tsx"
import SkipToNext from "./skipToNext.tsx"

type DeckProps = {
    setIndex: StateSetter<number> | null,
    lesson?: LessonType,
    loaderDeck?: DeckType
}

export default function Deck({ setIndex, lesson, loaderDeck }: DeckProps) {

    if (!lesson && !loaderDeck) return

    const profileData = useProfileData((state) => state.profileData)

    const [offset, setOffset] = useState(0)
    const [selectedOption, setSelectedOption] = useState<HTMLButtonElement | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [cards, setCards] = useState(lesson?.flashcard_deck.cards ?? loaderDeck!.cards)
    const isMultipleOption = cards[offset]?.options ? Object.keys(cards[offset]?.options).length > 1 : false

    const updatelevel = () => localStorage.setItem('new_level', JSON.stringify(profileData.level + 1))

    useEffect(() => {

        if (cards[offset] && isCorrect === false) {

            setCards([...cards, cards[offset]])
        }
    }, [isCorrect])

    return (<>
        <div onClick={(e) => {
            const clickedEl = e.target as HTMLElement
            if (clickedEl.tagName === 'BUTTON') setSelectedOption(clickedEl as HTMLButtonElement)
        }}>
            <Flashcard card={cards[offset]} isMultipleOption={isMultipleOption} selectedOption={selectedOption} isCorrect={isCorrect} />
        </div>
        <div>
            {isMultipleOption ?
            <>
            <button disabled={!selectedOption ? true : false} onClick={() => {

                if (cards[offset] && selectedOption) {

                    setIsCorrect(cards[offset].correct_answer === selectedOption.dataset.key)
                }
            }}>Confirmar</button>
            {isCorrect !== null &&
                <SkipToNext setOffset={setOffset} isLastCard={offset === (cards.length - 1)}
                    isCorrect={isCorrect} setIsCorrect={setIsCorrect}
                    updateLevel={profileData.level === lesson?.level ? updatelevel : undefined}
                    resetSelectedOpt={() => setSelectedOption(null)} />
                }
                </> : 
                <>
                <button>fácil</button>
                <button onClick={() => {
                    if(cards[offset]) {
                         setCards([...cards, cards[offset]])
                }}}>difícil</button>
                <button onClick={() => setOffset(prev => prev + 1)}>passar para o próximo</button>
                </>
                }
        </div>
    </>
    )

}