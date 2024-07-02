import type { ModalComponent } from '@skeletonlabs/skeleton';
import ContactModal from './ContactModal.svelte';
import FindUserByEmail from './FindUserByEmail.svelte';

export const modalComponentRegistry: Record<string, ModalComponent> = {
	ContactModal: {
		// Pass a reference to your custom component
		ref: ContactModal
		// Add the component properties as key/value pairs
		// props: { },
	},
	FindUserByEmail: {
		// Pass a reference to your custom component
		ref: FindUserByEmail
		// Add the component properties as key/value pairs
		// props: { },
	}
};
