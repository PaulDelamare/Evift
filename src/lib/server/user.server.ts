import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { User } from '$lib/models/user.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class UserApi extends Api {

	private authUrl = `${env.API_URL}api/user/`;

	/**
	 * Fetches a user by their email address.
	 * @param email - The email address of the user to retrieve.
	 * @returns A promise resolving to an ApiResponse containing the User data.
	 * @throws Will throw an error if the request fails.
	 */
	getUserByEmail = async (email: string): Promise<ApiResponse<User>> => {
		try {
			const response = await this.fetch(
				`${this.authUrl}findUser/${encodeURIComponent(email)}`,
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				}
			);

			return await response.json() as ApiResponse<User>;
		} catch (error) {
			catchErrorRequest(error, 'UserApi.getUserByEmail');
			throw error;
		}
	};

	/**
	 * Marks the user's first login as complete.
	 * Sends a PATCH request to update the user's first login status.
	 * @returns A promise resolving to an ApiResponse indicating the result.
	 * @throws Will throw an error if the request fails.
	 */
	completeFirstLogin = async (): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}firstLogin`, {
				method: 'PATCH',
				credentials: 'include'
			});

			return response.json() as Promise<ApiResponse>;
		} catch (error) {
			catchErrorRequest(error, 'UserApi.completeFirstLogin');
			throw error;
		}
	}
}