import type { User } from "firebase/auth"

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

export interface ProfileData {
    uid: string,
    level: number
}

export type MessageOrigin = 'user' | 'AI'
export interface ChatMessage {

    from: MessageOrigin,
    content: string
}

interface ApiResponse {

    name: string,
    id: string,
}

export interface LessonType extends ApiResponse {

    video_url: string,
    explanation: string,
    video_script: string,
    level: number,
    flashcard_deck: DeckType
}

export interface DecksType {
    lesson_decks: DeckType[],
    personal_decks: DeckType[]
}

export interface DeckType extends ApiResponse {

    cards: FlashcardType[]
}

type linkProps = { name: string, id: string }
export type DeckLinks = {

    lessonDecksData: linkProps[],
    personalDecksData: linkProps[]
}

export type FlashcardType = | (FlashcardTypeBase & { ImageUrl: string })
    | (FlashcardTypeBase & { cardFront: string })


export const Opts = ['a', 'b', 'c', 'd'] as const
interface FlashcardTypeBase extends ApiResponse {
    cardType: 'image' | 'written',
    imageFile?: FileList,
    imageUrl?: string,
    deckDescription?: string
    cardFront?: string
    correct_answer: typeof Opts[number] | null
    options: { [prop in typeof Opts[number]]: string },
}


export interface TanstackRouterContext {
    getUser: () => User | null,
    getProfileData: () => ProfileData
}



