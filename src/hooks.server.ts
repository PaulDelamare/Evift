// ! IMPORTS
import { env } from '$env/dynamic/private';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import AuthApi from '$lib/server/auth.server';
import InvitationApi from '$lib/server/invitation.server';
import type { Handle, HandleFetch } from '@sveltejs/kit';

// ! HANDLE
/**
 * Handles the request by checking if the user is authenticated and retrieving user information from the API.
 *
 * @param event - The event object containing information about the request.
 * @param resolve - The resolve function to continue processing the request.
 * @return The response from resolving the request.
 */
export const handle = (async ({ event, resolve }) => {

	const jwt = event.cookies.get('accessToken');
	if (!jwt) return await resolve(event);

	if (event.locals.user) {

		return await resolve(event);
	}

	const api = new AuthApi(event.fetch);
	const userInfo = await api.getInfo();

	if ('error' in userInfo || !(userInfo.status === 200 || userInfo.status === 201 || userInfo.status === 204)) {

		event.cookies.delete('accessToken', { path: '/' });
		event.locals.user = undefined;

	} else {
		const notifApi = new InvitationApi(event.fetch);
		const notifications = (await executeOrThrow(notifApi.getCountFriendInvitation())).data;
		event.locals.notificationFriends = notifications.countFriendsInvitation;
		event.locals.notificationEvents = notifications.countEventInvitation;
		event.locals.user = userInfo.data;
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;

// ! HANDLE FETCH
/**
 * Handles the fetch request by setting the 'x-api-key' header if the request URL starts with the API_URL.
 *
 * @param options - The options object containing the request and fetch functions.
 * @param options.request - The request object.
 * @param options.fetch - The fetch function.
 * @return  The response from the fetch request.
 */
export const handleFetch = (async ({ request, fetch }) => {
	if (request.url.startsWith(env.API_URL)) {
		request.headers.set('x-api-key', env.API_KEY);
	}

	return fetch(request);
}) satisfies HandleFetch;
