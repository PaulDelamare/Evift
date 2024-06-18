import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({cookies}) => {
    cookies.delete('accessToken', { path: '/' });
    redirect(303, '/evift/login');
}) satisfies PageServerLoad;