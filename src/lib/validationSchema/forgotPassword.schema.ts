import { z } from "zod";

export const responseForgotPasswordSchema = z.object({
     email: z.string().email(),
});

export const changePasswordSchema = z.object({
     userId: z.string().uuid(),
     token: z.string().length(128).regex(/^[0-9a-f]+$/),
     password: z.string().min(8).max(100),
     confirmPassword: z.string().min(8).max(100)
}).refine(data => data.password === data.confirmPassword, {
     message: "Passwords don't match",
     path: ["confirmPassword"]
});
