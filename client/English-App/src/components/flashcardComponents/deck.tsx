import { useEffect, useState } from "react"
import type { FlashcardType, LessonType } from "../../types/react"
import Flashcard from "./flashcard"
import { useOutletContext } from "react-router"
import SkipToNext from "./skipToNext"
import { postNewLevel } from "../../../utils"
import { useUserContext } from "../../RouterProvider"
import type { ReactLessonProps } from "../../types/react.ts"

export default function Deck({setIndex, lesson}: ReactLessonProps) {

    const context = useUserContext()
    if (!context) return
    const { profileData } = context
    const [offset, setOffset] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | ''>('')
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [cards, setCards] = useState(lesson.flashcard_deck.cards)
    const updatelevel = () => localStorage.setItem('new_level', JSON.stringify(profileData.level + 1))

    useEffect(() => {

        if (isCorrect === false) setCards([...cards, cards[offset]])

    },[isCorrect])

    return (<>
        <div onClick={(e) => {
            const clickedEl = e.target as HTMLElement
            if (clickedEl.tagName === 'BUTTON') setSelectedOption(clickedEl.innerHTML)
        }}>
            <Flashcard card={cards[offset]} setOffset={setOffset} selectedOption={selectedOption} />
        </div>
        <div>
            <button disabled={selectedOption === '' ? true : false} onClick={() => {
                 setIsCorrect(cards[offset].options[cards[offset].correctAnswer] === selectedOption)}}>Confirmar</button>
            {isCorrect !== null ?
                <SkipToNext setOffset={setOffset} isLastCard={offset === (cards.length - 1)}
                    isCorrect={isCorrect} setIsCorrect={setIsCorrect} callback={profileData.level === lesson.level ? updatelevel : undefined}/>
                : null
            }
        </div>
    </>
    )
    
}