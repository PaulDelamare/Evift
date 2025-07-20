import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addGiftSchema } from '$lib/validationSchema/gift.schema';
import GiftApi from '$lib/server/gift.server';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
    const formAddGift = await superValidate(zod(addGiftSchema));

    return { formAddGift };
}) satisfies PageServerLoad;

export const actions: Actions = {
    addGift: async (event) => {
        const form = await superValidate(event.request, zod(addGiftSchema));

        if (!form.valid) {
            return message(form, { error: 'Veuillez remplir tous les champs' });
        }

        if (!form.data.gifts.length) {
            return message(form, {
                error: 'Veuillez ajouter au moins un cadeau'
            })
        }

        const api = new GiftApi(event.fetch);
        const response = await api.addGift(form.data);

        if ('error' in response) {
            return message(form, {
                error: response.error.error ?? 'Une erreur est survenue lors de la création de la liste de cadeaux'
            })
        }

        return message(form, {
            success: true
        });
    }
};