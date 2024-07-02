<script lang="ts">
	// ! IMPORT
	import FriendsInvitationList from '$lib/components/auth/invitation/FriendsInvitationList.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import type { Invitation } from '$lib/models/invitation.model';

	// ! VARIABLE
	export let data: PageData;
	// export let data: PageData;
	export let form: ActionData;

	const toastStore = getToastStore();
	// event is variable know if we are in event invitation or friends invitation
	let event = true;
	let invitations: Invitation[] = data.invitations;

	// DYNAMIC VARIABLE
	// Check if form has errors
	$: if (form?.errors) {
		// Display error in toast
		const t: ToastSettings = {
			message: 'Une erreur est survenue',
			background: 'bg-error-500',
			classes: 'text-surface-500',
			hideDismiss: true
		};
		toastStore.trigger(t);
	}

	// Check if form has success
	$: if (form?.success && form?.accept) {
		// Display success in toast
		const t: ToastSettings = {
			message:
				'<div class="flex items-center gap-4"><p>Vous avez un nouvel ami !</p><svg class="fill-surface-500 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>',
			background: 'bg-success-500',
			classes: 'text-surface-500',
			hideDismiss: true
		};
		toastStore.trigger(t);
	} else if (form?.success && !form?.accept) {
		// Display success in toast but for refuse
		const t: ToastSettings = {
			message:
				'<div class="flex items-center gap-4"><p>Vous avez refuser la demande d\'amis.</p><svg class="fill-surface-500 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></div>',
			background: 'bg-error-500',
			classes: 'text-surface-500',
			hideDismiss: true
		};
		toastStore.trigger(t);
	}
</script>

<!-- Displau Page Layout for disposition -->
<PageLayout padding="py-12" gap="gap-12">
	<!-- Display event and friends button -->
	<div class="flex gap-8 justify-between mx-auto px-4">
		<!-- Button for event -->
		<button
			on:click={() => (event = true)}
			class="max-w-[183px] w-[183px] mobile-large:w-[100px] text-center shadow-md cursor-pointer {event
				? 'bg-gradient text-surface-500'
				: 'bg-surface-400 text-tertiary-500'} py-1 rounded-full"
		>
			<p class="nav">Evenement</p>
		</button>
		<!-- Button for friends -->
		<button
			on:click={() => (event = false)}
			class="max-w-[183px] w-[183px] mobile-large:w-[100px] text-center shadow-md cursor-pointer {!event
				? 'bg-gradient text-surface-500'
				: 'bg-surface-400 text-tertiary-500'} py-1 rounded-full text-surface-500"
		>
			<p class="nav">Amis</p>
		</button>
	</div>
	<!-- Display event or friends invitation -->
	<section class="wrap px-4">
		{#if event}
			<h1>Evenement</h1>
		{:else}
			<FriendsInvitationList dataArray={invitations} {form} nothingMessage="Aucune invitation"/>
		{/if}
	</section>
</PageLayout>
