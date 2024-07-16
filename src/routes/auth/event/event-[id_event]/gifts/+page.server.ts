import type { List } from '$lib/models/gift.model';
import GiftApi from '$lib/server/gift.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';

export const load = (async ({ fetch, params, parent }) => {
	const api = new GiftApi(fetch);
	const id_event = params.id_event;
	const listsEvent = await api.findForEvent(id_event);

	const roleUser = (await parent()).roleUser;

	let lists: List[] = [];

	if (roleUser.role.name === 'admin' || roleUser.role.name === 'gift') {
		lists = (await api.findAll()).data;
	}

	return {
		listsEvent: listsEvent.data,
		lists
	};
}) satisfies PageServerLoad;

const schema = yup.object().shape({
	eventId: yup.string().uuid().required("L'event id est requis*"),
	listId: yup.string().uuid().required('La liste id est requise*')
});

export const actions: Actions = {
	addGift: async ({ request, fetch }) => {
		const data = await request.formData();
		const eventId = data.get('eventId') as string;
		const listId = data.get('listId') as string;

		const errors: { error?: string } | undefined = {};

		try {
			// Validation schema
			await schema.validate({ eventId, listId }, { abortEarly: false });
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					errors.error = err.message;
				});

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		const api = new GiftApi(fetch);

		const res = await api.addListEvent(eventId, listId);

		if ('error' in res) {
			errors.error = res.error;
			return { status: 400, errors };
		}

		return { status: 200, success: true, idList: listId };
	},

	deleteListEvent: async ({ request, fetch }) => {
		const data = await request.formData();
		const eventId = data.get('eventId') as string;
		const listId = data.get('listId') as string;

		const errorsDelete: { error?: string } = {};

		try {
			// Validation schema
			await schema.validate({ eventId, listId }, { abortEarly: false });
		} catch (error) {
			// - Catch ErrorsDelete
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errorsDelete instance
				error.inner.forEach((err) => {
					errorsDelete.error = err.message;
				});

				// Return errorsDelete
				return { status: 400, errorsDelete };
			} else {
				// Else Throw custom Error
				return { status: 400, errorsDelete: 'Une erreur est survenue' };
			}
		}

		const api = new GiftApi(fetch);
		const res = await api.deleteListEvent(eventId, listId);

		if ('error' in res) {
			return { status: 400, error: res.error };
		}

		return { status: 200, successDelete: true };
	}
};
