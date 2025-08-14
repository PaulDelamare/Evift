import { z } from "zod";

export const requestAccount = z.object({
     email: z.string().email('Email invalide*'),
})

export const requestEvent = z.object({
     email: z.string().email('Email invalide*'),
     id_event: z.string().uuid('ID d\'événement invalide*')
})
