import FriendsApi from '$lib/server/friends.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import * as yup from 'yup';
import EventApi from '$lib/server/event.server';
import InvitationApi from '$lib/server/invitation.server';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';

export const load = (async ({ fetch }) => {

	const api = new FriendsApi(fetch);
	const friends = await executeOrThrow(api.getFriends());

	return {
		friends : friends.data,
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

	arrayInviteList: yup.array().of(yup.string().uuid()).required("La liste d'invités est requise*")
});

export const actions: Actions = {
	createEvent: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const date = data.get('date') as string;
		const address = data.get('address') as string;
		const time = data.get('time') as File;
		const inviteList = data.get('inviteList') as string;

		const arrayInviteList = inviteList.split(',');

		const errors: {
			error?: string;
			name?: string;
			description?: string;
			date?: string;
			address?: string;
			inviteList?: string;
			time?: string;
		} = {};

		try {
			await createSchema.validate(
				{ name, description, date, time, address, arrayInviteList },
				{ abortEarly: false }
			);
		} catch (error) {
			// - Catch Errors
			if (error instanceof yup.ValidationError) {
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
					if (err.path?.includes('arrayInviteList')) {
						errors.inviteList = "La liste d'invitations n'est pas valide";
					}
				});

				return { status: 400, errors };
			} else {
				errors.error = 'Une erreur est survenue';
				return { status: 400, errors };
			}
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('date', date);
		formData.append('time', time);
		formData.append('address', address);

		const api = new EventApi(fetch);
		const res = await api.createEvent(formData);

		if ('error' in res) {
			errors.error = res.error.error;
			return { status: 400, errors };
		}

		const invitationApi = new InvitationApi(fetch);

		const resInvitation = await invitationApi.eventInvitation(res.data.eventId, arrayInviteList);

		if ('error' in resInvitation) {
			errors.error = resInvitation.error.error;
			return { status: 400, errors };
		}

		return { success: true };
	}
};
