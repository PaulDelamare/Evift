// ! IMPORTS
import { type ModalSettings, type ModalStore } from '@skeletonlabs/skeleton';

/**
 * Function to Render Modal
 * @param modalStore store from skeleton
 * @param toastStore store from skeleton
 *
 */
export default function renderModal(modalStore: ModalStore, component: string, title: string, body: string) {
	const modal: ModalSettings = {
		// Provide arbitrary classes to the backdrop and modal elements:
		type: 'component',
		title: title,
		body: body,
		buttonTextCancel: 'Annuler',
		// Pass the component registry key as a string:
		component: component,
		meta: {}
	};
	modalStore.trigger(modal);
}
