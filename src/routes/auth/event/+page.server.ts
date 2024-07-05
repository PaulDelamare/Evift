import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import EventApi from '$lib/server/event.server';
import { API_URL } from '$env/static/private';

export const load = (async ({ fetch }) => {
	// Instance EVent Api
	const api = new EventApi(fetch);
	// Get all Event
	const allEvent = await api.getEvent();

	// Get image path url
	const imgUrl = API_URL;
	return {
		allEvent,
		imgUrl
	};
}) satisfies PageServerLoad;

export const actions: Actions = {};
