import { env } from '$env/dynamic/private';
import { executeOrThrow } from '$lib/functions/utils/execRequest/execRequest';
import RequestAccountApi from '$lib/server/requestAccount.server';
import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerRequestSchema } from '$lib/validationSchema/auth.schema';
import type { Actions } from '@sveltejs/kit';
import CaptchaApi from '$lib/server/recaptcha.server';
let email: string;
let token: string;

export const load = (async (event) => {

    email = event.params.email;
    token = event.params.token;

    const form = await superValidate(zod(registerRequestSchema));

    const api = new RequestAccountApi(event.fetch);
    await executeOrThrow(api.checkRequest(email, token));

    const captchaKey = env.CAPTCHA_KEY;

    return { captchaKey, form, email };
}) satisfies PageServerLoad;

export const actions: Actions = {
    /**
     * Handles user registration.
     * Validates the form, checks captcha, and registers the user via AuthApi.
     * @param event - The request event from SvelteKit.
     * @returns The form state with success or error messages.
     */
    register: async (event) => {

        const formData = await event.request.formData();
        formData.set('email', email);
        formData.set('token', token);

        const form = await superValidate(formData, zod(registerRequestSchema));

        if (!form.valid) {
            return message(form, {
                error: 'Formulaire invalide, veuillez vérifier les champs.'
            });
        }

        const captchaApi = new CaptchaApi(event.fetch);
        const resCaptcha = await captchaApi.captcha(form.data.secret);

        if (!resCaptcha.success || resCaptcha.score < 0.4) {
            return message(form, {
                error: 'Captcha invalide, veuillez réessayer.'
            });
        }

        const api = new RequestAccountApi(event.fetch);
        const res = await api.createRequestAccount({
            email: form.data.email,
            firstname: form.data.firstname,
            lastname: form.data.lastname,
            token: form.data.token,
            password: form.data.password
        });

        if ('error' in res) {
            return message(form, {
                error: res.error.error
            });
        }

        return message(form, {
            success: true,
            message: "Votre compte a été créé avec succès."
        });
    },
}