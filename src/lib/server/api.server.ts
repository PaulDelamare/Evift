export class Api {
	fetch: { (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> };

	constructor(fetch: {
		(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
	}) {
		this.fetch = fetch;
	}
}