import FriendsApi from '$lib/server/friends.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import * as yup from 'yup';
import EventApi from '$lib/server/event.server';
import InvitationApi from '$lib/server/invitation.server';

export const load = (async ({ fetch }) => {
	// Instance Friends Api
	const api = new FriendsApi(fetch);
	// Get Friends
	const friends = await api.getFriends();
	return {
		friends
	};
}) satisfies PageServerLoad;

const currentDate = new Date();

const createSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Nom trop court*')
		.max(100, 'Nom trop long*')
		.required('Le nom est requis*'),
	description: yup
		.string()
		.min(3, 'Description trop court*')
		.max(300, 'Description trop long*')
		.required('La description est requis*'),
	address: yup
		.string()
		.min(3, "L'adresse trop court*")
		.max(300, "L'adresse trop long*")
		.required("L'adresse est requis*"),
	date: yup
		.date()
		.min(currentDate, 'La date ne peut pas être inférieure à la date actuelle')
		.required('La date est requise*')
		.transform((value, originalValue) => {
			if (originalValue) {
				return new Date(originalValue);
			}
			return value;
		})
		.typeError('La date doit être une date valide'),
	time: yup
		.string()
		.matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "L'heure doit être au format HH:mm")
		.required("L'heure est requise"),
	image: yup
		.mixed()
		.optional()
		.transform((value, originalValue: File) => {
			if (!originalValue || originalValue.size === 0) {
				return undefined;
			}
			return originalValue;
		})
		.test('is-image', 'Le fichier doit être une image valide', (value) => {
			if (!value) {
				return true;
			}
			return value.type.startsWith('image/');
		})
		.test('file-size', 'Le fichier est trop volumineux', (value) => {
			if (!value) {
				return true;
			}
			// 5 Mo maximum (change the first number to change the maximum size)
			return value.size <= 5 * 1024 * 1024;
		}),
	arrayInviteList: yup.array().of(yup.string().uuid()).required("La liste d'invités est requise*")
});

export const actions: Actions = {
	createEvent: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const date = data.get('date') as string;
		const address = data.get('address') as string;
		const image = data.get('image') as File;
		const time = data.get('time') as File;
		const inviteList = data.get('inviteList') as string;

		const arrayInviteList = inviteList.split(',');

		const errors: {
			error?: string;
			name?: string;
			description?: string;
			date?: string;
			address?: string;
			image?: string;
			inviteList?: string;
			time?: string;
		} = {};

		try {
			// Validation schema
			await createSchema.validate(
				{ name, description, date, time, address, image, arrayInviteList },
				{ abortEarly: false }
			);
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					if (err.path === 'name') {
						errors.name = err.message;
					}
					if (err.path === 'description') {
						errors.description = err.message;
					}
					if (err.path === 'date') {
						errors.date = err.message;
					}
					if (err.path === 'time') {
						errors.time = err.message;
					}
					if (err.path === 'address') {
						errors.address = err.message;
					}
					if (err.path === 'image') {
						errors.image = err.message;
					}
					if (err.path?.includes('arrayInviteList')) {
						errors.inviteList = "La liste d'invitations n'est pas valide";
					}
				});

				// Return errors
				return { status: 400, errors };
			} else {
				errors.error = 'Une erreur est survenue';
				// Else Throw custom Error
				return { status: 400, errors };
			}
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('date', date);
		formData.append('time', time);
		formData.append('address', address);
		if (image.size > 0) {
			formData.append('img', image);
		}

		// Instance Event Api
		const api = new EventApi(fetch);
		// Call Create Event
		const res = await api.createEvent(formData);

		// If error in response
		if ('error' in res) {
			// Return error
			errors.error = res.error;
			return { status: 400, errors };
		}

		// Instance Invitation Api
		const invitationApi = new InvitationApi(fetch);

		// Call eventInvitation
		const resInvitation = await invitationApi.eventInvitation(res.data, arrayInviteList);

		if ('error' in resInvitation) {
			// Return error
			errors.error = resInvitation.error;
			return { status: 400, errors };
		}

		// Return success
		return { success: true };
	}
};
