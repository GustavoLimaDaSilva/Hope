import { Link } from "@tanstack/react-router";
import type { StateSetter } from "../../types/index.ts";

type SkipToNextProps = {
    isCorrect: boolean | null,
    setIsCorrect: StateSetter<boolean | null>,
    skipToNext: (() => void) | undefined,
    updateLevel: (() => void) | undefined,
    isLastCard: boolean,
    resetSelectedOpt: (() => void)
}

export default function SkipToNext({ isCorrect, setIsCorrect, skipToNext, isLastCard, updateLevel, resetSelectedOpt }: SkipToNextProps) {

    return (
        <div>
            <p>{isLastCard ?
                'Muito Bem'
                :
                isCorrect ? 'Correto' : 'Errado'}!</p>
            {isLastCard ?
                <Link to={'/dashboard'} onClick={updateLevel && updateLevel()}>Finalizar</Link>
                :
                <button onClick={() => {
                    if (skipToNext) skipToNext()
                    setIsCorrect(null)
                    resetSelectedOpt()
                }}>Avançar</button>
            }
        </div>
    )
}