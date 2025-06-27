import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import UserApi from '$lib/server/user.server';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {

    completeFirstLogin: async ({ fetch }) => {

        const apiUser = new UserApi(fetch);
        const res = await apiUser.completeFirstLogin();

        if ("error" in res) {
            return {
                error: res.error.error
            };
        }

        console.log('herrer')
        return {
            firstLogin: true
        }
    }
}