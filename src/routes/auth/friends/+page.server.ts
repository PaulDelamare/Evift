import FriendsApi from '$lib/server/friends.server';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {

    const api = new FriendsApi(fetch);
    const friends = await api.getFriends();

    return {
        friends
    };
}) satisfies PageServerLoad;