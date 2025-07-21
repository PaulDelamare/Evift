<script lang="ts">
	import type { PageData } from './$types';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';

	import { type PaginationSettings } from '@skeletonlabs/skeleton';
	import Event from '$lib/components/auth/event/Event.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { fakeUserEventRelation } from '$lib/driver/fakeEventData';

	export let data: PageData;

	let search = '';
	let events = data.allEvent;
	let user = data.user;

	$: if (data.user && !data.user.firstLogin) {
		user = data.user;
		events = data.allEvent;
	}

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: events.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;

	if (user.firstLogin) {
		events = [fakeUserEventRelation];
	}

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
			event.event.name?.toLowerCase().includes(search.toLowerCase())
		);
	});
</script>

<PageLayout padding="py-12" gap="gap-12">
	<div class="wrap px-4 flex w-full gap-8 justify-between mx-auto mobile-large:flex-col">
		<input
			bind:value={search}
			type="search"
			class="bg-surface-400 border-none shadow-md rounded-full"
			placeholder="Rechercher..."
		/>
		<a
			id="createEventButton"
			href="/auth/event/create"
			class="mobile-large:justify-center px-4 py-2 rounded-xl bg-gradient text-surface-500 flex gap-2 items-center custom-transition hover:scale-[.97] active:scale-90"
		>
			<PlusSvg classSvg="fill-surface-500 w-4" />
			Ajouter
		</a>
	</div>

	{#if filteredEvents.length > 0}
		<section class="wrap px-4 flex flex-col gap-12">
			<ul
				class="grid gap-12 grid-cols-[repeat(auto-fit,minmax(400px,1fr))] mobile-large:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
			>
				{#each filteredEvents as event}
					<Event event={event.event} user={event.event.user}>
						<div
							class="shadow-md w-full !max-w-[153px] mini-tablet:!max-w-[100px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
						>
							<div
								class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
							>
								<button
									class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
									type="button"
									id="{event.idDriver}2"
								>
									<a href="/auth/event/event-{event.id_event}">Accéder</a>
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
	{:else}
		<h4 class="text-center">Aucun événement trouvé...</h4>
	{/if}
</PageLayout>
