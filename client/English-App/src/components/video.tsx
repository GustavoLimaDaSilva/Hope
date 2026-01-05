import { useLoaderData, useNavigate, useOutletContext } from "react-router"
import type {  ReactLessonProps } from "../types/react.ts"
import useFormatText from "../hooks/useFormatText.tsx"
import { speak } from '../../utils.ts'
export default function Video({setIndex, lesson}: ReactLessonProps) {

    const formattedText = useFormatText(lesson.video_script, null, speak)
    const navigate = useNavigate()
    return (
        <div>
            <video width='400' height='400' controls muted>
                <source src={lesson.video_url} type="video/mp4"></source>
                Your broswer does not support videos.
            </video>
            <div>{formattedText}</div>
            <button onClick={() => navigate(`/lessons/${lesson.id}/intro`)}>Voltar</button>
            <button onClick={() => navigate(`/lessons/${lesson.id}/flashcards`)}>Revisar Lição</button>
        </div>
    )
}