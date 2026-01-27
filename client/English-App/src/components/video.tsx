import type {  ReactLessonProps } from "../types/index.ts"
import useFormatText from "../hooks/useFormatText.tsx"
import { speak } from '../../utils.ts'
export default function Video({setIndex, lesson}: ReactLessonProps) {

    const formattedText = useFormatText(lesson.video_script, null, speak)

    return (
        <div>
            <video width='400' height='400' controls muted>
                <source src={lesson.video_url} type="video/mp4"></source>
                Your broswer does not support videos.
            </video>
            <div>{formattedText}</div>
            <button onClick={() => setIndex(prev => prev - 1)}>Voltar</button>
            <button onClick={() => setIndex(prev => prev + 1)}>Revisar Lição</button>
        </div>
    )
}