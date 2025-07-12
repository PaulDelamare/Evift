import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import GiftApi from '$lib/server/gift.server';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { giftSchema } from '$lib/validationSchema/gift.schema';


export const load = (async () => {

	const formCreateGift = await superValidate(zod(giftSchema));

	return { formCreateGift };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createGiftList: async (event) => {

		const form = await superValidate(event.request, zod(giftSchema));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		if (!form.data.gifts.length) {
			return message(form, {
				error: 'Veuillez ajouter au moins un cadeau'
			})
		}

		const api = new GiftApi(event.fetch);
		const response = await api.createList(form.data);

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
