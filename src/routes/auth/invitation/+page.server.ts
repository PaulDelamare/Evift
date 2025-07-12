import InvitationApi from '$lib/server/invitation.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import { responseInvitationSchema } from '$lib/validationSchema/invitation.schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ fetch }) => {

	const notifApi = new InvitationApi(fetch);

	const invitations = await executeOrThrow(notifApi.getInvitations());
	const invitationsEvent = await executeOrThrow(notifApi.getEventInvitation());

	const imgUrl = env.API_URL;

	const formInvitationUser = await superValidate(zod(responseInvitationSchema));

	return {
		invitations: invitations.data,
		invitationsEvent: invitationsEvent.data,
		imgUrl,
		formInvitationUser
	};
}) satisfies PageServerLoad;

/**
 * SvelteKit form actions for handling invitation responses.
 */
export const actions: Actions = {
	/**
	 * Handles user response to a standard invitation.
	 * @param event - The request event containing form data.
	 * @returns A form message indicating success or error.
	 */
	invitation: async (event) => {
		const form = await superValidate(event, zod(responseInvitationSchema));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new InvitationApi(event.fetch);
		const res = await api.responseInvitation(form.data);

		if ('error' in res) {
			return message(form, { error: res.error.error ?? 'Une erreur est survenue' });
		}

		return message(form, {
			success: true,
			message: form.data.response
				? "Invitation acceptée avec succès."
				: "Invitation refusée avec succès."
		});
	},

	/**
	 * Handles user response to an event invitation.
	 * @param event - The request event containing form data.
	 * @returns A form message indicating success or error.
	 */
	acceptOrRefuseEvent: async (event) => {
		const form = await superValidate(event, zod(responseInvitationSchema));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new InvitationApi(event.fetch);
		const res = await api.responseEventInvitation(form.data);

		if ('error' in res) {
			return message(form, {
				error: res.error.error ?? 'Une erreur est survenue'
			});
		}

		return message(form, {
			success: true,
			message: form.data.response
				? "Invitation à l'événement acceptée avec succès."
				: "Invitation à l'événement refusée avec succès."
		});
	}
};
