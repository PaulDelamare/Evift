import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(303, '/evift/login');
	}

	console.log(locals.user)
	return {
		user : locals.user
	};
	return {};
}) satisfies LayoutServerLoad;
