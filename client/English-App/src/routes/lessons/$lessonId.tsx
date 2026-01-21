import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import Explanation from "../../components/explanation.tsx"
import Video from "../../components/video.tsx"
import { useLoaderData } from "@tanstack/react-router"
import type { LessonType } from "../../types/react.ts"
import Deck from "../../components/flashcardComponents/deck.tsx"

export const Route = createFileRoute('/lessons/$lessonId')({
  component: Lesson,
  loader: async ({params}) => {

    const raw = await fetch(`http://localhost:3000/lessons/${params.lessonId}`)
    return await raw.json()
  },
})





export default function Lesson() {

  const lesson: LessonType = useLoaderData({})
  const children = [Explanation, Video, Deck]
  const [index, setIndex] = useState(0)
  const Current = children[index]

  return (
    <div className="lesson-overview">
      {Current && <Current setIndex={setIndex} lesson={lesson} />}
    </div>
  )
} 
