<script lang="ts">
	import DeleteButton from '$lib/components/extra/multiButton/DeleteButton.svelte';
	import MultiButton from '$lib/components/extra/multiButton/MultiButton.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { confirmDelete } from '$lib/functions/modal/confirmDelete';
	import { getModalStore, type ModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto, invalidate, invalidateAll } from '$app/navigation';

	export let data: PageData;

	let list = data.gifts;

	let search = '';

	$: filteredGifts = list?.gifts.filter((gift) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';

		return gift.name.toLowerCase().includes(searchFirstName);
	});

	const modalStore: ModalStore = getModalStore();
</script>

<PageLayout padding="py-8">
	<section>
		<div class="wrap px-4 flex flex-col gap-8">
			<div class="flex justify-between items-center">
				<h2 class="text-gradient">{list.name}</h2>
				<form>
					<MultiButton index={0} identification="gift" side="end">
						<div slot="summary">
							<button class="!text-gradient summary-button nav !text-base" type="submit">
								<a href="/auth/gift/list-{list.id}/add-gift">Ajouter des cadeaux</a>
							</button>
						</div>
						<form
							on:submit={async (event) => {
								const res = await confirmDelete(
									event,
									modalStore,
									`Êtes vous sur de vouloir supprimer ${list.name} ?`
								);

								if (res.success) {
									goto('/auth/gift', { invalidateAll: true });
								}
							}}
							method="POST"
							action="?/deleteList"
							class="p-2"
						>
							<input name="id" type="hidden" value={list.id} />
							<DeleteButton customtext="Supprimer la liste" />
						</form>
					</MultiButton>
				</form>
			</div>
			<div>
				{#if filteredGifts.length !== 0}
					<div class="flex flex-col items-center gap-8">
						<ul class="flex flex-col gap-8 w-full">
							{#each filteredGifts as gift, index}
								<li
									class="items-center flex justify-between shadow-md px-8 py-4 w-full bg-surface-400 rounded-xl overflow-hidde mobile-large:flex-col mobile-large:gap-8"
								>
									<div class="flex items-center gap-4 mobile-large:flex-col">
										<h4 class="text-primary-500 mini-tablet:text-lg">{gift.name}</h4>
										<span class="text-gradient">({gift.quantity} cadeaux)</span>
									</div>

									<MultiButton {index} identification="gift">
										<div slot="summary">
											{#if gift.url}
												<button class="!text-gradient summary-button nav !text-base" type="submit">
													<a href={gift.url} target="_blank">Accéder</a>
												</button>
											{:else}
												<form
													on:submit={async (event) => {
														const res = await confirmDelete(
															event,
															modalStore,
															`Êtes vous sur de vouloir supprimer ${gift.name} ?`
														);
														if (res.success) {
															invalidateAll().then(() => {
																list = data.gifts;
															});
														}
													}}
													method="POST"
													action="?/deleteGift"
													class="p-2"
												>
													<input name="id" type="hidden" value={gift.id} />
													<DeleteButton />
												</form>
											{/if}
										</div>

										{#if gift.url}
											<form
												on:submit={async (event) => {
													const res = await confirmDelete(
														event,
														modalStore,
														`Êtes vous sur de vouloir supprimer ${gift.name} ?`
													);
													if (res.success) {
														invalidateAll().then(() => {
															list = data.gifts;
														});
													}
												}}
												method="POST"
												action="?/deleteGift"
												class="p-2"
											>
												<input name="id" type="hidden" value={gift.id} />
												<DeleteButton />
											</form>
										{/if}
									</MultiButton>
								</li>
							{/each}
						</ul>
					</div>
				{:else}
					<div class="wrap px-4 flex justify-center">
						<h4 class="text-center">Vous n'avez pas de liste de cadeaux pour le moment...</h4>
					</div>
				{/if}
			</div>
		</div>
	</section>
</PageLayout>
