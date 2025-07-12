import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { Invitation } from '$lib/models/invitation.model';
import type { EventInvitation } from '$lib/models/event.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';
import type { ApiResponse } from '$lib/models/response.model';

export default class InvitationApi extends Api {

	private authUrl = `${env.API_URL}api/invitation/`;

	/**
	 * Retrieves the count of friend and event invitations for the current user.
	 *
	 * Makes a GET request to the server to fetch the number of pending friend and event invitations.
	 *
	 * @returns {Promise<ApiResponse<{ countFriendsInvitation: number; countEventInvitation: number }>>}
	 *   A promise that resolves to an ApiResponse containing the counts.
	 * @throws {Error} If the request fails, the error is caught and rethrown after logging.
	 */
	getCountFriendInvitation = async (): Promise<ApiResponse<{
		countFriendsInvitation: number;
		countEventInvitation: number;
	}>> => {
		try {
			const response = await this.fetch(`${this.authUrl}count`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			return await response.json();
		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.getCountFriendInvitation');
			throw error;
		}
	};

	/**
	 * Fetches all invitations for the current user.
	 *
	 * Makes a GET request to retrieve a list of invitations.
	 *
	 * @returns {Promise<ApiResponse<Invitation[]>>}
	 *   A promise that resolves to an ApiResponse containing an array of Invitation objects.
	 * @throws {Error} If the request fails, the error is caught and rethrown after logging.
	 */
	getInvitations = async (): Promise<ApiResponse<Invitation[]>> => {
		try {
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			return await response.json();
		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.getInvitations');
			throw error;
		}
	};

	/**
	 * Responds to a friend invitation by accepting or rejecting it.
	 *
	 * Sends a POST request to the server to accept or decline a friend invitation.
	 *
	 * @param {string} id - The ID of the invitation to respond to.
	 * @param {boolean} accept - Whether to accept (true) or reject (false) the invitation.
	 * @returns {Promise<ApiResponse>} A promise that resolves to the server's response.
	 * @throws {Error} If the request fails, the error is caught and rethrown after logging.
	 */
	responseInvitation = async (
		body: { id: string; response: boolean }
	): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}accept`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json();
		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.responseInvitation');
			throw error;
		}
	};

	/**
	 * Sends a friend invitation to a user by their ID.
	 *
	 * Makes a POST request to the server to send a friend invitation.
	 *
	 * @param {string} id - The ID of the user to invite.
	 * @returns {Promise<ApiResponse>} A promise that resolves to the server's response.
	 * @throws {Error} If the request fails, the error is caught and rethrown after logging.
	 */
	sendFriendsInvitation = async (
		body: { id: string }
	): Promise<ApiResponse> => {
		try {

			const response = await this.fetch(`${this.authUrl}request`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json();

		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.sendFriendsInvitation');
			throw error;
		}
	};

	/**
	 * Sends event invitations to a list of users for a specific event.
	 *
	 * Makes a POST request to the server to invite multiple users to an event.
	 *
	 * @param {string} eventId - The ID of the event to which users are being invited.
	 * @param {string[]} invitationIds - An array of user IDs to invite.
	 * @returns {Promise<ApiResponse>} A promise that resolves to the server's response.
	 * @throws {Error} If the request fails, the error is caught and rethrown after logging.
	 */
	eventInvitation = async (
		eventId: string,
		invitationIds: string[]
	): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}requestEvent`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ eventId, invitationId: invitationIds })
			});
			return await response.json();
		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.eventInvitation');
			throw error;
		}
	};

	/**
	 * Retrieves an event invitation from the server.
	 *
	 * Sends a GET request to the `eventInvitation` endpoint using the configured authentication URL.
	 * The request includes credentials and expects a JSON response containing the event invitation data.
	 *
	 * @returns A promise that resolves to an {@link ApiResponse} containing an {@link EventInvitation}.
	 * @throws Will rethrow any error encountered during the fetch operation after logging it with {@link catchErrorRequest}.
	 */
	getEventInvitation = async (): Promise<ApiResponse<EventInvitation[]>> => {
		try {

			const response = await this.fetch(`${this.authUrl}eventInvitation`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: ApiResponse<EventInvitation[]> = await response.json();
			return data;

		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.getEventInvitation');
			throw error;
		}
	};

	/**
	 * Responds to an event invitation by accepting or rejecting it.
	 *
	 * Sends a POST request to the server to accept or decline an event invitation.
	 *
	 * @param invitationId - The ID of the event invitation to respond to.
	 * @param  accept - Whether to accept (true) or reject (false) the invitation.
	 * @returns {Promise<ApiResponse>} A promise that resolves to the server's response.
	 * @throws {Error} If the request fails, the error is caught and rethrown after logging.
	 */
	responseEventInvitation = async (
		body: {
			id: string,
			response: boolean
		}
	): Promise<ApiResponse> => {
		try {

			const response = await this.fetch(`${this.authUrl}responseEventInvitation`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json();

		} catch (error) {
			catchErrorRequest(error, 'InvitationApi.responseEventInvitation');
			throw error;
		}
	};
}
