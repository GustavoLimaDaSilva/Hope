import { Link } from "@tanstack/react-router";
import type { StateSetter } from "../../types/index.ts";

type SkipToNextProps = {
    isCorrect: boolean | null,
    setIsCorrect: StateSetter<boolean | null>,
    setOffset: StateSetter<number>,
    isLastCard: boolean,
    updateLevel: (() => void) | undefined,
    resetSelectedOpt: (() => void)
}

export default function SkipToNext({ isCorrect, setIsCorrect, setOffset, isLastCard, updateLevel, resetSelectedOpt }: SkipToNextProps) {

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
                    setOffset(prev => prev + 1)
                    setIsCorrect(null)
                    resetSelectedOpt()
                }}>Avançar</button>
            }
        </div>
    )
}