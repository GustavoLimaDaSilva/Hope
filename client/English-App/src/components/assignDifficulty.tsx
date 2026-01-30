import { Link } from "@tanstack/react-router"
import type { SingleOptionCard } from "../../../../shared-types/API.ts"
import type { StateSetter } from "../types/index.ts"
import { IsCardSingleOption } from "../../../../typeGuards.ts"

type props = {
    cards: SingleOptionCard[],
    setCards: StateSetter<SingleOptionCard[]>
    offset: number,
    toLastSlot: () => void,
    skipToNext: (() => void) | undefined
}

export default function assignDifficulty({ offset, setCards, skipToNext, toLastSlot, }: props) {

    const addDifficulty = (diff: SingleOptionCard["difficulty"]) => {

        setCards(prev => {

            const copy = [...prev]
            if (IsCardSingleOption(copy[offset]))
            copy[offset] = { ...(copy[offset]), difficulty: diff, addedAt: (copy[offset] as SingleOptionCard).addedAt ?? Date.now() }

            return copy
        })
        if (skipToNext) skipToNext()
    }

    return (
                    <>
                        <button onClick={() => addDifficulty('easy')}>fácil</button>
                        <button onClick={() => addDifficulty('medium')}>médio</button>
                        <button onClick={() => {
                            addDifficulty('hard')
                            toLastSlot()
                        }}>difícil</button>
                    </>
    )
}