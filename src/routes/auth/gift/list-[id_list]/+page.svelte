<script lang="ts">
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const list = data.gifts;

	let search = '';

	$: filteredGifts = list?.gifts.filter((gift) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';

		return gift.name.toLowerCase().includes(searchFirstName);
	});
</script>

<PageLayout padding="py-8">
	<section>
		<div class="wrap px-4 flex flex-col gap-8">
			<div>
				<h2 class="text-gradient">{list.name}</h2>
			</div>
			<div>
				{#if filteredGifts.length !== 0}
					<div class="flex flex-col items-center gap-8">
						<ul class="flex flex-col gap-8 w-full">
							{#each filteredGifts as gift}
								<li
									class="items-center flex justify-between shadow-md px-8 py-4 w-full bg-surface-400 rounded-xl overflow-hidde mobile-large:flex-col mobile-large:gap-8"
								>
									<div class="flex items-center gap-4 mobile-large:flex-col">
										<h4 class="text-primary-500 mini-tablet:text-lg">{gift.name}</h4>
										<span class="text-gradient">({gift.quantity} cadeaux)</span>
									</div>
									{#if gift.url}
										<div
											class="shadow-md w-full !max-w-[153px] mini-tablet:!max-w-[100px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
										>
											<!-- Second div for animation -->
											<div
												class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
											>
												<!-- Submit button -->
												<button
													class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
													type="submit"
												>
													<a href={gift.url} target="_blank">Accéder</a>
												</button>
											</div>
										</div>
									{/if}
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
