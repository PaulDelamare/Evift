import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { DataRole, Role } from '$lib/models/role.model';

export default class RoleApi extends Api {
	private authUrl = `${env.API_URL}api/rolesEvent/`;

	getRoles = async (): Promise<Role[]> => {

		try {
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: DataRole | { status: number; error: string } = await response.json();

			if ('error' in data) {
				throw new Error(data.error);
			}

			return data.data;

		} catch (error) {

			throw new Error('Error in Event Invitation : ' + error);
		}
	};
}
