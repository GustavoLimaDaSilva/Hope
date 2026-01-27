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
    deckDescription: string | null;
    cards: FlashcardType[];
}
export type FlashcardType = (FlashcardTypeBase & {
    ImageUrl: string;
}) | (FlashcardTypeBase & {
    cardFront: string;
});
export declare const Opts: readonly ["a", "b", "c", "d"];
interface FlashcardTypeBase {
    cardType: 'image' | 'written';
    imageFile?: FileList | {};
    imageUrl?: string;
    cardFront?: string;
    correct_answer?: typeof Opts[number];
    options: {
        [prop in typeof Opts[number]]: string;
    };
}
export {};
//# sourceMappingURL=API.d.ts.map