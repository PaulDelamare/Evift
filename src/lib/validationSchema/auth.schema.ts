import { z } from "zod";


export const loginSchema = z.object({
     email: z.string().email('Email invalide*'),

     password: z.string()
          .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*'),
     secret: z.string()
});


export const registerSchema = z.object({
     firstname: z.string()
          .min(2, 'Le prénom doit contenir au moins 2 caractères*')
          .max(50, 'Le prénom doit contenir au maximum 50 caractères*'),
     lastname: z.string()
          .min(2, 'Le nom doit contenir au moins 2 caractères*')
          .max(50, 'Le nom doit contenir au maximum 50 caractères*'),
     email: z.string().email('Email invalide*'),
     password: z.string()
          .min(8, 'Le mot de passe doit contenir au moins 8 caractères*')
          .regex(
               /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
               'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*'
          ),
     passwordConfirm: z.string()
          .min(8, 'Le mot de passe doit contenir au moins 8 caractères*')
          .regex(
               /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
               'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*'
          ),
     secret: z.string(),
     rgpd: z.boolean().refine((val) => val, {
          message: "Vous devez accepter les conditions d'utilisation*"
     })
}).refine((data) => data.password === data.passwordConfirm, {
     message: "Les mots de passe ne correspondent pas*",
     path: ["passwordConfirm"],
});

