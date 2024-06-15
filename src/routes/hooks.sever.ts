import { API_URL } from "$env/static/private";
import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch = (async ({ event, request, fetch }) => {
	if (request.url.startsWith(API_URL)) {
		const jwt = event.cookies.get('access_token');
		if (jwt) {
			request.headers.set('Authorization', `Bearer ${jwt}`);
		}
	}
	return fetch(request);
}) satisfies HandleFetch;