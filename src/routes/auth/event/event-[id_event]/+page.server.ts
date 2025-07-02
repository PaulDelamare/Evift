import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import EventApi from '$lib/server/event.server';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	changeRoleParticipant: async ({ request, fetch }) => {
		// Get form data
		const data = await request.formData();

		// Get form data values
		const id_role = data.get('id_role') as string;
		const id_user = data.get('id_user') as string;
		const id_event = data.get('id_event') as string;

		const errors: { error?: string } = {};

		// Must have invitationId and accept
		const schema = yup.object().shape({
			id_role: yup.string().uuid().required(),
			id_user: yup.string().uuid().required(),
			id_event: yup.string().uuid().required()
		});

		// ? Validation
		try {
			// Validation schema
			await schema.validate({ id_role, id_user, id_event }, { abortEarly: false });
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is and return this in errors instance
				error.inner.forEach((err) => {
					errors.error = err.message;
				});

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, errors: 'Une erreur est survenue' };
			}
		}

		// Instance Invitation in api
		const api = new EventApi(fetch);

		// Call responseInvitation
		const res = await api.changeRoleParticipant(id_event, id_user, id_role);

		if ('error' in res) {
			return { status: 400, errors: res.error.error };
		}

		return { status: 200, success: true };
	}
};
