import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {

    return {
        user : locals.user,
        notification : locals.notification
    };
}) satisfies LayoutServerLoad;