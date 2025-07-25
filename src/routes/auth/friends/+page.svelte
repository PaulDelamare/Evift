<script lang="ts">
	import type { PageData } from './$types';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import FriendsInvitationList from '$lib/components/auth/invitation/FriendsInvitationList.svelte';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';

	import renderModal from '$lib/functions/modal/renderModal';
	import {
		getModalStore,
		Paginator,
		type ModalStore,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { uuidSchema } from '$lib/validationSchema/base.schema';
	import toast from 'svelte-french-toast';
	import { fakeFriends } from '$lib/driver/fakeFriends';
	import { openAddFriend } from '$lib/driver/storeDriver';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	const user = data.user;
	let friends = data.friends;
	const modalStore: ModalStore = getModalStore();

	const { message } = superForm(data.formUuid, {
		validators: zodClient(uuidSchema),
		validationMethod: 'oninput'
	});

	$: if ($message && $message.success) {
		toast.success($message.message);
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	let search = '';

	if (user.firstLogin) {
		friends = [fakeFriends];
	}

	let paginationSettings = {
		page: 0,
		limit: 30,
		size: friends.length,
		amounts: [1, 2, 5, 10, 20, 30]
	} satisfies PaginationSettings;

	$: filteredFriends = friends.filter((friend) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';
		const searchLastName = searchParts[1]?.toLowerCase() || '';

		return (
			(friend.user.firstname.toLowerCase().includes(searchFirstName) &&
				friend.user.lastname.toLowerCase().includes(searchLastName)) ||
			(friend.user.firstname.toLowerCase().includes(searchLastName) &&
				friend.user.lastname.toLowerCase().includes(searchFirstName)) ||
			friend.user.email.toLowerCase().includes(search.toLowerCase())
		);
	});

	$: paginatedSource = filteredFriends.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if ($openAddFriend) {
		renderModal(modalStore, 'FindUserByEmail', 'Contact', 'Contactez nous');
	}

	const successDelete = () => {
		invalidateAll().then(() => {
			friends = data.friends;
		});
	};
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
		<button
			id="addFriendButton"
			on:click={() => renderModal(modalStore, 'FindUserByEmail', 'Contact', 'Contactez nous')}
			class="mobile-large:justify-center px-4 py-2 rounded-xl bg-gradient text-surface-500 flex gap-2 items-center custom-transition hover:scale-[.97] active:scale-90"
		>
			<PlusSvg classSvg="fill-surface-500 w-4" />
			Ajouter
		</button>
	</div>

	<section class="wrap px-4 flex flex-col gap-8">
		<FriendsInvitationList
			shadow="shadow-[15px_15px_60px_0_rgba(190,190,190,1),-15px_-15px_60px_0_rgba(255,255,255,1)]"
			sizeImg="size-12"
			dataArray={paginatedSource}
			button={false}
			{successDelete}
		/>
		{#if paginatedSource.length > 0}
			<Paginator
				controlVariant="bg-gradient text-surface-500"
				bind:settings={paginationSettings}
				showFirstLastButtons={false}
				showPreviousNextButtons={true}
			/>
		{/if}
	</section>
</PageLayout>
