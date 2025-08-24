import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
    const installed = cookies.get('pwa_installed');

    if (installed === 'true') {
        throw redirect(302, '/evift/login');
    }

    return {};
}) satisfies PageServerLoad;
