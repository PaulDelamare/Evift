import FriendsApi from '$lib/server/friends.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import InvitationApi from '$lib/server/invitation.server';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import { createEventSchema } from '$lib/validationSchema/event.schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';


export const load = (async (event) => {

	const api = new FriendsApi(event.fetch);
	const friends = await executeOrThrow(api.getFriends());

	const form = await superValidate(event, zod(createEventSchema));

	return {
		friends: friends.data,
		form
	};
}) satisfies PageServerLoad;


export const actions: Actions = {

	/**
	 * Action to create a new event and send invitations.
	 * @param event - The request event from SvelteKit.
	 * @returns A message indicating success or error.
	 */
	createEvent: async (event) => {
		const form = await superValidate(event, zod(createEventSchema));
		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new EventApi(event.fetch);
		const eventResult = await api.createEvent(form.data);

		if ('error' in eventResult) {
			return message(form, { error: eventResult.error.error || 'Une erreur est survenue lors de la création de l\'événement' });
		}

		const inviteList = form.data.arrayInviteList;
		if (Array.isArray(inviteList) && inviteList.length > 0) {
			const invitationApi = new InvitationApi(event.fetch);
			const invitationResult = await invitationApi.eventInvitation(eventResult.data.eventId, inviteList);
			if ('error' in invitationResult) {
				return message(form, { error: invitationResult.error.error || 'Une erreur est survenue lors de l\'envoi des invitations' });
			}
		}

		return message(form, { success: true });
	}
};
