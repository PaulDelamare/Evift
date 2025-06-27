// ! IMPORTS
import FriendsApi from '$lib/server/friends.server';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import UserApi from '$lib/server/user.server';
import InvitationApi from '$lib/server/invitation.server';

export const load = (async ({ fetch }) => {
	// Instance Friends Api
	const api = new FriendsApi(fetch);
	// Get Friends
	const friends = await api.getFriends();

	// Return data
	return {
		friends
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	findUserByEmail: async ({ request, fetch }) => {
		// Get form data
		const data = await request.formData();
		const email = data.get('email') as string;

		// Must have invitationId and accept
		const emailSchema = yup.object().shape({
			email: yup.string().email('Email invalide*').required('Email requis*')
		});

		const errors: { error?: string; email?: string } = {};
		// ? Validation
		try {
			// Validation schema
			await emailSchema.validate({ email }, { abortEarly: false });
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					if (err.path === 'email') {
						errors.email = err.message;
					}
				});

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		// Instance Friends Api
		const api = new UserApi(fetch);

		// Get User by email
		const user = await api.getUserByEmail(email);
		if (!user) {
			errors.error = "Aucun utilisateur n'a été trouvé";
			return { status: 400, errors };
		}

		if (user.error) {
			// If an error occurs
			errors.error = user.error;
			return { status: 400, errors };
		}

		// Return data
		return {
			user
		};
	},

	sendFriendsInvitation: async ({ request, fetch, locals }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const schema = yup.object().shape({
			id: yup.string().uuid('Id invalide*').required('Id requis*')
		});
		const errors: { error?: string; id?: string } = {};
		try {
			await schema.validate({ id }, { abortEarly: false });
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path === 'id') {
						errors.id = err.message;
					}
				});

				return { status: 400, errors };
			} else {
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		if (locals.user?.id === id) {
			errors.error = 'Vous ne pouvez pas vous inviter vous même !';
			return { status: 400, errors };
		}

		const api = new InvitationApi(fetch);
		const res = await api.sendFriendsInvitation(id);

		if ('error' in res) {
			errors.error = res.error;
			return { status: 400, errors };
		}

		return {
			success: true
		};
	},

	completeFirstLogin: async ({ fetch }) => {

		const apiUser = new UserApi(fetch);
		const res = await apiUser.completeFirstLogin();

		if ("error" in res) {
			return JSON.stringify({
				error: res.error.error
			});

		}

		return JSON.stringify({
			success: true
		})
	}
};
