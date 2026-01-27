import { useNavigate } from "@tanstack/react-router";
import type { ReactLessonProps } from "../types/index.ts";
import useFormatText from "../hooks/useFormatText.tsx";
import type { StateSetter } from "../types/index.ts";

export default function Explanation({ setIndex, lesson }: ReactLessonProps) {

    const formattedExplanation = useFormatText(lesson.explanation, null, null)
    const navigate = useNavigate()
    return (
        <div>
            <div>{formattedExplanation}</div>
            <button onClick={() => navigate({ to: '/' })}>Voltar</button>
            <button onClick={() => setIndex(prev => prev + 1)}>Avançar</button>
        </div>
    )
}