import type { User } from "firebase/auth"
import type {ProfileData, LessonType, DecksType, DeckType} from "../../../../shared-types/API.ts"
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>


export type MessageOrigin = 'user' | 'AI'
export interface ChatMessage {

    from: MessageOrigin,
    content: string
}


type linkProps = { name: string, id: string }
export type DeckLinks = {

    lessonDecksData: linkProps[],
    personalDecksData: linkProps[]
}


export interface TanstackRouterContext {
    getUser: () => User | null,
    getProfileData: () => ProfileData
}