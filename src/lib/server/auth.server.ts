import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { PostUser, User } from '../models/user.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class AuthApi extends Api {

	private authUrl = `${env.API_URL}api/auth/`;

	/**
	 * Registers a new user.
	 * @param user - The user data to register.
	 * @returns A promise resolving to the API response.
	 */
	register = async (
		user: PostUser
	): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(user)
			});

			return response.json();
		} catch (error) {
			catchErrorRequest(error, 'AuthApi.register');
			throw error;
		}
	};

	/**
	 * Logs in a user with the provided email and password.
	 * @param email - The user's email address.
	 * @param password - The user's password.
	 * @returns A promise resolving to the API response containing the user and access token.
	 */
	login = async (
		email: string,
		password: string
	): Promise<ApiResponse<{ user: User; accessToken: string }>> => {
		try {
			const response = await this.fetch(`${this.authUrl}login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ email, password })
			});

			return await response.json();

		} catch (error) {
			catchErrorRequest(error, 'AuthApi.login');
			throw error;
		}
	};

	/**
	 * Retrieves information about the currently authenticated user.
	 * @returns A promise resolving to an ApiResponse containing the user data.
	 */
	getInfo = async (): Promise<ApiResponse<User>> => {
		try {
			const response = await this.fetch(`${this.authUrl}me`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});

			const status = response.status;

			if (response.ok) {
				const data: User = await response.json();
				return { status, data, message: 'Success' };
			}

			const message =
				status === 401
					? 'Unauthorized'
					: (await response.text().catch(() => 'Error')) || 'Error';

			return { status, message } as ApiResponse<User>;
		} catch (error) {
			catchErrorRequest(error, 'AuthApi.getInfo');
			throw error;
		}
	};


	/**
	 * Sends a password reset email to the specified address.
	 * @param email - The user's email address.
	 * @returns A promise resolving to true if the email was sent successfully, otherwise false.
	 */
	forgotPassword = async (email: string): Promise<boolean> => {
		try {
			const response = await this.fetch(`${this.authUrl}password/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});
			return response.ok;
		} catch (error) {
			catchErrorRequest(error, 'AuthApi.forgotPassword');
			return false;
		}
	};

	/**
	 * Resets the user's password using the provided token and credentials.
	 * @param token - The password reset token.
	 * @param email - The user's email address.
	 * @param password - The new password.
	 * @param confirmPassword - Confirmation of the new password.
	 * @returns A promise resolving to true if the password was reset successfully, otherwise false.
	 */
	resetPassword = async (
		token: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<boolean> => {
		try {
			const response = await this.fetch(
				`${this.authUrl}password/reset`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token, email, password, confirmPassword })
				}
			);
			return response.ok;
		} catch (error) {
			catchErrorRequest(error, 'AuthApi.resetPassword');
			return false;
		}
	};
}
