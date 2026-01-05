import { Link } from "react-router";
import type { StateSetter } from "../../types/react";
import { useUserContext } from "../../RouterProvider";
import { postNewLevel, postProfile } from "../../../utils";

export default function SkipToNext({ isCorrect, setIsCorrect, setOffset, isLastCard, callback }: { isCorrect: boolean, setIsCorrect: StateSetter<boolean | null>, setOffset: StateSetter<number>, isLastCard: boolean, callback: (() => void) | undefined }) {

    return (
        <div>
            <p>{isLastCard ?
                'Muito Bem'
                :
                isCorrect ? 'Correto' : 'Errado'}!</p>
            {isLastCard ?
                <Link to={'/'} onClick={callback ? callback : undefined}>Finalizar</Link>
                :
                <button onClick={() => {
                    setOffset(prev => prev + 1)
                    setIsCorrect(null)
                }}>Avançar</button>
            }
        </div>
    )
}