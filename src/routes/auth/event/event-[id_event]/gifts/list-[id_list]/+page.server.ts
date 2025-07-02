import GiftApi from '$lib/server/gift.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';

export const load = (async ({ fetch, params, locals }) => {
	const id_list = params.id_list;

	const api = new GiftApi(fetch);
	const list = await executeOrThrow(api.findList(id_list));

	const user = locals.user;

	if (user!.id === list.data.list.id_user) {
		list.data.list.gifts = list.data.list.gifts.map((gift) => {
			return {
				...gift,
				taken: false,
				id_userTaken: 'bien essayé'
			};
		});
	}

	return {
		list: list.data,
		user: user!
	};
}) satisfies PageServerLoad;

const schema = yup.object().shape({
	eventId: yup.string().uuid().required("L'event id est requis*"),
	giftId: yup.string().uuid().required('La liste id est requise*'),
	taken: yup.boolean().required('La valeur est requise*')
});

export const actions: Actions = {
	checkGift: async ({ request, fetch }) => {
		const data = await request.formData();

		const checked = data.get('taken') as string | null;
		const eventId = data.get('eventId') as string;
		const giftId = data.get('giftId') as string;

		let taken: boolean;

		if (checked === 'on') {
			taken = true;
		} else {
			taken = false;
		}

		const errors: { error?: string } = {};

		try {
			// Validation schema
			await schema.validate({ eventId, giftId, taken }, { abortEarly: false });
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
		const res = await api.checkGift(eventId, giftId, taken);

		if ('error' in res) {
			errors.error = res.error.error;
			return { status: 400, errors };
		}

		return { status: 200, success: true };
	}
};
