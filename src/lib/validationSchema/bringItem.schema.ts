import { z } from 'zod';

export const bringItemSchema = z.object({
    eventId: z.string().uuid(),
    name: z.string().min(1, 'Nom requis'),
    requestedQuantity: z.number().min(1, 'Quantité minimum : 1')
});

export const takeSchema = z.object({
	id: z.string().min(1, 'ID requis'),
	quantity: z.coerce.number().int().min(1, 'Quantité requise')
});

export const releaseSchema = z.object({
	id: z.string().min(1, 'ID requis')
});


export const deleteSchema = z.object({
	id: z.string().min(1)
});

export type BringItemForm = z.infer<typeof bringItemSchema>;
export type TakeItemForm = z.infer<typeof takeSchema>;
export type ReleaseItemForm = z.infer<typeof releaseSchema>;
export type DeleteItemForm = z.infer<typeof deleteSchema>;
