import { z } from "zod";
import { minLengthParams, maxLengthParams } from "../utils.ts";
import type { DeckType, FlashcardType } from "../types/index.ts";
type FlaschcardSchemaType = Record<
  keyof Omit<
    FlashcardType,
    "id" | "cardType" | "lastReviewedAt" | "addedAt" | "difficulty"
  >,
  z.ZodType
> &
  Record<keyof Pick<DeckType, "deckDescription">, z.ZodNullable<z.ZodString>> &
  Record<keyof Pick<DeckType, "name">, z.ZodString>;

const deckFormSchemaShape = {
  name: z
    .string()
    .check(
      z.minLength(...minLengthParams()),
      z.maxLength(...maxLengthParams(40)),
    ),

  deckDescription: z.string().nullable(),

  cardFront: z.string().min(1, { error: "insira uma palavra ou frase" }),

  imageFile: z.instanceof(FileList).optional(),
  imageUrl: z.string().optional(),

  options: z
    .object({
      a: z.string().optional(),
      b: z.string().optional(),
      c: z.string().optional(),
      d: z.string().optional(),
    })
    .refine(
      (data) => {
        const firstOpt = data["a"];
        const hasOtherOptions = Object.keys(data).length > 1;

        return (
          Object.values(data).filter((v) => v !== "").length > 1 ||
          (firstOpt !== "" && !hasOtherOptions)
        );
      },
      {
        error: "escreva pelo menos mais uma alternativa",
      },
    ),

  correctAnswer: z
    .string()
    .nullable()
    .optional()
    .check(
      z.refine((option) => option !== null, {
        error: "selecione alguma resposta como correta",
      }),
      z.refine((option) => option !== "", {
        error: "preencha a resposta selecionada",
      }),
    ),
} satisfies FlaschcardSchemaType;

const deckFormSchema = z.object(deckFormSchemaShape);

export const deckSchema = deckFormSchema.pick({
  name: true,
  deckDescription: true,
});
export type DeckSchema = z.infer<typeof deckSchema>;

export const flashcardSchema = deckFormSchema.pick({
  cardFront: true,
  options: true,
  imageFile: true,
  correctAnswer: true,
});

export type FlashcardSchema = z.infer<typeof flashcardSchema>;
