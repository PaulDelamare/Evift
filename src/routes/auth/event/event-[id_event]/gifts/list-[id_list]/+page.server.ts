import GiftApi from '$lib/server/gift.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { checkGiftSchema } from '$lib/validationSchema/gift.schema';

export const load = (async (event) => {
	const id_list = event.params.id_list;

	const api = new GiftApi(event.fetch);
	const list = await executeOrThrow(api.findList(id_list));

	const user = event.locals.user;

	if (user!.id === list.data.list.id_user) {
		list.data.list.gifts = list.data.list.gifts.map((gift) => {
			return {
				...gift,
				taken: false,
				id_userTaken: 'bien essayé'
			};
		});
	}

	const form = await superValidate(zod(checkGiftSchema));

	return {
		list: list.data,
		user: user!,
		form
	};
}) satisfies PageServerLoad;


export const actions: Actions = {

	/**
	 * Action to check (mark as taken or available) a gift.
	 * Validates the form, calls the API, and returns a message.
	 * @param event - The request event from SvelteKit.
	 * @returns A message indicating success or error.
	 */
	checkGift: async (event) => {
		const form = await superValidate(event, zod(checkGiftSchema));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new GiftApi(event.fetch);
		const res = await api.checkGift(form.data);

		if ('error' in res) {
			return message(form, { error: res.error.error ?? 'Une erreur est survenue lors de la vérification du cadeau' });
		}

		const successMsg = form.data.taken
			? 'Le cadeau a bien été marqué comme acheté.'
			: 'Le cadeau a bien été remis à disposition des autres utilisateurs.';

		return message(form, { success: true, message: successMsg });
	}
};
