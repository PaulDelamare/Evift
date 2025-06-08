import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch }) => {
	// Instance Event Api
	const api = new EventApi(fetch);
	// Get all Event
	const allEvent = await api.getEvent();

	// Get image path url
	const imgUrl = env.API_URL;
	return {
		allEvent,
		imgUrl
	};
}) satisfies PageServerLoad;

export const actions: Actions = {};
