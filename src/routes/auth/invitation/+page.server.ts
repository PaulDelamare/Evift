import InvitationApi from '$lib/server/invitation.server';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import { convertStringToBoolean } from '$lib/functions/utils/transformStringToBoolean';


export const load = (async ({ fetch }) => {
    // Instance Invitation Api
    const notifApi = new InvitationApi(fetch);
    // Get Notification number
    const invitations = await notifApi.getInvitations();

    return {
        invitations: invitations.data
    };
}) satisfies PageServerLoad;

const schema = yup.object().shape({
    invitationId: yup.string().uuid().required(),
    accept: yup.boolean().required()
});

// Errors model
interface Errors {
    error?: string;
}

export const actions: Actions = {

    invitation: async ({ request, fetch }) => {
        // Get form data
        const data = await request.formData();

        // Get form data values
        const invitationId = data.get('invitationId') as string;
        let accept = data.get('accept') as string | boolean;
        const errors: Errors = {};

        try {
            // Validation register
            await schema.validate(
                { invitationId, accept },
                { abortEarly: false }
            );
        } catch (error) {
            // - Catch Errors
            // If Error in ValidationError
            if (error instanceof yup.ValidationError) {
                // Check what error it is adn return this in errors instance
                error.inner.forEach((err) => {
                    if (err.path === 'invitationId') {
                        errors.error = err.message;
                    }

                    if (err.path === 'accept') {
                        errors.error = err.message;
                    }
                });

                // Return errors
                return { status: 400, errors };
            } else {
                // Else Throw custom Error
                return { status: 400, errors: 'Une erreur est survenue' };
            }
        }

        accept = convertStringToBoolean(accept as string);

        // Create user in api
        const api = new InvitationApi(fetch);
        // Do register
        const res = await api.responseInvitation(invitationId, accept);

        // if an error occurs
        if ('error' in res) {
            // Return error
            errors.error = res?.error;
            return { status: 400, errors };
        }
        // Else return success
        return {
            success: true,
            idRemove: invitationId,
            accept: accept
        };
    }
}