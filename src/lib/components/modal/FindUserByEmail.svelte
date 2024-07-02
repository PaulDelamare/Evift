<script lang="ts">
	// Imports
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import Input from '../form/Input.svelte';
	import Submit from '../form/Submit.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import User from '../auth/invitation/User.svelte';

	// Stores
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Variable
	let innerWidth: number;
	let innerHeight: number;
	let submitted = false;

     // Get form
	$: form = $page.form;

     // Stock user
	let user = form?.user;

     // If user is found
	$: if (form?.user) {
		user = form;
	}

     // If form is success
	$: if (form?.success) {
		modalStore.close();
		const t: ToastSettings = {
			message: "L'invitation a bien été envoyé",
			background: 'bg-success-500',
			classes: 'text-surface-500',
			hideDismiss: true
		};
		user = null;
		toastStore.trigger(t);
	}

	// Base Classes
	const cBase =
		'card p-4 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0  overflow-hidden';
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- @component Creates a simple form modal. -->
{#if $modalStore[0]}
	<!-- Component Modal -->
	<div class={cBase}>
		<!-- Background style  -->
		<!-- Close Button -->
		<CloseModalButton {parent} classSVG="fill-secondary-500" />
		<!-- Content in Modal -->
		<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-[565px]">
			<!-- Title-->
			<div class="text-center text-gradient">
				<h2 class="tablet:text-3xl tracking-normal">Trouver un utilisateur</h2>
			</div>
			<!--  Add user button -->
			<form
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false });
					};
				}}
				method="post"
				action="?/findUserByEmail"
				class="column gap-8 w-full py-4 max-h-[50svh] overflow-y-auto mini-tablet:gap-8"
			>
				<Input value="" name="email" label="Email" />
				<!-- Display Submit -->
				<Submit textSubmit="Trouver" bind:submitted />
				{#if form?.errors?.error}
					<span class="errorMessage">{form.errors.error}</span>
				{/if}
			</form>
               <!-- Display user -->
			{#if user}
				<User data={user} button={false} sizeImg="size-20" addButton />
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	/* Global style for input */
	.input-contact-style {
		@apply font-roboto w-full bg-transparent border-b-2 !border-b-surface-500 !border-transparent focus:!outline-none focus:!shadow-none text-surface-500 placeholder:text-surface-500 px-2 py-2 focus:!ring-offset-0 focus:!ring-0;
	}
	/* background triangle style */
	.triangle-modal {
		@apply absolute block w-[53%] h-full top-0 -z-[1] bg-primary-500/50 origin-top-right skew-x-[11deg] right-0 mini-tablet:skew-x-[7deg];
	}
</style>
