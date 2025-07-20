import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { uuidSchema } from '$lib/validationSchema/base.schema';
import GiftApi from '$lib/server/gift.server';

export const load = (async () => {

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	deleteGift: async (event) => {
		const form = await superValidate(event.request, zod(uuidSchema));

		if (!form.valid) {
			return JSON.stringify({
				error: 'Formulaire invalide, veuillez vérifier les champs.'
			});
		}

		const api = new GiftApi(event.fetch);
		console.log(form.data.id);
		const res = await api.deleteGift(form.data.id);

		if ("error" in res) {
			return {
				error: res.error ? res.error.error : 'Unknown error occurred'
			};
		}

		return JSON.stringify({
			status: 200,
			success: true
		});
	},
	deleteList: async (event) => {
		const form = await superValidate(event.request, zod(uuidSchema));

		if (!form.valid) {
			return JSON.stringify({
				error: 'Formulaire invalide, veuillez vérifier les champs.'
			});
		}

		const api = new GiftApi(event.fetch);
		console.log(form.data.id);
		const res = await api.deleteList(form.data.id);

		if ("error" in res) {
			return {
				error: res.error ? res.error.error : 'Unknown error occurred'
			};
		}

		return JSON.stringify({
			status: 200,
			success: true
		});
	}
}
