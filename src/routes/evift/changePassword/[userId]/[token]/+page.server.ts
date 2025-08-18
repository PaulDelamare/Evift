import ForgotPasswordApi from '$lib/server/forgotPassword.server';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { changePasswordSchema } from '$lib/validationSchema/forgotPassword.schema';

let userId: string;
let token: string;

export const load = (async (event) => {

    ({ userId, token } = event.params);

    const apiForgotPassword = new ForgotPasswordApi(event.fetch);
    const checkUserRequest = await apiForgotPassword.checkUserRequest(token, userId);

    if ("error" in checkUserRequest) {

        throw error(400, 'Invalid token or user ID');
    }

    const captchaKey = env.CAPTCHA_KEY;

    const form = await superValidate(zod(changePasswordSchema));

    return {
        captchaKey,
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    changePassword: async ({ request, fetch }) => {

        const formData = await request.formData();
        formData.append('userId', userId);
        formData.append('token', token);

        const form = await superValidate(formData, zod(changePasswordSchema));

        if (!form.valid) {
            return { form };
        }

        const apiForgotPassword = new ForgotPasswordApi(fetch);
        const changePasswordRequest = await apiForgotPassword.changePassword(form.data);

        if ("error" in changePasswordRequest) {
            return message(form, { error: changePasswordRequest.error.error ?? "Unknown error" });
        }

        return message(form, { success: true, message: 'Mot de passe changé avec succès!' });
    }
}