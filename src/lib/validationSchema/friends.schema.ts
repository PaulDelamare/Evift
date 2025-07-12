import { z } from "zod";

export const findUserByEmailSchema = z.object({
     email: z.string({ message: "L'email est requis*" }).email({ message: "L'email doit être un email valide*" })
});
