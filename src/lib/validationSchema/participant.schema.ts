import { z } from "zod";

export const changeRoleParticipantSchema = z.object({
     id_role: z.string({ message: "Le rôle id est requis*" }).uuid({ message: "Le rôle id doit être un UUID valide*" }),
     id_user: z.string({ message: "L'utilisateur id est requis*" }).uuid({ message: "L'utilisateur id doit être un UUID valide*" }),
     id_event: z.string({ message: "L'event id est requis*" }).uuid({ message: "L'event id doit être un UUID valide*" })
});
