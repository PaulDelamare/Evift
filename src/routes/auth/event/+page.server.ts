import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('accessToken', { path: '/' });

		return {
			status: 200
		};
	}
};
