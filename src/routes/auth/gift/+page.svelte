<script lang="ts">
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { PageData } from './$types';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { fakeLists } from '$lib/driver/fakeGiftData';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

	export let data: PageData;

	let lists = data.lists.data;
	const user = data.user;

	let search = '';

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: lists.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;

	$: filteredLists = lists.filter((list) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';

		return list.name.toLowerCase().includes(searchFirstName);
	});

	$: paginatedSource = filteredLists.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	if (user.firstLogin) {
		lists = [...fakeLists];
	}
</script>

<PageLayout padding={$innerWidthStore < 1151 ? 'mb-10 pt-4' : 'py-24'} gap="gap-12">
	<div class="wrap flex flex-col gap-4 items-center">
		<h3 class="text-center text-gradient w-fit">Liste de cadeaux</h3>
		<div class="wrap px-4 flex w-full gap-8 justify-between mx-auto mobile-large:flex-col">
			<input
				bind:value={search}
				type="search"
				class="bg-surface-400 border-none shadow-md rounded-full"
				placeholder="Rechercher..."
			/>
			<a
				href="/auth/gift/create"
				class="mobile-large:justify-center px-4 py-2 rounded-xl bg-gradient text-surface-500 flex gap-2 items-center custom-transition hover:scale-[.97] active:scale-90"
			>
				<PlusSvg classSvg="fill-surface-500 w-4" />
				Ajouter
			</a>
		</div>
	</div>

	<section>
		{#if paginatedSource.length !== 0}
			<div class="wrap px-4 flex flex-col items-center gap-8">
				<ul class="flex flex-col gap-8 w-full">
					{#each paginatedSource as list}
						<li
							id={user.firstLogin ? list.id : ''}
							class="items-center flex justify-between shadow-md px-8 py-4 w-full bg-surface-400 rounded-xl overflow-hidde mobile-large:flex-col mobile-large:gap-8"
						>
							<div class="flex items-center gap-4 mobile-large:flex-col">
								<h4 class="text-primary-500 mini-tablet:text-lg">{list.name}</h4>
								<span class="text-gradient">({list.gifts.length} cadeaux)</span>
							</div>
							<div
								class="shadow-md w-full !max-w-[153px] mini-tablet:!max-w-[100px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
							>
								<div
									class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
								>
									<button
										class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
										type="submit"
									>
										<a href="/auth/gift/list-{list.id}">Accéder</a>
									</button>
								</div>
							</div>
						</li>
					{/each}
				</ul>
				<div class="w-full">
					<Paginator
						controlVariant="bg-gradient text-surface-500"
						bind:settings={paginationSettings}
						showFirstLastButtons={false}
						showPreviousNextButtons={true}
					/>
				</div>
			</div>
		{:else}
			<div class="wrap px-4 flex justify-center">
				<h4 class="text-center">Vous n'avez pas de liste de cadeaux pour le moment...</h4>
			</div>
		{/if}
	</section>
</PageLayout>
