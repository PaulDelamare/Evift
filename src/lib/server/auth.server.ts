import { API_URL } from '$env/static/private';
import type { ErrorApi } from '../models/error.model';
// import type {  User } from '../models/user.model';
import { Api } from './api.server';
import type { LoginResponse, PostUser, User } from '../models/user.model';

export default class AuthApi extends Api<LoginResponse> {
	// Base url request for auth methods
	private authUrl = `${API_URL}api/auth/`;

	// ? Register methods
	register = async (user: PostUser): Promise<{ status: number; message?: string; error?: string }> => {
		// - Try Validation
		try {
			// Register request
			const response = await this.fetch(`${this.authUrl}register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				// Need to include credentials for have x-api-key in request with hooks
				credentials: 'include',
				// Pass user in body
				body: JSON.stringify(user)
			});
			// Get data
			const data: { status: number; message?: string; error?: string } = await response.json();
			// If error in data
			if ('error' in data) {
				// Throw error
				throw new Error(data.error);
			}
			return data;
		} catch (error) {
			// - Catch Errors
			// Throw error
			throw new Error('Error register : ' + error);
		}
	};

	// ? Login methods
	login = async (email: string, password: string): Promise<LoginResponse | ErrorApi> => {
		// - Try Validation
		try {
			// Login request
			const response = await this.fetch(`${this.authUrl}login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				// Need to include credentials for have x-api-key in request with hooks
				credentials: 'include',
				// Pass user in body
				body: JSON.stringify({ email, password })
			});

			// Get data
			const data: LoginResponse | ErrorApi = await response.json();
			// If error in data
			return data;
		} catch (error) {
			// - Catch Errors
			// Throw error
			throw new Error('Error login : ' + error);
		}
	};

	// Special method, only use for the hooks
	getInfo = async (): Promise<User | ErrorApi> => {
		// - Try Validation
		try {
			// Get user
			const response = await this.fetch(`${this.authUrl}me`, {
				method: 'GET',
				// Need to include credentials for have x-api-key in request with hooks
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
			// If error
			if (response.status === 401) {
				// Throw error
				return { status: 401, error: 'Unauthorized' };
			}
			// If success
			if (response.status === 200) {
				// return data user
				const data: User = await response.json();
				return data;
			}
			return { status: 500, error: 'Error' };
		} catch (error) {
			// - Catch Errors
			// Throw error
			console.error('GetInfo : ' + error);
			return { status: 500, error: 'Error' };
		}
	};

	/**
	 * Send a reset password email
	 * @param email
	 * @returns <boolean> true if the email was sent
	 */
	forgotPassword = async (email: string): Promise<boolean> => {
		try {
			const response = await this.fetch(`${API_URL}auth/password/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});
			return response.status === 200;
		} catch (error) {
			console.error('ForgotPassword : ' + error);
			return false;
		}
	};

	/**
	 * Reset the password, send a email for confirmation
	 * @param token
	 * @param email
	 * @param password
	 * @param confirmPassword
	 * @returns <boolean> true if the password was reset
	 */
	resetPassword = async (
		token: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<boolean> => {
		try {
			const response = await this.fetch(`${API_URL}auth/password/reset`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token, email, password, confirmPassword })
			});
			return response.status === 200;
		} catch (error) {
			console.error('ResetPassword : ' + error);
			return false;
		}
	};
}
