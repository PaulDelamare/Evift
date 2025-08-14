import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals, parent, cookies }) => {
	const eventId = params.id_event;
	const user = locals.user;
	const event = (await parent()).event;

	const token = cookies.get('accessToken');
	const urlWs = env.URL_WS;

	return {
		eventId,
		user,
		event,
		token,
		urlWs
	};
}) satisfies PageServerLoad;
