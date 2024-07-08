import { API_URL } from '$env/static/private';
import { Api } from './api.server';
import type { DataRole, Role } from '$lib/models/role.model';

export default class RoleApi extends Api<DataRole> {
	// Base url request for auth methods
	private authUrl = `${API_URL}api/rolesEvent/`;

     getRoles = async (): Promise<Role[]> => {
          // - Try Validation
          try {
               // Accept or refuse Invitation
               const response = await this.fetch(`${this.authUrl}findAll`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include'
               });

               // Get data
               const data: DataRole | { status: number; error: string } = await response.json();

               if ('error' in data) {
                    throw new Error(data.error);
               }

               // Return data
               return data.data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error in Event Invitation : ' + error);
          }
     }
}
