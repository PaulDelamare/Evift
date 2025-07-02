import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { Friends } from '$lib/models/friends.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class FriendsApi extends Api {

	private authUrl = `${env.API_URL}api/friends/`;

	getFriends = async (): Promise<ApiResponse<Friends[]>> => {
		try {

			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: ApiResponse<Friends[]> = await response.json();
			return data;

		} catch (error) {
			catchErrorRequest(error, 'FriendsApi.getFriends');
			throw error;
		}
	};
}
