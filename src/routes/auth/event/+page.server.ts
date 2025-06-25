import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch }) => {

	const api = new EventApi(fetch);
	const allEvent = await api.getEvent();
	

	const imgUrl = env.API_URL;

	return {
		allEvent,
		imgUrl
	};
}) satisfies PageServerLoad;

export const actions: Actions = {};
