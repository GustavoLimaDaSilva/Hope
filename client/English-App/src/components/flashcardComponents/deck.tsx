import { useEffect, useState } from "react"
import { useProfileData } from "../../userStore.ts"
import type { StateSetter } from "../../types/index.ts"
import type {  LessonType, DeckType, SingleOptionCard, FlashcardType } from "../../../../../shared-types/API.ts"
import Flashcard from "./flashcard.tsx"
import SkipToNext from "./skipToNext.tsx"
import AssignDifficulty from "../assignDifficulty.tsx"
import { Link } from "@tanstack/react-router"
import {IsCardSingleOption} from '../../../../../typeGuards.ts'
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
    const [cards, setCards] = useState<FlashcardType[] | SingleOptionCard[]>(lesson?.flashcard_deck.cards ?? (loaderDeck!.cards))
    const [showAnswer, setShowAnswer] = useState(false)
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
            <Flashcard card={cards[offset]} isMultipleOption={isMultipleOption} selectedOption={selectedOption} 
            isCorrect={isCorrect} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
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
                        <SkipToNext skipToNext={cards[offset + 1] ? () => setOffset(prev => prev + 1) : undefined} isLastCard={offset === (cards.length - 1)}
                            isCorrect={isCorrect} setIsCorrect={setIsCorrect}
                            updateLevel={profileData.level === lesson?.level ? updatelevel : undefined}
                            resetSelectedOpt={() => setSelectedOption(null)} />
                    }
                </>
                :
                showAnswer &&
                <AssignDifficulty cards={cards as SingleOptionCard[]} setCards={setCards as StateSetter<SingleOptionCard[]>} offset={offset}
                    skipToNext={cards[offset + 1] ? () => setOffset(prev => prev + 1) : undefined} toLastSlot={() => setOffset(cards.length - 1)}
                    />
            }
            {IsCardSingleOption(cards[offset]) ? <Link to='/dashboard'>Finalizar</Link> : null}
        </div>
    </>
    )
}
