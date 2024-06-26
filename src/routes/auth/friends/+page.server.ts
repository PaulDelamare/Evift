// ! IMPORTS
import FriendsApi from '$lib/server/friends.server';
import type { PageServerLoad } from './$types';

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
