import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { GetAllLists, GetEventList, GetEventListDetail } from '$lib/models/gift.model';

export default class GiftApi extends Api {
	// Base url request for auth methods
	private authUrl = `${env.API_URL}api/gift/`;

	/**
	 * Creates a list.
	 *
	 * @param body - The request body.
	 * @param body.name - The name of the list.
	 * @param body.gifts - The gifts in the list.
	 * @param body.gifts[].name - The name of the gift.
	 * @param body.gifts[].quantity - The quantity of the gift.
	 * @param body.gifts[].url - The URL of the gift.
	 * @return A promise that resolves to an object with the following properties:
	 *   - message?: string - An optional message.
	 *   - error?: string - An optional error message.
	 *   - status: number - The status code.
	 * @throws {Error} If there is an error creating the list.
	 */
	createList = async (body: {
		name: string;
		gifts: { name: string; quantity: number; url: string }[];
	}): Promise<{ message?: string; error?: string; status: number }> => {

		try {

			const response = await this.fetch(`${this.authUrl}create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(body)
			});

			const data: { message?: string; error?: string; status: number } = await response.json();
			return data;

		} catch (error) {

			throw new Error('Error Get Friends By EMAIL : ' + error);
		}
	};

	findAll = async (): Promise<GetAllLists> => {
		try {
			const response = await this.fetch(`${this.authUrl}findAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: GetAllLists = await response.json();
			return data;

		} catch (error) {

			throw new Error('Error Get Friends By EMAIL : ' + error);
		}
	};

	findForEvent = async (id_event: string): Promise<GetEventList> => {

		try {

			const response = await this.fetch(`${this.authUrl}findListEvent/${id_event}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: GetEventList = await response.json();
			return data;

		} catch (error) {

			throw new Error('Get Gift : ' + error);
		}
	};

	addListEvent = async (
		idEvent: string,
		idList: string
	): Promise<{ message?: string; error?: string; status: number }> => {

		try {

			const response = await this.fetch(`${this.authUrl}listEvent`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ idEvent, idList })
			});

			const data: { message?: string; error?: string; status: number } = await response.json();
			return data;

		} catch (error) {

			throw new Error('Error Add List To Event : ' + error);
		}
	};

	deleteListEvent = async (
		idEvent: string,
		idList: string
	): Promise<{ message?: string; error?: string; status: number }> => {

		try {

			const response = await this.fetch(`${this.authUrl}deleteListEvent`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ idEvent, idList })
			});

			const data: { message?: string; error?: string; status: number } = await response.json();
			return data;

		} catch (error) {

			throw new Error('Error Add List To Event : ' + error);
		}
	};

	findList = async (idList: string): Promise<GetEventListDetail> => {

		try {
			const response = await this.fetch(`${this.authUrl}findList/${idList}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data: GetEventListDetail = await response.json();
			return data;

		} catch (error) {

			throw new Error('Get Gift : ' + error);
		}
	};

	checkGift = async (
		idEvent: string,
		idGift: string,
		checked: boolean
	): Promise<{ message?: string; error?: string; status: number }> => {

		try {

			const response = await this.fetch(`${this.authUrl}checkGift`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ idEvent, idGift, checked })
			});

			const data: { message?: string; error?: string; status: number } = await response.json();
			return data;

		} catch (error) {

			throw new Error('Error Add List To Event : ' + error);
		}
	};
}
