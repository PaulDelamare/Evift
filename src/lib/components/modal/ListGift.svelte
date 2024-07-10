<script lang="ts">
	// Imports
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import { page } from '$app/stores';
	import type { EventListData, List } from '$lib/models/gift.model';

	import { enhance } from '$app/forms';
	import type { ActionData } from '../../../routes/auth/event/event-[id_event]/gifts/$types';

	// Stores
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Variable
	let innerWidth: number;
	let innerHeight: number;

	// Get from page
	const lists: List[] = $page.data.lists;
	const event = $page.data.event;
	let listsEvent = $page.data.listsEvent as EventListData[];

	let toast: ToastSettings = {
		message: 'La liste a bien été ajouté',
		background: 'bg-success-500'
	};
	let form: ActionData;
	let search = '';

	let alreadyList = listsEvent.find(
		(lists) => lists.participant?.user.id === event.id_user
	)?.id_list;

	// Base Classes
	const cBase =
		'card p-4 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0  overflow-hidden';

	$: if ($page.form) {
		form = $page.form;
	}

	$: if (form?.success) {
		form.success = false;
		toastStore.trigger(toast);

		alreadyList = form.idList;

		// filteredLists.some((list) => list.id === filteredLists);
	} else if (typeof form?.errors === 'object' && form.errors.error) {
		form.errors.error = undefined;
		toast = {
			message: 'Une erreur est survenue',
			background: 'bg-error-500 text-surface-500'
		};
		toastStore.trigger(toast);
	}

	$: if (form?.successDelete) {
		form.successDelete = false;
		toastStore.trigger(toast);

		alreadyList = form.idList;

		// filteredLists.some((list) => list.id === filteredLists);
	} else if (typeof form?.errorsDelete === 'object' && form.errorsDelete.error) {
		form.errorsDelete.error = undefined;
		toast = {
			message: 'Une erreur est survenue',
			background: 'bg-error-500 text-surface-500'
		};
		toastStore.trigger(toast);
	}

	$: filteredLists = lists.filter((list) => {
		return list.name.toLowerCase().includes(search.toLowerCase());
	});

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- @component Add a gift list to event -->
{#if $modalStore[0]}
	<!-- Component Modal -->
	<div class={cBase}>
		<!-- Background style  -->
		<!-- Close Button -->
		<CloseModalButton
			fn={() => location.reload()}
			{parent}
			classSVG="fill-secondary-500"
		/>
		<!-- Content in Modal -->
		<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-[1000px]">
			<div class="column gap-4 items-start w-full">
				<div class="flex justify-center w-full">
					<h2 class="text-center uppercase text-gradient">Lites de cadeaux</h2>
				</div>
				<input
					bind:value={search}
					type="search"
					class="bg-surface-400 border-none shadow-md rounded-full"
					placeholder="Rechercher..."
				/>
				<ul class="h-[300px] w-full rounded-md overflow-y-auto bg-surface-400">
					{#each filteredLists as list}
						<li
							class="items-center flex justify-between shadow-md px-8 py-2 w-full bg-surface-400 overflow-hidde mobile-large:flex-col mobile-large:gap-2"
						>
							<div class="flex items-center gap-2 mobile-large:flex-col">
								<h4 class="text-primary-500 text-base">{list.name}</h4>
								<span class="text-gradient text-sm"
									>({list.gifts.length} <abbr title="cadeaux">cad.</abbr>)</span
								>
							</div>
							{#if !alreadyList}
								<div
									class="shadow-md w-full !max-w-[80px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-md"
								>
									<!-- Second div for animation -->

									<form
										method="POST"
										action="?/addGift"
										class="w-full group-hover:bg-surface-500 custom-transition rounded-[4px] !duration-300"
										use:enhance={() => {
											return async ({ update }) => {
												update({ reset: false });
											};
										}}
									>
										<input type="hidden" name="listId" value={list.id} />
										<input type="hidden" name="eventId" value={event.id_event} />
										<!-- Submit button -->
										<button
											class="w-full nav rounded-[4px] nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
											type="submit"
										>
											<span class="text-base">Ajouter</span>
										</button>
									</form>
								</div>
							{:else if alreadyList === list.id}
								<div
									class="shadow-md w-full !max-w-[80px] group bg-secondary-500 p-[2px] active:scale-95 custom-transition !duration-300 rounded-md"
								>
									<!-- Second div for animation -->

									<form
										method="POST"
										action="?/deleteListEvent"
										class="w-full group-hover:bg-surface-500 custom-transition rounded-[4px] !duration-300"
										use:enhance={() => {
											return async ({ update }) => {
												update({ reset: false });
											};
										}}
									>
										<input type="hidden" name="listId" value={list.id} />
										<input type="hidden" name="eventId" value={event.id_event} />
										<!-- Submit button -->
										<button
											class="w-full nav rounded-[4px] nav group-hover:text-secondary-500 text-surface-500 custom-transition !duration-300 between justify-center gap-8"
											type="submit"
										>
											<span class="text-base">Retirer</span>
										</button>
									</form>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
				<!-- {#if form?.errors}
					<span>{form?.errors}</span>
				{/if} -->
			</div>
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
