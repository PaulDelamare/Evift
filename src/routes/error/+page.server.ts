import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
    const status = url.searchParams.get('status');
    const message = url.searchParams.get('message');
    return { status, message };
}) satisfies PageServerLoad;