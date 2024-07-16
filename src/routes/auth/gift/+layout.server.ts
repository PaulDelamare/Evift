import GiftApi from '$lib/server/gift.server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const api = new GiftApi(fetch);
	const lists = await api.findAll();

	return {
		lists
	};
}) satisfies LayoutServerLoad;
