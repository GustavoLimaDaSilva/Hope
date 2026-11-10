import { Outlet, useLoaderData } from "react-router"
import type { LessonType } from "../types/index.ts"

export default function Lesson() {

    const lesson: LessonType = useLoaderData()
    return (
        <div className="lesson-overview">
            <Outlet context={lesson}/>
        </div>
    )
} 