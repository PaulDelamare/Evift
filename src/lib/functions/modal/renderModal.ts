// ! IMPORTS
import { type ModalSettings, type ModalStore } from '@skeletonlabs/skeleton';

/**
 * Function to Render Modal
 * @param modalStore store from skeleton
 * @param toastStore store from skeleton
 *
 */
export default function renderModal(modalStore: ModalStore) {
	const modal: ModalSettings = {
		// Provide arbitrary classes to the backdrop and modal elements:
		type: 'component',
		title: 'Test',
		body: 'Signaler un problème de localisation ou de fonctionnement',
		buttonTextCancel: 'Annuler',
		// Pass the component registry key as a string:
		component: 'ContactModal',
		meta: {}
	};
	modalStore.trigger(modal);
}
