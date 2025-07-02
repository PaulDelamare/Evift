import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { Participant } from '$lib/models/participant.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';
import type { Event } from '$lib/models/event.model';

export default class EventApi extends Api {

	private authUrl = `${env.API_URL}api/event/`;

	/**
	 * Creates a new event.
	 * @param body - The FormData containing event details.
	 * @returns A promise resolving to the API response with the created event's ID.
	 * @throws Will throw an error if the request fails.
	 */
	createEvent = async (
		body: FormData
	): Promise<ApiResponse<{ eventId: string }>> => {
		try {
			const response = await this.fetch(`${this.authUrl}create`, {
				method: 'POST',
				credentials: 'include',
				body
			});

			return await response.json() as ApiResponse<{ eventId: string }>;
		} catch (error) {
			catchErrorRequest(error, 'EventApi.createEvent');
			throw error;
		}
	};

	/**
	 * Retrieves all events.
	 * @returns A promise resolving to the API response containing all events.
	 * @throws Will throw an error if the request fails.
	 */
	getEvent = async (): Promise<ApiResponse<Event[]>> => {
		try {
			const response = await this.fetch(`${this.authUrl}getAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			const data: ApiResponse<Event[]> = await response.json();
			return data;

		} catch (error) {
			catchErrorRequest(error, 'EventApi.getEvent');
			throw error;
		}
	};

	/**
	 * Retrieves a single event by its unique identifier.
	 *
	 * @param id - The unique identifier of the event to retrieve.
	 * @returns A promise that resolves to an {@link ApiResponse} containing the {@link Event} data.
	 * @throws Will rethrow any error encountered during the fetch operation after logging it with {@link catchErrorRequest}.
	 */
	getOneEvent = async (id: string): Promise<ApiResponse<Event>> => {
		try {
			const response = await this.fetch(`${this.authUrl}getOneEvent/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: ApiResponse<Event> = await response.json();
			return data;

		} catch (error) {
			catchErrorRequest(error, 'EventApi.getOneEvent');
			throw error;
		}
	};

	/**
	 * Retrieves all participants for a specific event.
	 * @param id - The unique identifier of the event.
	 * @returns A promise resolving to the API response containing an array of participants.
	 * @throws Will rethrow any error encountered during the fetch operation after logging it with {@link catchErrorRequest}.
	 */
	getParticipants = async (id: string): Promise<ApiResponse<Participant[]>> => {
		try {
			const response = await this.fetch(
				`${this.authUrl}getAllParticipantsForEvent/${id}`,
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				}
			);

			return await response.json() as ApiResponse<Participant[]>;

		} catch (error) {
			catchErrorRequest(error, 'EventApi.getParticipants');
			throw error;
		}
	};

	/**
	 * Changes the role of a participant in a specific event.
	 * @param id_event - The unique identifier of the event.
	 * @param id_user - The unique identifier of the user (participant).
	 * @param id_role - The unique identifier of the new role to assign.
	 * @returns A promise resolving to the API response.
	 * @throws Will rethrow any error encountered during the fetch operation after logging it with {@link catchErrorRequest}.
	 */
	changeRoleParticipant = async (
		id_event: string,
		id_user: string,
		id_role: string
	): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}updateParticipant`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ id_event, id_user, id_role })
			});
			return await response.json() as ApiResponse;
		} catch (error) {
			catchErrorRequest(error, 'EventApi.changeRoleParticipant');
			throw error;
		}
	};
}
