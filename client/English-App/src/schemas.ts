import { optional, z } from 'zod'
import { minLengthParams, maxLengthParams } from '../utils'
import type { FlashcardType, Opts } from './types/react'
type FlaschcardSchemaType = Record<keyof Omit<FlashcardType, 'id' | 'cardType'>, z.ZodType>
type keys = { [key: string]: string | undefined }

const deckFormSchemaShape = {
  name: z.string()
    .check(z.minLength(...minLengthParams()), z.maxLength(...maxLengthParams(40))),

  deckDescription: z.string().optional(),

  cardFront: z.string().min(1, { error: 'insira uma palavra ou frase' }),

  imageFile: z.instanceof(FileList).optional(),

  options: z.object({
    a: z.string().min(1, { error: 'faltou aqui' }),
    b: z.string().min(1, { error: 'faltou aqui' }).optional(),
    c: z.string().min(1, { error: 'faltou aqui' }).optional(),
    d: z.string().min(1, { error: 'faltou aqui' }).optional()
  }),

  correctAnswer: z.string()
    .nullable()
    .optional().check(
      z.refine(option => option !== null, { error: 'selecione alguma resposta como correta' }),
      z.refine(option => option !== '', { error: 'preencha a resposta selecionada' })
    )
} satisfies FlaschcardSchemaType;

const deckFormSchema = z.object(deckFormSchemaShape)

export const deckSchema = deckFormSchema.pick({ name: true, deckDescription: true })
export type DeckSchema = z.infer<typeof deckSchema>

export const flashcardSchema = deckFormSchema.pick({
  cardFront: true,
  options: true,
  imageFile: true,
  correctAnswer: true
})

export type FlashcardSchema = z.infer<typeof flashcardSchema>