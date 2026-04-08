import { countdownCategories, countdownModes, countdownThemes } from "@/types";
import z from "zod";

export const countdownFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'validation.titleRequired' })
    .max(100, { message: 'validation.titleTooLong' }),

  targetDate: z
    .string()
    .refine(val => !isNaN(new Date(val).getTime()), {
      message: 'validation.invalidDate',
    }),
  mode: z.enum(countdownModes),
  theme: z.enum(countdownThemes),
  category: z.enum(countdownCategories).optional(),
  note: z
      .string()
      .max(500, {message: 'validation.noteTooLong'})
      .trim()
      .transform(val => val || undefined)
      .optional(),
  notificationsEnabled: z.boolean(),
});

export type CountdownFormInput = z.input<typeof countdownFormSchema>
export type CountdownFormData = z.infer<typeof countdownFormSchema>

