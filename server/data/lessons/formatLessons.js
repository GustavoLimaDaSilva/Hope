import { createHexId } from '../utils'

const fs = (await import('fs')).promises

async function FormatToJson() {
    let lessonArr = []

    const videosFolder = await fs.readdir('./lessons/videos', { withFileTypes: true })

    for (const video of videosFolder) {
        const lessonObj = {
            id: createHexId(),
            video_url: 'http://localhost:3000/videos/' + video.name,
            name: video.name.split('.mp4')[0].split('-').join(' '),
        }
        lessonArr.push(lessonObj)
    }
    await fs.writeFile('lessons.json', JSON.stringify(lessonArr, null, 2))
}

fs.watch('./lessons/videos', (eventType, filename) => {
    if (eventType === 'rename' && filename) {
        FormatToJson()
    }
});