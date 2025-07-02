// ! IMPORTS
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import AuthApi from '$lib/server/auth.server';
import CaptchaApi from '$lib/server/recaptcha.server';
import { env } from '$env/dynamic/private';

// ! VERIFICATION
// Schema for verification

// Login Validation
const loginSchema = yup.object().shape({
	// Email must be string with email format and required
	email: yup.string().email('Email invalide').required('Email requis*'),
	// Password must be string and required with min length of 8 and must have at least one uppercase letter, one lowercase letter, one number, and one special character
	password: yup
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères*')
		.required('Mot de passe requis*')
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
			'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*'
		)
});

// Register Validation
const registerSchema = yup.object().shape({
	// Firstname must be string and required with min length of 2 and max length of 50
	firstname: yup
		.string()
		.min(2, 'Le prénom doit contenir au moins 2 caractères*')
		.max(50, 'Le prénom doit contenir au maximum 50 caractères*')
		.required('Prénom requis*'),
	// Lastname must be string and required with min length of 2 and max length of 50
	lastname: yup
		.string()
		.min(2, 'Le nom doit contenir au moins 2 caractères*')
		.max(50, 'Le nom doit contenir au maximum 50 caractères*')
		.required('Nom requis*'),
	// Email must be string with email format and required
	email: yup.string().email('Email invalide*').required('Email requis*'),
	// Password must be string and required with min length of 8 and must have at least one uppercase letter, one lowercase letter, one number, and one special character
	password: yup
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères*')
		.required('Mot de passe requis*')
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
			'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial*'
		),
	// Password must be string and required with min length of 8
	passwordConfirm: yup
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères*')
		.required('Confirmation du mot de passe requis*')
});

// Errors model
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

// Data to return on page load
export const load = (async () => {
	const captchaKey = env.CAPTCHA_KEY;

	return {
		captchaKey
	};
}) satisfies PageServerLoad;

// ! ACTIONS
export const actions: Actions = {
	/**
	 * A function to handle user registration.
	 *
	 * @param request - The request object.
	 * @param fetch - The fetch function.
	 * @return Object indicating success or error.
	 */
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
			errors.error = "Une erreur c'est produite lors de la connexion";
			return { status: 400, errors };
		}

		// - Try Validation
		try {
			await registerSchema.validate(
				{ firstname, lastname, email, password, passwordConfirm },
				{ abortEarly: false }
			);
		} catch (error) {
			// - Catch Errors
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
				return { status: 400, error: 'Une erreur est survenue' };
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

		if ('error' in res) {
			errors.error = res?.error.error;
			return { status: 400, errors };
		}

		return {
			success: true
		};
	},

	/**
	 * Asynchronously handles the login process. Validates user input, checks captcha score,
	 * and logs in the user if successful. If any errors occur, returns an object with the
	 * appropriate status code and error messages. If login is successful, sets the user and
	 * access token in the locals and cookies, and redirects to the event page.
	 *
	 * @param options - An object containing the request, fetch, locals, and cookies
	 * @param options.request - The request object containing form data
	 * @param options.fetch - The fetch function for making API requests
	 * @param options.locals - The locals object for storing user data
	 * @param options.cookies - The cookies object for setting access token
	 * @return An object with the appropriate status code and error messages
	 */
	login: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const captcha = data.get('secret') as string;

		const errors: Errors = {};

		const captchaApi = new CaptchaApi(fetch);
		const resCaptcha = await captchaApi.captcha(captcha);

		if (resCaptcha.score < 0.4 || !resCaptcha.success) {
			errors.error = "Une erreur c'est produite lors de la connexion";
			return { status: 400, errors };
		}

		try {
			await loginSchema.validate({ email, password }, { abortEarly: false });
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

				return { status: 400, errors };
			} else {
				return { status: 400, error: 'Une erreur est survenue' };
			}
		}

		const api = new AuthApi(fetch);
		const res = await api.login(email, password);

		if ('error' in res) {
			errors.error = res?.error.error;
			return { status: 400, errors };
		}

		const user = res?.data?.user;
		const token = res?.data?.accessToken;

		if (token) {
			locals.user = user;
			cookies.set('accessToken', token, { path: '/', httpOnly: true, maxAge: 5 * 60 * 60 });
			redirect(302, '/auth/event');
		}
	},

	/**
	 * Logs out the user by deleting the access token cookie and setting the user to undefined.
	 *
	 * @param options - An object containing the locals and cookies objects.
	 * @param options.locals - The locals object.
	 * @param options.cookies - The cookies object.
	 * @return A promise that resolves when the logout process is complete.
	 */
	logout: async ({ locals, cookies }) => {
		// Delete cookie and set user to undefined
		locals.user = undefined;
		cookies.delete('accessToken', { path: '/' });
	}
};
