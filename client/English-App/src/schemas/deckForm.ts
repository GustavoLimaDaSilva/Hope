import { z } from 'zod'
import { minLengthParams, maxLengthParams } from '../../utils.ts'
import type { DeckType, FlashcardType } from '../../../../shared-types/API.d.ts'
type FlaschcardSchemaType = Record<keyof Omit<FlashcardType, 'id' | 'cardType'>, z.ZodType> &
                            Record<keyof Pick<DeckType, 'deckDescription'>, z.ZodNullable<z.ZodString>> &
                            Record<keyof Pick<DeckType, 'name'>, z.ZodString>;

const deckFormSchemaShape = {
  name: z.string()
    .check(z.minLength(...minLengthParams()), z.maxLength(...maxLengthParams(40))),

  deckDescription: z.string().nullable(),

  cardFront: z.string().min(1, { error: 'insira uma palavra ou frase' }),

  imageFile: z.instanceof(FileList).optional(),
  imageUrl: z.string().optional(),

  options: z.object({
    a: z.string().min(1, { error: 'faltou aqui' }),
    b: z.string().min(1, { error: 'faltou aqui' }).optional(),
    c: z.string().min(1, { error: 'faltou aqui' }).optional(),
    d: z.string().min(1, { error: 'faltou aqui' }).optional()
  }),

  correct_answer: z.string()
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
  correct_answer: true
})

export type FlashcardSchema = z.infer<typeof flashcardSchema>