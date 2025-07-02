import EventApi from '$lib/server/event.server';
import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import RoleApi from '$lib/server/role.server';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';

export const load = (async ({ params, fetch, locals }) => {
	const id_event = params.id_event;

	const api = new EventApi(fetch);
	const event = await executeOrThrow(api.getOneEvent(id_event));

	const participants = await executeOrThrow(api.getParticipants(id_event));

	const apiRole = new RoleApi(fetch);
	const roles = await executeOrThrow(apiRole.getRoles());

	const imgUrl = env.API_URL;

	const user = locals.user;

	return {
		event: event.data,
		imgUrl,
		participants: participants.data,
		roles: roles.data,
		roleUser: { role: event.data.roleRef, user }
	};
}) satisfies LayoutServerLoad;
