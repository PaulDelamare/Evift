<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import Input from '../form/Input.svelte';
	import Submit from '../form/Submit.svelte';
	import { page } from '$app/state';
	import User from '../auth/invitation/User.svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { fakeUser } from '$lib/driver/fakeUser';
	import { closeModal } from '$lib/driver/storeDriver';

	const modalStore = getModalStore();

	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const me = page.data.user;

	let submitted = false;
	let inputValue = '';

	const { message, enhance, errors, form } = superForm(page.data.form);

	let user = $message?.user;

	$: if ($message && $message.user) {
		user = $message;
	}

	$: if ($message && $message.success) {
		toast.success($message.message);
		modalStore.close();
		user = null;
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	if (me.firstLogin) {
		user = fakeUser;
		inputValue = 'john.doe@example.com';
	}

	const cBase =
		'card p-2 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0';

	$: if ($closeModal) {
		modalStore.close();
		closeModal.set(false);
	}

</script>

<!-- @component Creates a simple form modal. -->
{#if $modalStore[0]}
	<div id="addFriendModal" class={cBase}>
		<CloseModalButton {parent} classSVG="fill-secondary-500" />
		<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-[565px]">
			<div class="text-center text-gradient">
				<h2 class="tablet:text-3xl tracking-normal">Trouver un utilisateur</h2>
			</div>
			<form
				use:enhance
				method="POST"
				action="?/findUserByEmail"
				class="column gap-8 w-full py-4 max-h-[50svh] overflow-y-auto mini-tablet:gap-8 overflow-x-hidden"
			>
				<div class="w-full">
					<Input
						onInputFunc={(e) => {
							if (e.target) {
								// @ts-ignore
								inputValue = e.target.value;
							}
						}}
						value={inputValue.toLowerCase()}
						name="email"
						label="Email"
					/>
					{#if $errors.email}
						<span class="errorMessage">{$errors.email}</span>
					{/if}
				</div>

				<Submit textSubmit="Trouver" bind:submitted />

				{#if $message && $message.error}
					<span class="errorMessage">{$message.error}</span>
				{/if}
			</form>
			{#if user && !('error' in user.user)}
				<User data={user} button={false} sizeImg="size-20" addButton />
			{:else if user && 'error' in user.user}
				<div
					class="max-w-md mx-auto bg-surface-50 border border-primary-200 rounded-lg shadow-sm p-2 flex flex-col items-center gap-4 text-center"
				>
					<h2 class="text-primary-700 font-semibold text-lg">Aucun utilisateur trouvé</h2>

					<p class="text-primary-500 font-bold text-base">
						{inputValue.toLowerCase()}
					</p>

					<p class="text-secondary-500 text-sm">
						Vous pouvez inviter cette personne à rejoindre la plateforme.
					</p>

					<form use:enhance method="POST" action="?/requestFriend" class="mt-2 w-full">
						<input type="hidden" name="email" value={inputValue.toLowerCase()} />
						<button
							type="submit"
							class="w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
						>
							Inviter
						</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.input-contact-style {
		@apply font-roboto w-full bg-transparent border-b-2 !border-b-surface-500 !border-transparent focus:!outline-none focus:!shadow-none text-surface-500 placeholder:text-surface-500 px-2 py-2 focus:!ring-offset-0 focus:!ring-0;
	}

	.triangle-modal {
		@apply absolute block w-[53%] h-full top-0 -z-[1] bg-primary-500/50 origin-top-right skew-x-[11deg] right-0 mini-tablet:skew-x-[7deg];
	}
</style>
