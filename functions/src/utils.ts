import { FlashcardType } from "../../shared-types/deck.js";
import { LessonVideo } from "../../shared-types/lesson.js";

const crypto = await import("crypto");


export function createHexId() {
  return [...crypto.getRandomValues(new Uint8Array(20))]
    .map((m) => ("0" + m.toString(16))
      .slice(-2))
    .join("");
}

export function getMostRecent(acc: number[], curr: FlashcardType) {

  const lastReviewed = curr.lastReviewedAt?.split("/")
    .map((str: string) => Number(str))

  if (!lastReviewed) return acc

  const [day, month, year] = lastReviewed
  const [accDay, accMonth, accYear] = acc

  if (year > accYear) {
    acc = lastReviewed
    return acc
  }

  if (month > accMonth && year === accYear) {
    acc = lastReviewed
    return acc
  }

  if (day > accDay && month === accMonth && year === accYear) {
    acc = lastReviewed
    return acc
  }
  return acc
}


export async function getPlaylistVideos(apiKey: string | undefined, playlistId: string | undefined): Promise<LessonVideo[] | undefined> {

  if (!apiKey || !playlistId) return

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`)
    const data = await res.json()
    return data.items as LessonVideo[]
  } catch (err) {
    console.error(err)
    return
  }
}

export async function setAwaitLimit<T>(
  promise: Promise<T>,
  awaitLimit: number,
  resolveValue: unknown,
): Promise<T | unknown> {

    let timeoutId: NodeJS.Timeout | undefined;

  const promiseWithTimeout = new Promise((resolve) => {
    timeoutId = setTimeout(() => resolve(resolveValue), awaitLimit);
  })

  return Promise.race([promise, promiseWithTimeout]).finally(() => clearTimeout(timeoutId))
}