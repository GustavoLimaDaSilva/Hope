import type { Ids, ReactLessonProps } from "../types/lesson.ts"

import { useNavigate } from "@tanstack/react-router"

type VideoProps = ReactLessonProps & {
    ids?: Ids | undefined,

}

export default function Video(props: VideoProps) {

    const setIndex = props?.setIndex
    const navigate = useNavigate({})

    return (
        <div className={props.childIndex > props.index ? "lesson-el non-clickable next-el" : "lesson-el current"}>
            <iframe className="video-frame" src={`https://www.youtube.com/embed/${props.ids?.videoId ?? ''}?list=${props.ids?.playlistId ?? ''}`} allowFullScreen></iframe>
            <div className="align-buttons">
                <button onClick={() => {
                    setIndex((prev: number) => prev - 1)
                }}>Voltar</button>
                <button onClick={() => {
                    navigate({ to: `/decks/lessonDecks/${props.lesson.id}` })
                }}>Revisar Lição</button>
            </div>
        </div>
    )
}