import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {
    const id_list = params.id_list;
    const list = (await parent()).lists;

    const gifts = list.data.find((gift) => gift.id === id_list);

    if (!gifts) {
        throw error(404, 'Aucun contenu trouvé');
    }

    return {
        gifts
    };
}) satisfies PageServerLoad;