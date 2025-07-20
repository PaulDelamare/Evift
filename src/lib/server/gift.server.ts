import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { EventListData, List } from '$lib/models/gift.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class GiftApi extends Api {

	private authUrl = `${env.API_URL}api/gift/`;

	/**
	 * Creates a new gift list.
	 * @param body - The list details including name and an array of gifts.
	 * @returns The API response.
	 */
	createList = async (body: {
		name: string;
		gifts: { name: string; quantity: number; url?: string | null }[];

	}): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json();
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.createList');
			throw error;
		}
	};

	/**
	 * Retrieves all gift lists.
	 * @returns A promise resolving to an API response containing an array of gift lists.
	 */
	findAll = async (): Promise<ApiResponse<List[]>> => {
		try {
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			return await response.json() as ApiResponse<List[]>;
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.findAll');
			throw error;
		}
	};

	/**
	 * Retrieves the gift list data for a specific event.
	 * @param id_event - The unique identifier of the event.
	 * @returns A promise resolving to an API response containing the event's gift list data.
	 */
	findForEvent = async (id_event: string): Promise<ApiResponse<EventListData[]>> => {
		try {
			const response = await this.fetch(`${this.authUrl}findListEvent/${id_event}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			return await response.json() as ApiResponse<EventListData[]>;
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.findForEvent');
			throw error;
		}
	};

	/**
	 * Associates a gift list with a specific event.
	 * @param idEvent - The unique identifier of the event.
	 * @param idList - The unique identifier of the gift list.
	 * @returns A promise resolving to the API response.
	 */
	addListEvent = async (
		body: {
			idEvent: string,
			idList: string
		}
	): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}listEvent`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json() as ApiResponse;
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.addListEvent');
			throw error;
		}
	};

	/**
	 * Removes the association between a gift list and a specific event.
	 * @param idEvent - The unique identifier of the event.
	 * @param idList - The unique identifier of the gift list.
	 * @returns A promise resolving to the API response.
	 */
	deleteListEvent = async (
		body: {
			idEvent: string,
			idList: string
		}
	): Promise<ApiResponse> => {
		try {

			const response = await this.fetch(`${this.authUrl}deleteListEvent`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json() as ApiResponse;

		} catch (error) {
			catchErrorRequest(error, 'GiftApi.deleteListEvent');
			throw error;
		}
	};

	/**
	 * Retrieves the details of a specific gift list.
	 * @param idList - The unique identifier of the gift list.
	 * @returns A promise resolving to an API response containing the gift list data.
	 */
	findList = async (idList: string): Promise<ApiResponse<EventListData>> => {

		try {
			const response = await this.fetch(`${this.authUrl}findList/${idList}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			return await response.json() as ApiResponse<EventListData>;

		} catch (error) {
			catchErrorRequest(error, 'GiftApi.findList');
			throw error;
		}
	};

	/**
	 * Updates the checked status of a gift for a specific event.
	 * @param idEvent - The unique identifier of the event.
	 * @param idGift - The unique identifier of the gift.
	 * @param checked - The new checked status.
	 * @returns A promise resolving to the API response.
	 */
	checkGift = async (
		body: {
			eventId: string,
			giftId: string,
			taken: boolean
		}
	): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}checkGift`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json() as ApiResponse;
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.checkGift');
			throw error;
		}
	};

	/**
	 * Deletes a gift by its ID.
	 *
	 * Sends a DELETE request to the server to remove the specified gift.
	 * Handles errors by logging them and rethrowing.
	 *
	 * @param id - The unique identifier of the gift to delete.
	 * @returns A promise that resolves to an {@link ApiResponse} indicating the result of the operation.
	 * @throws Will throw an error if the request fails.
	 */
	deleteGift = async (id: string): Promise<ApiResponse> => {
		try {

			const response = await this.fetch(`${this.authUrl}deleteGift/${id}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			return await response.json() as ApiResponse;

		} catch (error) {
			catchErrorRequest(error, 'GiftApi.deleteGift');
			throw error;
		}
	}

	/**
	 * Deletes a gift list by its unique identifier.
	 *
	 * Sends a DELETE request to the server to remove the specified gift list.
	 * Handles errors by logging them and rethrowing the exception.
	 *
	 * @param id - The unique identifier of the gift list to delete.
	 * @returns A promise that resolves to an {@link ApiResponse} indicating the result of the operation.
	 * @throws Will rethrow any error encountered during the request.
	 */
	deleteList = async (id: string): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}deleteList/${id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			return await response.json() as ApiResponse;
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.deleteList');
			throw error;
		}
	}

	/**
	 * Adds a new gift to the specified user's gift list.
	 *
	 * @param body - An object containing the user ID and an array of gifts to add.
	 * Each gift includes a name, quantity, and an optional URL.
	 * @returns A promise that resolves to an `ApiResponse` indicating the result of the operation.
	 * @throws Will throw an error if the request fails.
	 */
	addGift = async (body: {
		id: string;
		gifts: { name: string; quantity: number; url?: string | null }[];
	}): Promise<ApiResponse> => {
		try {
			const response = await this.fetch(`${this.authUrl}addGift`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			return await response.json() as ApiResponse;
		} catch (error) {
			catchErrorRequest(error, 'GiftApi.addGift');
			throw error;
		}
	}
}
