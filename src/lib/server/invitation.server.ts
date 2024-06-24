import { API_URL } from '$env/static/private';
import { Api } from './api.server';
import type { GetCountFriendInvitation } from '$lib/models/invitation.model';

export default class InvitationApi extends Api<GetCountFriendInvitation> {
    // Base url request for auth methods
    private authUrl = `${API_URL}api/invitation/`;

    /**
     * Retrieves the count of friend invitations from the server.
     *
     * @return {Promise<number>} A promise that resolves to the count of friend invitations.
     * @throws {Error} If there is an error retrieving the count of friend invitations.
     */
    getCountFriendInvitation = async (): Promise<number> => {
        // - Try Validation
        try {
            // Login request
            const response = await this.fetch(`${this.authUrl}count`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // Get data
            const data: GetCountFriendInvitation = await response.json();

            // Return data
            return data.data;
        }
        // - Catch Errors
        catch (error) {
            throw new Error('Error login : ' + error);
        }
    };
}
