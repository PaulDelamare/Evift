import { API_URL } from '$env/static/private';
import { Api } from './api.server';
import type { Friends, GetAllFriends } from '$lib/models/friends.model';

export default class FriendsApi extends Api<GetAllFriends> {
	// Base url request for auth methods
	private authUrl = `${API_URL}api/friends/`;

	/**
	 * Get all User Friends
	 *
	 * @return {Promise<number>} A promise that resolves to the count of friend invitations.
	 * @throws {Error} If there is an error retrieving the count of friend invitations.
	 */
	getFriends = async (): Promise<Friends[]> => {
		// - Try Validation
		try {
			// Do request
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get Friends
			const data: GetAllFriends | { error: string; status: number } = await response.json();

			// If error in data
			if ('error' in data) {
				// Throw error
				throw new Error(data.error);
			}

			// Return data
			return data.data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error Get Friends By EMAIL : ' + error);
		}
	};
}
