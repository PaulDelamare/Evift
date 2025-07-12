import { z } from "zod";

export const responseInvitationSchema = z.object({
     id: z.string().uuid(),
     response: z.boolean().refine(val => typeof val === 'boolean', { message: "La valeur est requise*" })
});