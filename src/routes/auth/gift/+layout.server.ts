import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import GiftApi from '$lib/server/gift.server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {

	const api = new GiftApi(fetch);
	const lists = await executeOrThrow(api.findAll())

	return {
		lists
	};
}) satisfies LayoutServerLoad;
