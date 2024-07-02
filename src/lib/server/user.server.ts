// ! IMPORTS
import { API_URL } from '$env/static/private';
import { Api } from './api.server';
import type { GetCountFriendInvitation } from '$lib/models/invitation.model';
import type { DataUser, User } from '$lib/models/user.model';

// ! Class
export default class UserApi extends Api<GetCountFriendInvitation> {
	// Base url request for auth methods
	private authUrl = `${API_URL}api/user/`;

	/**
	 * Get user by email
	 *
	 * @return {Promise<number>} A promise that resolves to the count of friend invitations.
	 * @throws {Error} If there is an error retrieving the count of friend invitations.
	 */
	getUserByEmail = async (email: string): Promise<User> => {
		// - Try Validation
		try {
			// Do request
			const response = await this.fetch(`${this.authUrl}findUser/${email}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get Count Invitation
			const data: DataUser = await response.json();

			// Return data
			return data.data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error Get Count : ' + error);
		}
	};
}
