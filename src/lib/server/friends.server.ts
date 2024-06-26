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
               // Get Count Invitation
               const response = await this.fetch(`${this.authUrl}findAll`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include'
               });

               // Get data
               const data: GetAllFriends | { error: string ; status: number} = await response.json();

               if ('error' in data) {
                    throw new Error(data.error);
               }

               // Return data
               return data.data;
          }
          // - Catch Errors
          catch (error) {
               throw new Error('Error Get Friends By EMAIL : ' + error);
          }
     };
}
