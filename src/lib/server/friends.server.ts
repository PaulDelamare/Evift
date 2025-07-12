import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { Friends } from '$lib/models/friends.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';
import type { ApiResponse } from '$lib/models/response.model';

export default class FriendsApi extends Api {

	private authUrl = `${env.API_URL}api/friends/`;

	/**
	 * Retrieves the list of friends for the authenticated user.
	 * @returns {Promise<ApiResponse<Friends[]>>} A promise that resolves to the API response containing an array of friends.
	 * @throws Will throw an error if the request fails.
	 */
	async getFriends(): Promise<ApiResponse<Friends[]>> {
		try {
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			return await response.json() as ApiResponse<Friends[]>;
		} catch (error) {
			catchErrorRequest(error, 'FriendsApi.getFriends');
			throw error;
		}
	}
}
