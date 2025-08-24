<script lang="ts">
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';
	import renderModal from '$lib/functions/modal/renderModal';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

	export let data: PageData;

	const modalStore = getModalStore();

	$: listsEvent = data.listsEvent;
	$: roleUser = data.roleUser;
	$: event = data.event;

	let search = '';

	$: filteredLists = listsEvent.filter((list) => {
		return list.list.name.toLowerCase().includes(search.toLowerCase());
	});
</script>

<PageLayout padding={$innerWidthStore < 1151 ? 'mb-10 pt-4' : 'py-24'} gap="gap-8">
	<section>
		<div class="wrap px-4 flex flex-col gap-8">
			<div>
				<BackButton url={`/auth/event/event-${event.event.id}`} fillSvg="fill-secondary-500" />

				<div class="flex justify-center">
					<h2 class="text-gradient text-center">Liste des cadeaux</h2>
				</div>
			</div>
			{#if roleUser.role?.name === 'admin' || roleUser.role?.name === 'superAdmin' || roleUser.role?.name === 'gift'}
				<div class="wrap flex flex-col">
					<button
						on:click={() =>
							renderModal(modalStore, 'ListGift', 'Liste des cadeaux', 'Liste des cadeaux')}
						class="mobile-large:justify-center bg-gradient text-surface-500 self-end rounded-lg flex items-center gap-4 py-2 px-3 uppercase font-bold hover:scale-[1.02] custom-transition active:scale-90"
					>
						<div class="w-4">
							<PlusSvg classSvg="fill-surface-500 w-6" />
						</div>

						Ajouter une liste
					</button>
				</div>
			{/if}
		</div>
	</section>
	<section>
		{#if filteredLists.length !== 0}
			<div class="wrap px-4 flex flex-col items-center gap-8">
				<ul class="flex flex-col gap-8 w-full">
					{#each filteredLists as list}
						<li
							class="items-center flex justify-between shadow-md px-4 py-4 w-full bg-surface-400 rounded-xl overflow-hidde mobile-large:flex-col mobile-large:gap-4"
						>
							<div class="flex items-center gap-4 mobile-large:flex-col">
								<h4 class="text-primary-500 text-xl mini-tablet:text-lg">{list.list.name}</h4>
								<span class="text-gradient"
									>{list.participant?.user.firstname} {list.participant?.user.lastname}</span
								>
							</div>
							<div
								class="shadow-md w-full mobile-large:!max-w-full !max-w-[153px] mini-tablet:!max-w-[80px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
							>
								<div
									class="w-full mobile-large:!max-w-full !max-w-[153px] mini-tablet:!max-w-[80px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
								>
									<button
										class="w-full mobile-large:!max-w-full !max-w-[153px] mini-tablet:!max-w-[80px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
										type="submit"
									>
										<a
											class="mini-tablet:text-base mobile-large:text-2xl"
											href="/auth/event/event-{event.event.id}/gifts/list-{list.id}">Accéder</a
										>
									</button>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="wrap px-4 flex justify-center">
				<h4 class="text-center">Vous n'avez pas de liste de cadeaux pour le moment...</h4>
			</div>
		{/if}
	</section>
</PageLayout>
