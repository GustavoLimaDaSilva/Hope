import { Router } from "express"
import type { LessonType } from "../../shared-types/API.ts"
import { lessons } from "../fileReader.js"
const express = (await import('express')).default

const router = Router()

router.use('/videos', express.static('./lessons/videos'))

router.get('/', (req, res) => {

    res.json(lessons)
})

router.get('/:id', (req, res) => {

    const id = req.params.id

    const lesson: LessonType | undefined = lessons.find((l: LessonType) => l.id === id)

    if (lesson) {
    res.json(lesson)
    } 

    res.status(404).json({ message: 'Lesson not found' })
})

export default router