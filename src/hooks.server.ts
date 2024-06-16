// src/hooks.js

import { API_KEY, API_URL } from '$env/static/private';
import AuthApi from '$lib/server/auth.server';
import type { HandleFetch } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

     event.cookies.delete('accessToken', { path: '/' });
     const jwt = event.cookies.get('accessToken');
     if (!jwt) return await resolve(event);
     if (event.locals.user) {
          return await resolve(event);
     }
     const api = new AuthApi(event.fetch);
     const userInfo = await api.getInfo();
     if ('error' in userInfo) {


          event.cookies.delete('accessToken', { path: '/' });
          event.locals.user = null;
     } else {
          event.locals.user = userInfo;
     }
     const response = await resolve(event);
     return response;
}

export const handleFetch = (async ({ request, fetch }) => {
	if (request.url.startsWith(API_URL)) {
          request.headers.set('x-api-key', API_KEY);
	}
     
	return fetch(request);
}) satisfies HandleFetch;

