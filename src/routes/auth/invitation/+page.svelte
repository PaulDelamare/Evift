<script lang="ts">
	import FriendsInvitationList from '$lib/components/auth/invitation/FriendsInvitationList.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { PageData } from './$types';
	import type { Invitation } from '$lib/models/invitation.model';
	import Event from '$lib/components/auth/event/Event.svelte';
	import AcceptRefuse from '$lib/components/auth/form/AcceptRefuse.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { responseInvitationSchema } from '$lib/validationSchema/invitation.schema';
	import toast from 'svelte-french-toast';
	import { invalidateAll } from '$app/navigation';
	import { fakeEventInvitations } from '$lib/driver/fakeInviteEvent';
	import { driver } from '$lib/driver/driver';
	import { fakeUserInvitation } from '$lib/driver/fakeInvitation';
	import { friendPage } from '$lib/driver/storeDriver';
	import NotificationCircle from '$lib/components/extra/notificationCircle/NotificationCircle.svelte';

	export let data: PageData;
	const user = data.user;

	let event = true;
	let eventInvitations = data.invitationsEvent;
	let invitations: Invitation[] = data.invitations;
	let notificationFriends = data.notificationFriends;
	let notificationEvents = data.notificationEvents;

	const { message } = superForm(data.formInvitationUser, {
		validators: zodClient(responseInvitationSchema),
		validationMethod: 'oninput'
	});

	$: if ($message && $message.success) {
		toast.success($message.message);

		invalidateAll().then(() => {
			invitations = data.invitations;
			eventInvitations = data.invitationsEvent;
			notificationFriends = data.notificationFriends;
			notificationEvents = data.notificationEvents;
		});

		$message.success = false;
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	$: if (user.firstLogin) {
		eventInvitations = [...fakeEventInvitations];
		invitations = [fakeUserInvitation];
		if ($friendPage) {
			event = false;
		} else {
			event = true;
		}
	}
</script>

<PageLayout padding="py-12" gap="gap-12">
	<div id="invitationNav" class="flex gap-8 justify-between mx-auto px-4">
		<button
			on:click={() => (event = true)}
			class="max-w-[183px] w-[183px] mobile-large:w-[100px] text-center shadow-md cursor-pointer {event
				? 'bg-gradient text-surface-500'
				: 'bg-surface-400 text-tertiary-500'} py-1 rounded-full relative"
		>
			<p class="nav">Evenement</p>

			<NotificationCircle notification={notificationEvents} active={event} />

		</button>

		<button
			id="friendsInvitation"
			on:click={() => {
				event = false;

				if (user.firstLogin) {
					driver.moveNext();
				}
			}}
			class="max-w-[183px] w-[183px] mobile-large:w-[100px] text-center shadow-md cursor-pointer {!event
				? 'bg-gradient text-surface-500'
				: 'bg-surface-400 text-tertiary-500'} py-1 rounded-full text-surface-500 relative"
		>
			<p class="nav">Amis</p>

			<NotificationCircle notification={notificationFriends} active={!event} />

		</button>
	</div>

	<section class="wrap px-4">
		{#if event}
			<section class="wrap px-4 flex flex-col gap-12 tablet:px-0">
				<ul class="flex flex-col gap-12">
					{#each eventInvitations as event}
						<Event event={event.event} user={event.idOrganizer}>
							<AcceptRefuse action="?/acceptOrRefuseEvent" id={event.id_event} />
						</Event>
					{:else}
						<h4 class="text-center">Aucune invitation en ce moment...</h4>
					{/each}
				</ul>
			</section>
		{:else}
			<FriendsInvitationList
				dataArray={invitations}
				nothingMessage="Aucune invitation en ce moment..."
			/>
		{/if}
	</section>
</PageLayout>
