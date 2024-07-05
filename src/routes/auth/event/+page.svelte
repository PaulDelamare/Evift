<script lang="ts">
	import type { PageData } from './$types';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';

	import { getModalStore, type ModalStore, type PaginationSettings } from '@skeletonlabs/skeleton';
	import Event from '$lib/components/auth/event/Event.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let data: PageData;

	// const friends = data.friends;
	const modalStore: ModalStore = getModalStore();

	let search = '';
	const events = data.allEvent.data;
	const imgUrl = data.imgUrl;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: events.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;

	$: paginatedSource = events.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: filteredEvents = paginatedSource.filter((event) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';
		const searchLastName = searchParts[1]?.toLowerCase() || '';

		return (
			(event.event.user.firstname.toLowerCase().includes(searchFirstName) &&
				event.event.user.lastname.toLowerCase().includes(searchLastName)) ||
			(event.event.user.firstname.toLowerCase().includes(searchLastName) &&
				event.event.user.lastname.toLowerCase().includes(searchFirstName)) ||
			event.event.user.email.toLowerCase().includes(search.toLowerCase()) ||
			event.event.name.toLowerCase().includes(search.toLowerCase())
		);
	});
</script>

<PageLayout padding="py-12" gap="gap-12">
	<!-- Display event and friends button -->
	<div class="wrap px-4 flex w-full gap-8 justify-between mx-auto mobile-large:flex-col">
		<input
			bind:value={search}
			type="search"
			class="bg-surface-400 border-none shadow-md rounded-full"
			placeholder="Rechercher..."
		/>
		<a
			href="/auth/event/create"
			class="mobile-large:justify-center px-4 py-2 rounded-xl bg-gradient text-surface-500 flex gap-2 items-center custom-transition hover:scale-[.97] active:scale-90"
		>
			<PlusSvg classSvg="fill-surface-500 w-4" />
			Ajouter
		</a>
	</div>
	<!-- Display event or friends invitation -->
	<section class="wrap px-4 flex flex-col gap-12">
		<ul class="flex flex-col gap-12">
			{#each filteredEvents as event}
				<Event event={event.event} {imgUrl} user={event.event.user}>
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
								<a href="/auth/event/event-{event.id}">Accéder</a>
							</button>
						</div>
					</div>
				</Event>
			{/each}
		</ul>
		<Paginator
			controlVariant="bg-gradient text-surface-500"
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
		/>
	</section>
</PageLayout>
