import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { responseForgotPasswordSchema } from '$lib/validationSchema/forgotPassword.schema';
import type { Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import ForgotPasswordApi from '$lib/server/forgotPassword.server';

export const load = (async () => {
    const captchaKey = env.CAPTCHA_KEY;

    const form = await superValidate(zod(responseForgotPasswordSchema));

    return {
        form,
        captchaKey
    };

}) satisfies PageServerLoad;

export const actions: Actions = {
    forgotPassword: async (event) => {
        const formData = await event.request.formData();
        const form = await superValidate(formData, zod(responseForgotPasswordSchema));

        if (!form.valid) {
            return message(form, {
                error: 'Formulaire invalide, veuillez vérifier les champs.'
            });
        }

        const forgotPasswordApi = new ForgotPasswordApi(event.fetch);
        const res = await forgotPasswordApi.generatePasswordReset(form.data.email);

        if ('error' in res) {
            return message(form, {
                error: res.error.error ?? 'Une erreur est survenue lors de la réinitialisation du mot de passe.'
            });
        }

        return message(form, {
            success: true,
            message: "Un e-mail de réinitialisation a été envoyé."
        });
    }
}