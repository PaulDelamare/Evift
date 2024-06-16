import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import AuthApi from '$lib/server/auth.server';
import CaptchaApi from '$lib/server/recaptcha.server';

const loginSchema = yup.object().shape({
	email: yup.string().email('Email invalide').required('Email requis*'),
	password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères*').required('Mot de passe requis*').matches(
		/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
		"Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*"
	)
});

const registerSchema = yup.object().shape({
	firstname: yup.string().min(2, 'Le prénom doit contenir au moins 2 caractères*').max(50, 'Le prénom doit contenir au maximum 50 caractères*').required('Prénom requis*'),
	lastname: yup.string().min(2, 'Le nom doit contenir au moins 2 caractères*').max(50, 'Le nom doit contenir au maximum 50 caractères*').required('Nom requis*'),
	email: yup.string().email('Email invalide*').required('Email requis*'),
	password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères*').required('Mot de passe requis*').matches(
		/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
		"Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*"
	),
	passwordConfirm: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères*').required('Confirmation du mot de passe requis*')
});

interface Errors {
	firstname?: string;
	lastname?: string;
	emailRegister?: string;
	passwordRegister?: string;
	passwordConfirmRegister?: string;
	emailLogin?: string;
	passwordLogin?: string;
	error?: string;
}


export const load = (async () => {

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async ({ request, fetch }) => {
		const data = await request.formData();

		const firstname = data.get('firstName') as string;
		const lastname = data.get('name') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirmation') as string;
		const captcha = data.get('secret') as string;

		const errors: Errors = {};

		const captchaApi = new CaptchaApi(fetch);
		const resCaptcha = await captchaApi.captcha(captcha);

		if (resCaptcha.score < 0.4 || !resCaptcha.success) {
			errors.error = 'Une erreur c\'est produite lors de la connexion';
			return { status: 400, errors };
		}

		try {
			await registerSchema.validate({ firstname, lastname, email, password, passwordConfirm }, { abortEarly: false });
			// Les données sont valides, vous pouvez continuer le traitement ici
		} catch (error) {

			if (error instanceof yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path === 'firstname') {
						errors.firstname = err.message;
					}

					if (err.path === 'lastname') {
						errors.lastname = err.message;
					}

					if (err.path === 'email') {
						errors.emailRegister = err.message;
					}

					if (err.path === 'password') {
						errors.passwordRegister = err.message;
					}

					if (err.path === 'passwordConfirm') {
						errors.passwordConfirmRegister = err.message;
					}
				});

				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, error: "Une erreur est survenue" };
			}
		}

		if (password !== passwordConfirm) {
			errors.passwordConfirmRegister = 'Les mots de passe ne sont pas identiques';
		}

		if (Object.keys(errors).length > 0) {

			return { status: 400, errors };
		}

		const user = {
			firstname,
			lastname,
			email,
			password
		};

		const api = new AuthApi(fetch);
		const res = await api.register(user);
		console.log(res);

		if ('error' in res) {
			errors.error = res?.error;
			return { status: 400, errors };
		}

		return {
			success: true
		};
	},
	login: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const captcha = data.get('secret') as string;
		
		const errors: Errors = {};

		const captchaApi = new CaptchaApi(fetch);
		const resCaptcha = await captchaApi.captcha(captcha);

		if (resCaptcha.score < 0.4 || !resCaptcha.success) {
			errors.error = 'Une erreur c\'est produite lors de la connexion';
			return { status: 400, errors };
		}
		
		try {
			await loginSchema.validate({ email, password }, { abortEarly: false });
			// Les données sont valides, vous pouvez continuer le traitement ici
		} catch (error) {

			if (error instanceof yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path === 'email') {
						errors.emailLogin = err.message;
					}

					if (err.path === 'password') {
						errors.passwordLogin = err.message;
					}
				});

				// Renvoyer les erreurs spécifiques pour chaque champ
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, error: "Une erreur est survenue" };
			}
		}

		const api = new AuthApi(fetch);
		const res = await api.login(email, password);



		if ('error' in res) {
			errors.error = res?.error;
			return { status: 400, errors };
		}

		const user = res?.data?.user;
		const token = res?.data?.accessToken;

		console.log(user, token);

		if (token) {

			locals.user = user;
			cookies.set('accessToken', token, { path: '/', httpOnly: true, maxAge: 5 * 60 * 60 });
			redirect(302, '/event');
		}
	}
};
