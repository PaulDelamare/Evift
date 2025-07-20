import { z } from "zod";

export const checkGiftSchema = z.object({
     eventId: z.string({ message: "L'event id est requis*" }).uuid(),
     giftId: z.string({ message: "La liste id est requise*" }).uuid(),
     taken: z.boolean().refine(val => typeof val === 'boolean', { message: "La valeur est requise*" })
});

export const listGiftEventSchema = z.object({
     idEvent: z.string({ message: "L'event id est requis*" }).uuid(),
     idList: z.string({ message: "La liste id est requise*" }).uuid()
});

export const giftSchema = z.object({
     name: z.string({ message: "Le nom est requis*" }),
     gifts:
          z.object({
               name: z.string({ message: "Le nom est requis*" }).min(2, { message: "Le nom doit contenir au moins 2 caractères" }).max(100, { message: "Le nom ne doit pas dépasser 100 caractères" }),
               quantity: z.number({ message: "La quantité est requise*" }).min(1, { message: "La quantité minimale est 1" }).max(1000, { message: "La quantité maximale est 1000" }),
               url: z.string({ message: "L'URL est requise*" })
                    .optional()
                    .nullable()
                    .refine(
                         (value) => value === null || value === "" || z.string().url().safeParse(value).success,
                         { message: "L'URL doit être valide" }
                    )
                    .transform((value) => value === "" ? null : value)
          }).array()
});

export const addGiftSchema = z.object({
     id: z.string().uuid('Id invalide*'),
     gifts:
          z.object({
               name: z.string({ message: "Le nom est requis*" }).min(2, { message: "Le nom doit contenir au moins 2 caractères" }).max(100, { message: "Le nom ne doit pas dépasser 100 caractères" }),
               quantity: z.number({ message: "La quantité est requise*" }).min(1, { message: "La quantité minimale est 1" }).max(1000, { message: "La quantité maximale est 1000" }),
               url: z.string({ message: "L'URL est requise*" })
                    .optional()
                    .nullable()
                    .refine(
                         (value) => value === null || value === "" || z.string().url().safeParse(value).success,
                         { message: "L'URL doit être valide" }
                    )
                    .transform((value) => value === "" ? null : value)
          }).array()
});
