import { z } from "zod";

export const createEventSchema = z.object({
     name: z.string({ message: "Le nom est requis*" }).min(2, { message: "Le nom doit contenir au moins 2 caractères" }).max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
     description: z.string({ message: "La description est requise*" }).min(3, { message: "La description doit contenir au moins 3 caractères" }).max(300, { message: "La description ne peut pas dépasser 300 caractères" }),
     address: z.string({ message: "L'adresse est requise*" }).min(3, { message: "L'adresse doit contenir au moins 3 caractères" }).max(300, { message: "L'adresse ne peut pas dépasser 300 caractères" }),
     date: z.string({ message: "La date est requise*" })
          .refine(
               (val) => {
                    const date = new Date(val);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return !isNaN(date.getTime()) && date >= today;
               },
               { message: "La date ne peut pas être inférieure à la date actuelle et doit être une date valide" }
          ),
     time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "L'heure doit être au format HH:mm" }),
     inviteList: z.string().optional(),
     arrayInviteList: z.array(z.string().uuid()).optional(),
}).superRefine((data, ctx) => {
     if (data.inviteList && data.inviteList.trim() !== "") {
          const uuids = data.inviteList.split(",").map(s => s.trim()).filter(Boolean);
          const invalid = uuids.filter(uuid => !z.string().uuid().safeParse(uuid).success);
          if (invalid.length > 0) {
               ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Les valeurs suivantes ne sont pas des UUID valides: ${invalid.join(", ")}`,
                    path: ["inviteList"],
               });
          } else {
               data.arrayInviteList = uuids;
          }
     }
});