<script lang="ts">
	import { enhance } from '$app/forms';
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import renderModal from '$lib/functions/modal/renderModal';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	export let data: PageData;

	import { getModalStore } from '@skeletonlabs/skeleton';
	import toast from 'svelte-french-toast';
	import ConfirmDelete from '$lib/components/auth/form/ConfirmDelete.svelte';
	import { invalidateAll } from '$app/navigation';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	const modalStore = getModalStore();

	const { message } = superForm(data.formReleaseItem);
	const { message: takeMessage } = superForm(data.formTakeItem);
	const { message: deleteMessage } = superForm(data.formDeleteItem);

	$: if ($message && $message.success) {
		toast.success($message.message);
	}
	$: if ($message && $message.error) {
		toast.error($message.error);
	}
	$: if ($takeMessage && $takeMessage.success) {
		toast.success($takeMessage.message);
	}
	$: if ($takeMessage && $takeMessage.error) {
		toast.error($takeMessage.error);
	}
	$: if ($deleteMessage && $deleteMessage.success) {
		toast.success($deleteMessage.message);
	}
	$: if ($deleteMessage && $deleteMessage.error) {
		toast.error($deleteMessage.error);
	}

	const getTakenQuantity = (item: {
		takers?: { quantity: number }[];
		requestedQuantity: number;
		id: string;
		name: string;
	}) =>
		item.takers && item.takers.length > 0 ? item.takers.reduce((acc, t) => acc + t.quantity, 0) : 0;

	const isComplete = (item: {
		takers?: { quantity: number }[];
		requestedQuantity: number;
		id: string;
		name: string;
	}) => getTakenQuantity(item) >= item.requestedQuantity;

	const currentUserId = (data as any)?.currentUser?.id ?? (data as any)?.user?.id ?? null;

	const userTakenFor = (item: {
		takers?: { quantity: number; user?: { id: string } }[];
		requestedQuantity: number;
		id: string;
		name: string;
	}) => {
		if (!currentUserId || !item.takers) return null;
		return item.takers.find((t) => t.user?.id === currentUserId) ?? null;
	};

	let quantities: Record<string, number> = {};

	$: if (data.itemsEvent) {
		for (const item of data.itemsEvent) {
			if (quantities[item.id] === undefined) quantities[item.id] = 1;
		}
	}

	function canDelete(item: { createdById: string }) {
		return item.createdById === currentUserId;
	}

	const successDelete = () => {
        invalidateAll();
	};
</script>

<PageLayout padding="{$innerWidthStore < 1151 ? 'mb-10 pt-4' : 'py-24'}" gap="gap-8">
	<div class="min-h-screen px-2 font-sans flex flex-col gap-4 items-center overflow-x-hidden min-w-0">
		<header class="text-center w-full wrap flex flex-col gap-4">
			<BackButton url={`/auth/event/event-${data.event.id_event}`} fillSvg="fill-secondary-500" />
			<h2
				class="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight bg-gradient-to-r text-gradient bg-clip-text text-transparent"
			>
				Produits à ramener
			</h2>
			<p class="mt-2  text-gray-500 dark:text-gray-400">
				Organisez facilement les produits pour votre événement.
			</p>
		</header>
		<div class="w-full max-w-7xl mx-auto flex flex-col items-center min-w-0">
			<section class="w-full flex justify-end mb-8">
				<button
					on:click={() =>
						renderModal(modalStore, 'AddProductModal', 'Ajouter un produit', 'Ajouter un produit')}
					class="bg-gradient text-white font-bold text-lg px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
				>
					Ajouter un produit
				</button>
			</section>
			<section
				class="
					w-full max-w-7xl
					grid gap-4 md:gap-8
					grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
					md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]
					min-w-0
				"
			>
				{#each data.itemsEvent as item (item.id)}
					{@const userTaken = userTakenFor(item)}
					<div
						class={`flex flex-col w-full relative bg-surface-300 justify-between ${isComplete(item) ? 'border border-success-500 bg-success-100' : 'border border-gray-200'} rounded-2xl shadow-md p-6 gap-4`}
					>
						<div class="flex flex-col gap-4">
							<div class="flex justify-between items-start mb-1">
								<h2 class="font-bold text-lg break-words">{item.name}</h2>
								<span
									class={`px-3 py-1 text-xs font-semibold rounded-full shadow ${isComplete(item) ? 'bg-success-400 text-success-900' : 'bg-secondary-300 text-white'}`}
								>
									{isComplete(item) ? 'Complet' : 'À prendre'}
								</span>
							</div>
							<div class="flex justify-between text-base text-gray-700 font-medium">
								<span>Demandé : {item.requestedQuantity}</span>
                                <span class="font-bold text-success-600 border-2 border-success-500 px-2 py-1 rounded">
                                    Total : {getTakenQuantity(item)}
                                </span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-3">
								<div
									class={`h-3 rounded-full transition-all duration-500 ${isComplete(item) ? 'bg-success-400' : 'bg-purple-400'}`}
									style={`width: ${Math.min(100, (getTakenQuantity(item) / item.requestedQuantity) * 100)}%`}
								></div>
							</div>
							<form
								method="post"
								action="?/take"
								use:enhance
								class="mt-1 flex flex-col gap-3"
								on:submit={() => {
									quantities[item.id] = 1;
								}}
							>
								<input type="hidden" name="id" value={item.id} />
								<input
									type="number"
									min="1"
									name="quantity"
									class="w-full rounded-md border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
									bind:value={quantities[item.id]}
								/>
								<Submit rounded="rounded-md" submitted={false} textSubmit="Prendre" />
							</form>
						</div>

						{#if userTaken}
							<div
								class="w-full border-t {isComplete(item)
									? 'border-success-500'
									: 'border border-gray-200'} my-2"
							></div>
							<div class="flex flex-col gap-2">
								<span class="text-sm text-gray-800 font-medium text-center"
									>Vous avez pris : {userTaken.quantity}</span
								>
								<form method="post" action="?/release" use:enhance class="w-full">
									<input type="hidden" name="id" value={item.id} />
									<button
										type="submit"
										class="w-full rounded-md bg-warning-500 text-white py-2 font-semibold text-base hover:bg-warning-700 transition"
									>
                                        Retirer {data.itemsEvent.length === 1 ? 'le produit' : 'les produits'}
									</button>
								</form>
							</div>
						{/if}
						{#if canDelete(item)}
							<div class="border-t border-gray-300 pt-4 flex flex-col items-center">

								<ConfirmDelete
									id={item.id}
									name={item.name}
									action="?/delete"
									{successDelete}
									classCustom="w-full flex items-center justify-center gap-2 px-0 py-3 rounded-lg bg-error-500 text-white font-bold text-base shadow-md transition-all duration-150 hover:bg-error-400"
									classForm="w-full !p-0"
								/>
							</div>
						{/if}
					</div>
				{/each}
			</section>
		</div>
	</div>
</PageLayout>
