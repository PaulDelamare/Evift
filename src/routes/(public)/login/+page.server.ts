import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async () => {
		console.log("register");
        return {};
	},
	login : async () => {
		console.log("login");
		return {};
	}
};
