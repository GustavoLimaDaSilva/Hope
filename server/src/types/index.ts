import type { DeckType, ProfileData } from "../../../shared-types/API.js";

export type ServerUser = ProfileData & {flashcard_decks?: DeckType[]} 