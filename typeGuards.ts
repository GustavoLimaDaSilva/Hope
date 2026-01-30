import { Opts, type FlashcardType, type SingleOptionCard } from "./shared-types/API.ts"

export function IsCardSingleOption(card: SingleOptionCard | FlashcardType | undefined): card is SingleOptionCard {

    if ((card as SingleOptionCard).difficulty) return true
    else return false
}


export function isCardOptions(opt: string): opt is keyof FlashcardType["options"]  {

    return Opts.includes(opt as typeof Opts[number])
} 

export function isObjEmpty(obj: object): obj is {} {

    return Object.keys(obj).length === 0 
}