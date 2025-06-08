// ! IMPORTS
import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { DataUser, User } from '$lib/models/user.model';

// ! Class
export default class UserApi extends Api {
	private authUrl = `${env.API_URL}api/user/`;

	/**
	 * Get user by email
	 *
	 * @return {Promise<number>} A promise that resolves to the count of friend invitations.
	 * @throws {Error} If there is an error retrieving the count of friend invitations.
	 */
	getUserByEmail = async (email: string): Promise<User> => {
		try {
			const response = await this.fetch(`${this.authUrl}findUser/${email}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: DataUser = await response.json();
			return data.data;

		} catch (error) {

			throw new Error('Error Get Count : ' + error);
		}
	};
}
