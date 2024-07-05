import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: locals.user,
		notificationFriends: locals.notificationFriends,
		notificationEvents: locals.notificationEvents
	};
}) satisfies LayoutServerLoad;
