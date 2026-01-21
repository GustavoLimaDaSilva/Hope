const fs = await import('fs')

async function ReadFile(name) {

    try {
        const parsedFile = await fs.promises.readFile(`./data/${name}.json`, 'utf-8')
        return parsedFile ? JSON.parse(parsedFile) : []
    } catch (err) {
        console.error('error at fileReader: ', err)
        return []
    }
}


const lessons = await ReadFile('lessons')
const users = await ReadFile('users')
export {lessons, users };