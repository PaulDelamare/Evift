import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { changeRoleParticipantSchema } from '$lib/validationSchema/participant.schema';

export const load = (async () => {

	const form = await superValidate(zod(changeRoleParticipantSchema));
	return {
		form
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
	}
};
