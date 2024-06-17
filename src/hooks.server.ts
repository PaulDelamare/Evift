// ! IMPORTS
import { API_KEY, API_URL } from '$env/static/private';
import AuthApi from '$lib/server/auth.server';
import type { HandleFetch } from '@sveltejs/kit';

// ! HANDLE
/**
 * Handles the request by checking if the user is authenticated and retrieving user information from the API.
 *
 * @param event - The event object containing information about the request.
 * @param resolve - The resolve function to continue processing the request.
 * @return The response from resolving the request.
 */
export async function handle({ event, resolve }) {

     // Delete token for logout
     event.cookies.delete('accessToken', { path: '/' });

     // Get token
     const jwt = event.cookies.get('accessToken');

     // If no token, continue resolve
     if (!jwt) return await resolve(event);

     // If jwt and user information
     if (event.locals.user) {
          return await resolve(event);
     }

     // If jwt and not user information
     // Get user information in api
     const api = new AuthApi(event.fetch);
     const userInfo = await api.getInfo();

     // If error in request
     if ('error' in userInfo) {
          // Delete token
          event.cookies.delete('accessToken', { path: '/' });
          // Delete user information
          event.locals.user = null;
     } else {
          // Else set user information
          event.locals.user = userInfo;
     }

     // Continue resolve
     const response = await resolve(event);
     return response;
}

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

     // If the request URL starts with the API_URL
	if (request.url.startsWith(API_URL)) {
          // Set the 'x-api-key' header
          request.headers.set('x-api-key', API_KEY);
	}
     
     // Return the fetch request
	return fetch(request);
}) satisfies HandleFetch;

