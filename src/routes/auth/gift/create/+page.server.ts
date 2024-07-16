import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import GiftApi from '$lib/server/gift.server';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

const schema = yup.object().shape({
	name: yup.string().required('Le nom est requis*'),
	giftsJson: yup.array().of(
		yup.object().shape({
			name: yup.string().min(2).max(100).required('Le nom est requis*'),
			quantity: yup.number().min(1).max(1000).required('La quantité est requise*'),
			url: yup
				.string()
				.nullable()
				.transform((value, originalValue) => {
					return originalValue === '' ? null : originalValue;
				})
				.matches(
					/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.+~#?&//=]*)$/,
					'Enter correct url!'
				)
		})
	)
});

export const actions: Actions = {
	createGiftList: async ({ request, fetch }) => {
		const data = await request.formData();

		// Get form data values
		const name = data.get('name') as string;
		const gifts = data.get('gifts') as string;

		// Transform string to json
		const giftsJson = JSON.parse(gifts);

		const errors: { error?: string; giftsJson?: string; name?: string } = {};

		// ? Validation
		try {
			// Validation schema
			await schema.validate({ name, giftsJson }, { abortEarly: false });
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					if (err.path?.includes('giftsJson')) {
						errors.giftsJson = err.message;
					}

					if (err.path === 'name') {
						errors.name = err.message;
					}
				});

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}
		if (!giftsJson.length) {
			errors.giftsJson = 'Veuillez ajouter au moins un cadeau';
			return { status: 400, errors };
		}

		const api = new GiftApi(fetch);
		const response = await api.createList({ name, gifts: giftsJson });

		if ('error' in response) {
			errors.error = response.error;
			return { status: 401, errors };
		}

		return {
			status: 200,
			success: true
		};
	}
};
