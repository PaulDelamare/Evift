import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { GetAllEvent, getOneEvent } from '$lib/models/event.model';
import type { Participant, DataAllParticipants } from '$lib/models/participant.model';

export default class EventApi extends Api {
	// Base url request for auth methods
	private authUrl = `${env.API_URL}api/event/`;

	/**
	 * Asynchronously creates an event.
	 *
	 * @param {FormData} body - The data for the event.
	 * @returns {Promise<string>} - A promise that resolves to a string representing the data of the created event.
	 * @throws {Error} - If there is an error creating the event, an error is thrown with the message 'Error create event : {error}'.
	 */
	createEvent = async (
		body: FormData
	): Promise<{ data: string; status: number } | { error: string; status: number }> => {
		// - Try Validation
		try {
			// Do request
			const response = await this.fetch(`${this.authUrl}create`, {
				method: 'POST',
				credentials: 'include',
				// body : body
				body: body
			});

			// Create Event
			const data: { data: string; status: number } | { error: string; status: number } =
				await response.json();

			// Return data
			return data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error create event : ' + error);
		}
	};

	getEvent = async (): Promise<GetAllEvent> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}getAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get data
			const data: GetAllEvent | { status: number; error: string } = await response.json();

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

	getOneEvent = async (id: string): Promise<getOneEvent> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}getOneEvent/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get data
			const data: getOneEvent | { status: number; error: string } = await response.json();

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

	getParticipants = async (id: string): Promise<Participant[]> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}getAllParticipantsForEvent/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			// Get data
			const data: DataAllParticipants | { status: number; error: string } = await response.json();

			if ('error' in data) {
				throw new Error(data.error);
			}

			// Return data
			return data.data;
		} catch (error) {
			// - Catch Errors
			throw new Error('Error in Event Invitation : ' + error);
		}
	};

	changeRoleParticipant = async (
		id_event: string,
		id_user: string,
		id_role: string
	): Promise<{ status: number; error: string } | { status: number; message: string }> => {
		// - Try Validation
		try {
			// Accept or refuse Invitation
			const response = await this.fetch(`${this.authUrl}updateParticipant`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ id_event, id_user, id_role })
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
}
