// ! IMPORTS
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as yup from 'yup';
import AuthApi from '$lib/server/auth.server';
import CaptchaApi from '$lib/server/recaptcha.server';

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
	return {};
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
		// Get form data
		const data = await request.formData();

		// Get form data values
		const firstname = data.get('firstName') as string;
		const lastname = data.get('name') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirmation') as string;

		// Get Capctcha secret for check
		const captcha = data.get('secret') as string;

		// Instance errors
		const errors: Errors = {};

		// Do Request for valide capctha
		const captchaApi = new CaptchaApi(fetch);
		const resCaptcha = await captchaApi.captcha(captcha);

		// If score is under 0.4 or not success
		if (resCaptcha.score < 0.4 || !resCaptcha.success) {
			// Return error for safety
			errors.error = "Une erreur c'est produite lors de la connexion";
			return { status: 400, errors };
		}

		// - Try Validation
		try {
			// Validation register
			await registerSchema.validate(
				{ firstname, lastname, email, password, passwordConfirm },
				{ abortEarly: false }
			);
		} catch (error) {
			// - Catch Errors
			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is adn return this in errors instance
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

				// Return errors
				return { status: 400, errors };
			} else {
				// Else Throw custom Error
				return { status: 400, error: 'Une erreur est survenue' };
			}
		}

		// If Password not same
		if (password !== passwordConfirm) {
			// Add errors
			errors.passwordConfirmRegister = 'Les mots de passe ne sont pas identiques';
		}

		// If there are errors
		if (Object.keys(errors).length > 0) {
			// Return errors
			return { status: 400, errors };
		}

		// Define user object
		const user = {
			firstname,
			lastname,
			email,
			password
		};

		// Create user in api
		const api = new AuthApi(fetch);
		// Do register
		const res = await api.register(user);

		// if an error occurs
		if ('error' in res) {
			// Return error
			errors.error = res?.error;
			return { status: 400, errors };
		}

		// Else return success
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
		// Get form data
		const data = await request.formData();

		// Get information from form
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		// Get Capctha secret for check
		const captcha = data.get('secret') as string;

		// Instance errors
		const errors: Errors = {};

		// Do Request for valide capctha
		const captchaApi = new CaptchaApi(fetch);
		const resCaptcha = await captchaApi.captcha(captcha);

		// If score is under 0.4 or not success
		if (resCaptcha.score < 0.4 || !resCaptcha.success) {
			// Return error for safety
			errors.error = "Une erreur c'est produite lors de la connexion";
			return { status: 400, errors };
		}

		// - Try Validation
		try {
			// Validation register
			await loginSchema.validate({ email, password }, { abortEarly: false });

		}
		// - Catch Errors
		catch (error) {

			// If Error in ValidationError
			if (error instanceof yup.ValidationError) {
				// Check what error it is adn return this in errors instance
				error.inner.forEach((err) => {
					if (err.path === 'email') {
						errors.emailLogin = err.message;
					}

					if (err.path === 'password') {
						errors.passwordLogin = err.message;
					}
				});

				// Return errors
				return { status: 400, errors };
			} else {

				// Else Throw custom Error
				return { status: 400, error: 'Une erreur est survenue' };
			}
		}

		// Define user object
		const api = new AuthApi(fetch);
		const res = await api.login(email, password);

		// if an error occurs
		if ('error' in res) {
			// Return error
			errors.error = res?.error;
			return { status: 400, errors };
		}

		// Else return success
		const user = res?.data?.user;
		// Get access token
		const token = res?.data?.accessToken;

		// If token
		if (token) {
			// Set user and token
			locals.user = user;
			// Set cookie
			cookies.set('accessToken', token, { path: '/', httpOnly: true, maxAge: 5 * 60 * 60 });
			// Redirect to event page
			redirect(302, '/auth/event');
		}
	},

	logout: async ({ locals, cookies }) => {
		locals.user = undefined;
		cookies.delete('accessToken', { path: '/' });
	}
};
