import FriendsApi from '$lib/server/friends.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import UserApi from '$lib/server/user.server';
import InvitationApi from '$lib/server/invitation.server';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { findUserByEmailSchema } from '$lib/validationSchema/friends.schema';
import { uuidSchema } from '$lib/validationSchema/base.schema';

export const load = (async (event) => {

	const api = new FriendsApi(event.fetch);
	const friends = await executeOrThrow(api.getFriends());

	const form = await superValidate(zod(findUserByEmailSchema));
	const formUuid = await superValidate(event, zod(uuidSchema));

	return {
		friends: friends.data,
		form,
		formUuid
	};

}) satisfies PageServerLoad;

/**
 * SvelteKit actions for the friends page.
 * Handles finding users by email, sending friend invitations, and completing first login.
 */
export const actions: Actions = {
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

	/**
	 * Sends a friend invitation to a user by UUID.
	 * @param event - The request event containing form data.
	 * @returns A form message indicating success or error.
	 */
	sendFriendsInvitation: async (event) => {
		const form = await superValidate(event, zod(uuidSchema));
		if (!form.valid) {
			return message(form, { error: 'Veuillez remplir tous les champs' });
		}

		if (event.locals.user?.id === form.data.id) {
			return message(form, { error: 'Vous ne pouvez pas vous inviter vous même !' });
		}

		const api = new InvitationApi(event.fetch);
		const res = await api.sendFriendsInvitation(form.data);

		if ('error' in res) {
			return message(form, { error: res.error.error });
		}

		return message(form, {
			success: true,
			message: 'Invitation envoyée avec succès !'
		});
	},

	/**
	 * Marks the user's first login as complete.
	 * @param param0 - The request event with fetch.
	 * @returns A JSON string indicating success or error.
	 */
	completeFirstLogin: async ({ fetch }) => {
		const apiUser = new UserApi(fetch);
		const res = await apiUser.completeFirstLogin();

		if ('error' in res) {
			return JSON.stringify({ error: res.error.error });
		}

		return JSON.stringify({ success: true });
	},

	deleteFriend: async (event) => {

		const form = await superValidate(event, zod(uuidSchema));

		if (!form.valid) {
			return JSON.stringify({
				error: 'Formulaire invalide, veuillez vérifier les champs.'
			});
		}

		const api = new FriendsApi(event.fetch);
		const res = await api.deleteFriend(form.data.id);

		if ('error' in res) {
			return JSON.stringify({
				error: res.error ? res.error.error : 'Unknown error occurred'
			});
		}

		return JSON.stringify({
			status: 200,
			success: true
		});
	}
};
