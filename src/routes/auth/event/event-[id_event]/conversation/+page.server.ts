import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals, parent }) => {
    const eventId = params.id_event;
    const user = locals.user
    const event = (await parent()).event;

    return {
        eventId,
        user,
        event
    };
}) satisfies PageServerLoad;