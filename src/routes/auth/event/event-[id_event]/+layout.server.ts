import EventApi from '$lib/server/event.server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load = (async ({params, fetch}) => {
    const id_event = params.id_event;

    const api = new EventApi(fetch);
    const event = await api.getOneEvent(id_event);

    const imgUrl = API_URL;

    if (event.status !== 200) {
    
        throw error(401, 'Vous n\'êtes pas autorisé à accéder à cet événement');
    }

    return {
        event: event.data,
        imgUrl
    }
}) satisfies LayoutServerLoad;