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

	/**
	 * Deletes a friend by their unique identifier.
	 *
	 * Sends a DELETE request to the server to remove the friend with the specified ID.
	 * Handles errors by logging them and rethrowing for upstream handling.
	 *
	 * @param id - The unique identifier of the friend to delete.
	 * @returns A promise that resolves to an {@link ApiResponse} containing the server's response.
	 * @throws Will rethrow any errors encountered during the request.
	 */
	async deleteFriend(id: string): Promise<ApiResponse> {
		try {
			const response = await this.fetch(`${this.authUrl}delete/${id}`, {
				method: 'DELETE',

				credentials: 'include'
			});


			return await response.json();
		} catch (error) {
			catchErrorRequest(error, 'FriendsApi.deleteFriends');
			throw error;
		}
	}
}
