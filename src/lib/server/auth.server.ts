import { env } from '$env/dynamic/private';


import type { ErrorApi } from '../models/error.model';
import { Api } from './api.server';
import type { LoginResponse, PostUser, User } from '../models/user.model';

export default class AuthApi extends Api {

	private authUrl = `${env.API_URL}api/auth/`;

	register = async (
		user: PostUser
	): Promise<{ status: number; message?: string; error?: string }> => {

		try {

			const response = await this.fetch(`${this.authUrl}register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(user)
			});

			const data: { status: number; message?: string; error?: string } = await response.json();

			return data;
		} catch (error) {

			throw new Error('Error register : ' + error);
		}
	};

	login = async (email: string, password: string): Promise<LoginResponse | ErrorApi> => {
		try {

			const response = await this.fetch(`${this.authUrl}login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ email, password })
			});

			const data: LoginResponse | ErrorApi = await response.json();
			return data;

		} catch (error) {

			throw new Error('Error login : ' + error);
		}
	};

	getInfo = async (): Promise<User | ErrorApi> => {
		// - Try Validation
		try {
			const response = await this.fetch(`${this.authUrl}me`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});

			if (response.status === 401) {
				return { status: 401, error: 'Unauthorized' };
			}

			if (response.status === 200) {
				const data: User = await response.json();
				return data;
			}

			return { status: 500, error: 'Error' };
		} catch (error) {

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
			const response = await this.fetch(`${env.API_URL}auth/password/email`, {
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
			const response = await this.fetch(`${env.API_URL}auth/password/reset`, {
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
