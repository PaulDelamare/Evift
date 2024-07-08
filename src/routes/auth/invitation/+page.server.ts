// ! IMPORTANT
import InvitationApi from '$lib/server/invitation.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import { convertStringToBoolean } from '$lib/functions/utils/transformStringToBoolean';
import { API_URL } from '$env/static/private';

export const load = (async ({ fetch }) => {
	// Instance Invitation Api
	const notifApi = new InvitationApi(fetch);
	// Get Notification number
	const invitations = await notifApi.getInvitations();
	const invitationsEvent = await notifApi.getEventInvitation();

	const imgUrl = API_URL;

	// Return data
	return {
		invitations: invitations.data,
		invitationsEvent: invitationsEvent.data,
		imgUrl
	};
}) satisfies PageServerLoad;

// ! SCHEMA
// Must have invitationId and accept
const schema = yup.object().shape({
	invitationId: yup.string().uuid().required(),
	accept: yup.boolean().required()
});

// Errors model
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
		// Get form data
		const data = await request.formData();

		// Get form data values
		const invitationId = data.get('invitationId') as string;
		let accept = data.get('accept') as string | boolean;
		const errors: Errors = {};

		// ? Validation
		try {
			// Validation schema
			await schema.validate({ invitationId, accept }, { abortEarly: false });
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					if (err.path === 'invitationId') {
						errors.error = err.message;
					}

					if (err.path === 'accept') {
						errors.error = err.message;
					}
				});

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		// Convert string to boolean
		accept = convertStringToBoolean(accept as string);

		// Instance Invitation in api
		const api = new InvitationApi(fetch);
		// Call responseInvitation
		const res = await api.responseInvitation(invitationId, accept);

		// if an error occurs
		if ('error' in res) {
			// Return error
			errors.error = res?.error;
			return { status: 400, errors };
		}
		// Else return success
		return {
			successFriend: true,
			idRemove: invitationId,
			acceptFriend: accept
		};
	},

	acceptOrRefuseEvent: async ({ request, fetch }) => {
		// Get form data
		const data = await request.formData();
		const invitationId = data.get('eventId') as string;
		let accept = data.get('accept') as string | boolean;
		const errors: Errors = {};

		// ? Validation
		try {
			// Validation schema
			await schema.validate({ invitationId, accept }, { abortEarly: false });
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					if (err.path === 'invitationId') {
						errors.error = err.message;
					}

					if (err.path === 'accept') {
						errors.error = err.message;
					}
				});

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		// Convert string to boolean
		accept = convertStringToBoolean(accept as string);

		// Instance Invitation in api
		const api = new InvitationApi(fetch);
		// Call responseInvitation
		const res = await api.responseEventInvitation(invitationId, accept);

		// if an error occurs
		if ('error' in res) {
			// Return error
			errors.error = res?.error;
			return { status: 400, errors };
		}
		// Else return success
		return {
			successEvent: true,
			acceptEvent: accept,
			idRemoveEvent: invitationId
		};
	}
};
