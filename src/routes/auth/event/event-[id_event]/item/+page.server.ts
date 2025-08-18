import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, message } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import BringItemApi from '$lib/server/bringItem.server';
import { bringItemSchema, deleteSchema, releaseSchema, takeSchema } from '$lib/validationSchema/bringItem.schema';

export const load: PageServerLoad = async (event) => {
    const id_event = event.params.id_event;

    const api = new BringItemApi(event.fetch);
    const itemsEvent = await executeOrThrow(api.listForEvent(id_event));

    const formAddItem = await superValidate(zod(bringItemSchema));
    const formTakeItem = await superValidate(zod(takeSchema));
    const formReleaseItem = await superValidate(zod(releaseSchema));
    const formDeleteItem = await superValidate(zod(deleteSchema))

    return {
        itemsEvent: itemsEvent.data,
        formAddItem,
        formTakeItem,
        formReleaseItem,
        formDeleteItem
    };
};

/**
 * Defines server-side actions for managing event items in the authentication event route.
 *
 * @remarks
 * Each action handles a specific form submission, validates the input using Zod schemas,
 * interacts with the BringItemApi to perform CRUD operations, and returns a message
 * indicating success or error.
 *
 * @property create - Handles the creation of a new item. Validates the form and adds the item via API.
 * @property take - Handles taking an item. Validates the form and updates the item quantity via API.
 * @property release - Handles releasing (cancelling the take) of an item. Validates the form and updates via API.
 * @property delete - Handles deletion of an item. Validates the form and removes the item via API.
 */
export const actions: Actions = {

    /**
     * Handles the creation of a new item.
     * Validates the form and adds the item via API.
     */
    create: async (event) => {

        const form = await superValidate(event, zod(bringItemSchema));
        if (!form.valid) {
            return message(form, { error: 'Le formulaire est invalide' });
        }

        const api = new BringItemApi(event.fetch);
        const res = await api.create(form.data);

        if ('error' in res) {
            return message(form, { error: res.error.error ?? 'Une erreur est survenue lors de l’ajout' });
        }

        return message(form, { success: true, message: 'Produit ajouté avec succès' });
    },

    /**
     * Handles taking an item.
     * Validates the form and marks the item as taken via API.
     */
    take: async (event) => {
        const form = await superValidate(event, zod(takeSchema));

        if (!form.valid) {
            return message(form, { error: 'Le formulaire de prise est invalide' });
        }

        const { id, quantity } = form.data;

        const api = new BringItemApi(event.fetch);
        const res = await api.take(id, quantity);

        if ('error' in res) {
            return message(form, { error: res.error.error ?? 'Erreur lors de la prise du produit' });
        }

        return message(form, { success: true, message: 'Produit pris avec succès' });
    },

    /**
     * Handles releasing a previously taken item.
     * Validates the form and calls the API to release the item.
     */
    release: async (event) => {

        const form = await superValidate(event, zod(releaseSchema));

        if (!form.valid) {
            return message(form, { error: 'Le formulaire d’annulation est invalide' });
        }

        const { id } = form.data;
        const api = new BringItemApi(event.fetch);
        const res = await api.release(id);

        if ('error' in res) {
            return message(form, { error: res.error.error ?? 'Erreur lors de l’annulation de la prise' });
        }

        return message(form, { success: true, message: 'Prise annulée avec succès' });
    },

    /**
     * Handles deletion of an item.
     * Validates the form and calls the API to remove the item.
     */
    delete: async (event) => {
        const form = await superValidate(event.request, zod(deleteSchema));

        if (!form.valid) {
            return JSON.stringify({
                error: 'Formulaire invalide, veuillez vérifier les champs.'
            });
        }

        const { id } = form.data;

        const api = new BringItemApi(event.fetch);
        const res = await api.deleteItem(id);

        if ("error" in res) {
            return {
                error: res.error ? res.error.error : 'Unknown error occurred'
            };
        }

        return JSON.stringify({
            status: 200,
            success: true
        });
    }
};
