import EventApi from '$lib/server/event.server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { API_URL } from '$env/static/private';
import RoleApi from '$lib/server/role.server';

export const load = (async ({ params, fetch, locals }) => {
    const id_event = params.id_event;

    const api = new EventApi(fetch);
    const event = await api.getOneEvent(id_event);
    const participants = await api.getParticipants(id_event);

    const apiRole = new RoleApi(fetch);
    const roles = await apiRole.getRoles();

    const imgUrl = API_URL;

    if (event.status !== 200) {
        throw error(401, 'Vous n\'êtes pas autorisé à accéder à cet événement');
    }

    const user = locals.user;

    return {
        event: event.data,
        imgUrl,
        participants,
        roles,
        roleUser: { role: event.data.roleRef, user }
    }
}) satisfies LayoutServerLoad;