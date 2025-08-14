import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { changeRoleParticipantSchema } from '$lib/validationSchema/participant.schema';
import { inviteFriends, inviteNonFriendsSchema } from '$lib/validationSchema/event.schema';
import InvitationApi from '$lib/server/invitation.server';
import UserApi from '$lib/server/user.server';
import { findUserByEmailSchema } from '$lib/validationSchema/friends.schema';
import RequestAccountApi from '$lib/server/requestAccount.server';
import { requestEvent } from '$lib/validationSchema/requestAccount.schema';

export const load = (async () => {

	const form = await superValidate(zod(changeRoleParticipantSchema));

	const formFriends = await superValidate(zod(inviteFriends));

	const formFindUser = await superValidate(zod(findUserByEmailSchema));

	const formRequestEvent = await superValidate(zod(requestEvent));

	const formNonFriends = await superValidate(zod(inviteNonFriendsSchema));

	return {
		form,
		formFriends,
		formFindUser,
		formRequestEvent,
		formNonFriends
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	changeRoleParticipant: async (event) => {

		const form = await superValidate(event, zod(changeRoleParticipantSchema));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new EventApi(event.fetch);
		const res = await api.changeRoleParticipant(form.data);

		if ('error' in res) {
			return message(form, { status: 400, error: res.error.error });
		}

		return message(form, { success: true, message: 'Rôle modifié avec succès' });
	},

	inviteFriends: async (event) => {

		const form = await superValidate(event, zod(inviteFriends));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const inviteList = form.data.arrayInviteList;
		if (Array.isArray(inviteList) && inviteList.length > 0) {
			const invitationApi = new InvitationApi(event.fetch);
			const invitationResult = await invitationApi.eventInvitation(form.data.eventId, inviteList);
			if ('error' in invitationResult) {
				return message(form, { error: invitationResult.error.error || 'Une erreur est survenue lors de l\'envoi des invitations' });
			}
		}

		return message(form, { success: true, message: 'Invitations envoyées avec succès' });
	},

	/**
	 * Finds a user by their email address.
	 * @param event - The request event containing form data.
	 * @returns A form message with the found user or an error.
	 */
	findUserByEmail: async (event) => {
		const form = await superValidate(event, zod(findUserByEmailSchema));
		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new UserApi(event.fetch);
		const res = await api.getUserByEmail(form.data);

		if ('error' in res) {
			return message(form, { error: res.error.error });
		}

		if (!res.data) {
			return message(form, { error: "Aucun utilisateur n'a été trouvé" });
		}

		return message(form, { user: res.data });
	},

	requestEvent: async (event) => {
		const form = await superValidate(event, zod(requestEvent));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const api = new RequestAccountApi(event.fetch);
		const res = await api.requestAccount(form.data.email, form.data.id_event);

		if ('error' in res) {
			return message(form, { error: res.error.error });
		}

		return message(form, { success: true, message: 'Demande de compte envoyée avec succès' });
	},

	inviteNonFriends: async (event) => {

		const form = await superValidate(event, zod(inviteNonFriendsSchema));

		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		const inviteList = [form.data.userId];
		if (inviteList[0]) {
			const invitationApi = new InvitationApi(event.fetch);
			const invitationResult = await invitationApi.eventInvitation(form.data.eventId, inviteList);
			if ('error' in invitationResult) {
				return message(form, { error: invitationResult.error.error || 'Une erreur est survenue lors de l\'envoi des invitations' });
			}
		}

		return message(form, { success: true, message: 'Invitation envoyée avec succès' });
	}
};
