import { useNavigate, useOutletContext } from "react-router";
import type { ReactLessonProps } from "../types/react.tsx";
import useFormatText from "../hooks/useFormatText.tsx";
import type { StateSetter } from "../types/react.ts";

export default function Explanation({setIndex, lesson}: ReactLessonProps) {

    const navigate = useNavigate()
    const formattedExplanation = useFormatText(lesson.explanation, null, null)
    return (
        <div>
            <div>{formattedExplanation}</div>
            <button onClick={() => navigate('/')}>Voltar</button>
            <button onClick={() => navigate(`/lessons/${lesson.id}/listening`)}>Avançar</button>
        </div>
    )
}