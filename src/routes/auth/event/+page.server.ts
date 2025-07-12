import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import { env } from '$env/dynamic/private';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';

export const load = (async ({ fetch }) => {

	const api = new EventApi(fetch);
	const allEvent = await executeOrThrow(api.getEvent());

	const imgUrl = env.API_URL;

	return {
		allEvent: allEvent.data,
		imgUrl
	};
}) satisfies PageServerLoad;

export const actions: Actions = {};
