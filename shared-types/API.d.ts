export interface ProfileData {
    uid: string;
    level: number;
}
interface ApiResponse {
    name: string;
    id: string;
}
export interface LessonType extends ApiResponse {
    video_url: string;
    explanation: string;
    video_script: string;
    level: number;
    flashcard_deck: DeckType;
}
export interface DecksType {
    lesson_decks: DeckType[];
    personal_decks: DeckType[];
}
export interface DeckType extends ApiResponse {
    deckDescription?: string;
    cards: FlashcardType[] | SingleOptionCard[];
}
export interface SingleOptionCard extends FlashcardType {
    difficulty?: 'easy' | 'medium' | 'hard' | undefined;
    addedAt: number;
} 
export declare const Opts: readonly ["a", "b", "c", "d"];
export interface FlashcardType {
    cardType: 'image' | 'written';
    imageFile?: FileList | {} | undefined;
    imageUrl?: string | undefined;
    cardFront: string;
    correct_answer?: typeof Opts[number] | undefined;
    options: {
        [prop in typeof Opts[number]]: string;
    };
}
export {};
