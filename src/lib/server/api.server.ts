import type { ErrorApi } from '$lib/models/error.model';

export class Api<T extends object> {
	fetch: { (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> };

	constructor(fetch: {
		(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
	}) {
		this.fetch = fetch;
	}

	/**
	 * Type guard to check if the response is an error
	 * @param data
	 * @returns true if the response is an error
	 */
	isErrorApi(data: T | ErrorApi): data is ErrorApi {
		return 'error' in data;
	}

	/**
	 * Checks if the provided data contains an error. If an error is found, it throws an Error object with the error message.
	 * Otherwise, it returns the data.
	 *
	 * @param {U | ErrorApi} data - The data to check for errors.
	 * @returns {U} - The data if no error is found.
	 * @throws {Error} - If an error is found, it throws an Error object with the error message.
	 */
	checkForError<U extends object>(data: U | ErrorApi): U {
		if ('error' in data) {
			throw new Error(data.error);
		}
		return data as U;
	}

	/**
	 * Type guard to check if the response is an error
	 * @param data
	 * @throws an error if the response is an error
	 * @returns the data if the response is not an error
	 */
	checkForErrorArray(data: T[] | ErrorApi): T[] {
		if ('error' in data) {
			throw new Error(data.error);
		}
		return data;
	}
}
