import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const installed = cookies.get('pwa_installed');

    return {
        installed
    };
}) satisfies PageServerLoad;
