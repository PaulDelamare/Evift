import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { Role } from '$lib/models/role.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class RoleApi extends Api {

	private authUrl = `${env.API_URL}api/rolesEvent/`;

	/**
	 * Retrieves all roles from the server.
	 *
	 * Sends a GET request to the `${this.authUrl}findAll` endpoint to fetch all available roles.
	 * The request includes credentials and expects a JSON response.
	 *
	 * @returns A promise that resolves to an {@link ApiResponse} containing an array of {@link Role} objects.
	 * @throws Rethrows any error encountered during the request after logging it with {@link catchErrorRequest}.
	 */
	getRoles = async (): Promise<ApiResponse<Role[]>> => {

		try {
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: ApiResponse<Role[]> = await response.json();
			return data;

		} catch (error) {

			catchErrorRequest(error, 'RoleApi.getRoles');
			throw error;
		}
	};
}
