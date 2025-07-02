import InvitationApi from '$lib/server/invitation.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import { convertStringToBoolean } from '$lib/functions/utils/transformStringToBoolean/transformStringToBoolean';
import { env } from '$env/dynamic/private';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';

export const load = (async ({ fetch }) => {

	const notifApi = new InvitationApi(fetch);

	const invitations = await executeOrThrow(notifApi.getInvitations());
	const invitationsEvent = await executeOrThrow(notifApi.getEventInvitation());

	const imgUrl = env.API_URL;

	return {
		invitations: invitations.data,
		invitationsEvent: invitationsEvent.data,
		imgUrl
	};
}) satisfies PageServerLoad;

const schema = yup.object().shape({
	invitationId: yup.string().uuid().required(),
	accept: yup.boolean().required()
});

interface Errors {
	error?: string;
}

export const actions: Actions = {
	/**
	 * Accept or reject an invitation.
	 *
	 * @param request - The request object for form data retrieval.
	 * @param fetch - The fetch function for API calls.
	 * @return Object containing success status, removed ID, and accept status.
	 */
	invitation: async ({ request, fetch }) => {
		const data = await request.formData();

		const invitationId = data.get('invitationId') as string;
		let accept = data.get('accept') as string | boolean;
		const errors: Errors = {};

		try {
			await schema.validate({ invitationId, accept }, { abortEarly: false });
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path === 'invitationId') {
						errors.error = err.message;
					}

					if (err.path === 'accept') {
						errors.error = err.message;
					}
				});

				return { status: 400, errors };
			} else {
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		accept = convertStringToBoolean(accept as string);

		const api = new InvitationApi(fetch);
		const res = await api.responseInvitation(invitationId, accept);

		if ('error' in res) {
			errors.error = res.error.error;
			return { status: 400, errors };
		}
		return {
			successFriend: true,
			idRemove: invitationId,
			acceptFriend: accept
		};
	},

	acceptOrRefuseEvent: async ({ request, fetch }) => {
		const data = await request.formData();
		const invitationId = data.get('eventId') as string;
		let accept = data.get('accept') as string | boolean;
		const errors: Errors = {};

		try {
			await schema.validate({ invitationId, accept }, { abortEarly: false });
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path === 'invitationId') {
						errors.error = err.message;
					}

					if (err.path === 'accept') {
						errors.error = err.message;
					}
				});

				return { status: 400, errors };
			} else {
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		accept = convertStringToBoolean(accept as string);

		const api = new InvitationApi(fetch);
		const res = await api.responseEventInvitation(invitationId, accept);

		if ('error' in res) {
			errors.error = res?.error.error;
			return { status: 400, errors };
		}

		return {
			successEvent: true,
			acceptEvent: accept,
			idRemoveEvent: invitationId
		};
	}
};
