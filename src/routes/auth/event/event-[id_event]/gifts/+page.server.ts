import type { List } from '$lib/models/gift.model';
import GiftApi from '$lib/server/gift.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import { message, superValidate } from 'sveltekit-superforms';
import { listGiftEventSchema } from '$lib/validationSchema/gift.schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async (event) => {

	const id_event = event.params.id_event;
	const roleUser = (await event.parent()).roleUser;

	const api = new GiftApi(event.fetch);
	const listsEvent = await executeOrThrow(api.findForEvent(id_event));

	let lists: List[] = [];

	if (roleUser.role?.name === 'admin' || roleUser.role?.name === 'gift') {
		lists = (await executeOrThrow(api.findAll())).data;
	}

	const formAddList = await superValidate(zod(listGiftEventSchema));

	return {
		listsEvent: listsEvent.data,
		lists,
		formAddList
	};
}) satisfies PageServerLoad;

/**
 * SvelteKit form actions for managing gift lists in an event.
 * 
 * @remarks
 * - `addGift`: Adds a new gift list to the event after validating the form.
 * - `deleteListEvent`: Deletes a gift list from the event after validating the form.
 */
export const actions: Actions = {
	/**
	 * Add a new gift list to the event.
	 * 
	 * @param event - The request event containing form data.
	 * @returns A form message indicating success or error.
	 */
	addGift: async (event) => {
		const form = await superValidate(event, zod(listGiftEventSchema));
		if (!form.valid) {
			return message(form, { error: "Une erreur est survenue lors de l'ajout de la liste" });
		}

		const api = new GiftApi(event.fetch);
		const res = await api.addListEvent(form.data);

		if ('error' in res) {
			return message(form, { error: res.error.error ?? "Une erreur est survenue lors de l'ajout de la liste" });
		}

		return message(form, {
			success: true,
			idList: form.data.idList,
			message: "La liste a été ajoutée avec succès à l'événement"
		});
	},

	/**
	 * Delete a gift list from the event.
	 * 
	 * @param event - The request event containing form data.
	 * @returns A form message indicating success or error.
	 */
	deleteListEvent: async (event) => {
		const form = await superValidate(event, zod(listGiftEventSchema));
		if (!form.valid) {
			return message(form, { error: "Une erreur est survenue lors de la suppression de la liste" });
		}

		const api = new GiftApi(event.fetch);
		const res = await api.deleteListEvent(form.data);

		if ('error' in res) {
			return message(form, {
				error: res.error.error ?? "Une erreur est survenue lors de la suppression de la liste"
			});
		}

		return message(form, {
			success: true,
			message: "La liste a été supprimée avec succès",
			idList: undefined
		});
	}
};
