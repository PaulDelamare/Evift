// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: import('$lib/models/user.model').User | undefined;
		notification: number;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
