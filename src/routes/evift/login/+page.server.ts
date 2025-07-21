// ! IMPORTS
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import AuthApi from '$lib/server/auth.server';
import CaptchaApi from '$lib/server/recaptcha.server';
import { env } from '$env/dynamic/private';
import { loginSchema, registerSchema } from '$lib/validationSchema/auth.schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const captchaKey = env.CAPTCHA_KEY;

	const formLogin = await superValidate(zod(loginSchema));
	const formRegister = await superValidate(zod(registerSchema));

	return {
		captchaKey,
		formLogin,
		formRegister
	};
}) satisfies PageServerLoad;


/**
 * SvelteKit form actions for login, registration, and logout.
 */
export const actions: Actions = {
	/**
	 * Handles user registration.
	 * Validates the form, checks captcha, and registers the user via AuthApi.
	 * @param event - The request event from SvelteKit.
	 * @returns The form state with success or error messages.
	 */
	register: async (event) => {

		const form = await superValidate(event.request, zod(registerSchema));

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

		const api = new AuthApi(event.fetch);
		const res = await api.register(
			form.data.firstname,
			form.data.lastname,
			form.data.email,
			form.data.password
		);

		if ('error' in res) {
			return message(form, {
				error: res.error.error
			});
		}

		return message(form, {
			success: true,
			message: res.message
		});
	},

	/**
	 * Handles user login.
	 * Validates the form, checks captcha, and logs in the user via AuthApi.
	 * Sets the user and access token cookie on success.
	 * @param event - The request event from SvelteKit.
	 * @returns The form state with success or error messages, or redirects on success.
	 */
	login: async (event) => {

		const form = await superValidate(event.request, zod(loginSchema));

		if (!form.valid) {
			return message(form, {
				errors: form.errors
			});
		}

		const captchaApi = new CaptchaApi(event.fetch);
		const resCaptcha = await captchaApi.captcha(form.data.secret);

		if (!resCaptcha.success || resCaptcha.score < 0.4) {
			return message(form, {
				error: "Une erreur s'est produite lors de la connexion"
			});
		}

		const api = new AuthApi(event.fetch);
		const res = await api.login(form.data.email, form.data.password);

		if ('error' in res) {
			return message(form, {
				error: res.error.error
			});
		}

		const user = res?.data?.user;
		const token = res?.data?.accessToken;

		if (token) {
			event.locals.user = user;
			event.cookies.set('accessToken', token, {
				path: '/',
				httpOnly: true,
				maxAge: 5 * 60 * 60
			});
			throw redirect(303, '/auth/event');
		}

		return message(form, {
			error: "Erreur inconnue lors de la connexion."
		});
	},

	/**
	 * Logs out the user by deleting the access token cookie and clearing the user from locals.
	 * @param context - The event context containing locals and cookies.
	 */
	logout: async ({ locals, cookies }) => {
		locals.user = undefined;
		cookies.delete('accessToken', { path: '/' });
	}
};
