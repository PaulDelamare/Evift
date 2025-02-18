// ! IMPORTS
import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { GetCountFriendInvitation, InvitationData } from '$lib/models/invitation.model';
import type { EventInvitation } from '$lib/models/event.model';

// ! Class
export default class InvitationApi extends Api<GetCountFriendInvitation> {
	// Base url request for auth methods
	private authUrl = `${env.API_URL}api/invitation/`;

	/**
	 * Retrieves the count of friend invitations from the server.
	 *
	 * @return {Promise<number>} A promise that resolves to the count of friend invitations.
	 * @throws {Error} If there is an error retrieving the count of friend invitations.
	 */
	getCountFriendInvitation = async (): Promise<{
		countFriendsInvitation: number;
		countEventInvitation: number;
	}> => {
		// - Try Validation
		try {
			// Do request
			const response = await this.fetch(`${this.authUrl}count`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get Count Invitation
			const data: GetCountFriendInvitation = await response.json();

			// Return data
			return data.data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error Get Count : ' + error);
		}
	};

	/**
	 * Retrieves all invitations for the current user.
	 *
	 * This function makes a GET request to the server to fetch all invitations.
	 * It returns a Promise that resolves to an object of type `GetCountFriendInvitation`.
	 *
	 * @returns {Promise<GetCountFriendInvitation>} A Promise that resolves to the fetched invitations.
	 * @throws {Error} If there's an error during the request, it throws an Error with the error message.
	 */
	getInvitations = async (): Promise<InvitationData> => {
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

			// Get all invitation for this user
			const data: InvitationData = await response.json();

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error Get Invitation : ' + error);
		}
	};

	responseInvitation = async (
		id: string,
		accept: boolean
	): Promise<{ status: number; message?: string; error?: string }> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}accept`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ id, response: accept })
			});

			// Get data
			const data: GetCountFriendInvitation = await response.json();

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error Response Invitation : ' + error);
		}
	};

	sendFriendsInvitation = async (
		id: string
	): Promise<{ status: number; error: string } | { status: number; message: string }> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}request`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ id })
			});

			// Get data
			const data: { status: number; error: string } | { status: number; message: string } =
				await response.json();

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error in Friends Invitation : ' + error);
		}
	};

	eventInvitation = async (
		eventId: string,
		invitationId: string[]
	): Promise<{ status: number; error: string } | { status: number; message: string }> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}requestEvent`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ eventId, invitationId })
			});

			// Get data
			const data: { status: number; error: string } | { status: number; message: string } =
				await response.json();

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error in Event Invitation : ' + error);
		}
	};

	getEventInvitation = async (): Promise<EventInvitation> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}eventInvitation`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get data
			const data: EventInvitation | { status: number; error: string } = await response.json();

			if ('error' in data) {
				throw new Error(data.error);
			}

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error in Event Invitation : ' + error);
		}
	};

	responseEventInvitation = async (
		invitationId: string,
		accept: boolean
	): Promise<{ status: number; message?: string; error?: string }> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}responseEventInvitation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ invitationId, response: accept })
			});

			// Get data
			const data: GetCountFriendInvitation = await response.json();

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error Response Invitation : ' + error);
		}
	};
}
