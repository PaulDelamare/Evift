<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import { page } from '$app/state';
	import ChangeRoleParticipant from '../auth/form/ChangeRoleParticipant.svelte';
	import type { InviteUser, Participant } from '$lib/models/participant.model';
	import type { Role } from '$lib/models/role.model';
	import type { User } from '$lib/models/user.model';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { changeRoleParticipantSchema } from '$lib/validationSchema/participant.schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import InviteFriends from '../auth/form/InviteFriends.svelte';
	import type { Friends } from '$lib/models/friends.model';
	import Submit from '../form/Submit.svelte';
	import type { Event } from '$lib/models/event.model';
	import { enhance } from '$app/forms';
	import { inviteFriends, inviteNonFriendsSchema } from '$lib/validationSchema/event.schema';
	import { invalidateAll } from '$app/navigation';
	import { findUserByEmailSchema } from '$lib/validationSchema/friends.schema';
	import { requestEvent } from '$lib/validationSchema/requestAccount.schema';

	const modalStore = getModalStore();

	export let parent: SvelteComponent;

	const cBase =
		'card p-4 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0  overflow-hidden';

	let participants: Participant[] = page.data.participants;
	let friends: Friends[] = page.data.friends;
	let inviteUsers: InviteUser[] = page.data.inviteUsers;
	const roles: Role[] = page.data.roles;
	const userRole: Role = page.data.roleUser.role;
	const user: User = page.data.roleUser.user;
	const event: Event = page.data.event;
	let participantSide = true;

	const { message } = superForm(page.data.form, {
		validators: zodClient(changeRoleParticipantSchema),
		validationMethod: 'oninput'
	});

	const { message: messageFriends } = superForm(page.data.formFriends, {
		validators: zodClient(inviteFriends),
		validationMethod: 'oninput'
	});

	const { message: messageFindUser } = superForm(page.data.formFindUser, {
		validators: zodClient(findUserByEmailSchema),
		validationMethod: 'oninput'
	});

	const { message: messageRequestEvent } = superForm(page.data.formRequestEvent, {
		validators: zodClient(requestEvent),
		validationMethod: 'oninput'
	});

	const { message: formNonFriends } = superForm(page.data.formNonFriends, {
		validators: zodClient(inviteNonFriendsSchema),
		validationMethod: 'oninput'
	});

	$: if ($messageFriends && $messageFriends.success) {
		toast.success($messageFriends.message);
		invalidateAll().then(() => {
			participants = page.data.participants;
			friends = page.data.friends;
			inviteUsers = page.data.inviteUsers;
		});
		reset = true;
	}

	$: if (
		$messageFriends ||
		$messageFindUser ||
		$message ||
		$messageRequestEvent ||
		$formNonFriends
	) {
		submitted = false;
	}

	$: if ($messageFriends && $messageFriends.error) {
		toast.error($messageFriends.error);
	}

	$: if ($message && $message.success) {
		toast.success($message.message);
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	$: if ($messageRequestEvent && $messageRequestEvent.success) {
		toast.success($messageRequestEvent.message);
	}

	$: if ($messageRequestEvent && $messageRequestEvent.error) {
		toast.error($messageRequestEvent.error);
	}

	$: if ($formNonFriends && $formNonFriends.success) {
		toast.success($formNonFriends.message);
	}

	$: if ($formNonFriends && $formNonFriends.error) {
		toast.error($formNonFriends.error);
	}

	let search = '';

	const getId = (x: any) => {
		if (!x) return '';
		if (typeof x === 'string') return x;
		if (typeof x === 'number') return String(x);
		if (x.user && x.user.id) return String(x.user.id);
		if ('id' in x && x.id) return String(x.id);
		if ('email' in x && x.email) return String(x.email).toLowerCase();
		return '';
	};

	$: filteredParticipants = participants.filter((participant) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';
		const searchLastName = searchParts[1]?.toLowerCase() || '';

		return (
			(participant.user.firstname.toLowerCase().includes(searchFirstName) &&
				participant.user.lastname.toLowerCase().includes(searchLastName)) ||
			(participant.user.firstname.toLowerCase().includes(searchLastName) &&
				participant.user.lastname.toLowerCase().includes(searchFirstName)) ||
			participant.user.email.toLowerCase().includes(search.toLowerCase())
		);
	});

	$: filteredInvite = inviteUsers.filter((inviteUser) => {
		if (!inviteUser.updatedAt) inviteUser.updatedAt = new Date();
		if (!inviteUser.id_role) inviteUser.id_role = '';
		if (!inviteUser.roleRef) inviteUser.roleRef = roles[0];

		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';
		const searchLastName = searchParts[1]?.toLowerCase() || '';

		return (
			(inviteUser.user.firstname.toLowerCase().includes(searchFirstName) &&
				inviteUser.user.lastname.toLowerCase().includes(searchLastName)) ||
			(inviteUser.user.firstname.toLowerCase().includes(searchLastName) &&
				inviteUser.user.lastname.toLowerCase().includes(searchFirstName)) ||
			inviteUser.user.email.toLowerCase().includes(search.toLowerCase())
		);
	});

	let inviteList: string[] = [];
	$: inviteListString = inviteList.join(',');

	$: inviteUserIds = new Set(inviteUsers.map((i) => getId(i.user ?? i)).filter(Boolean));
	$: participantIds = new Set(participants.map((p) => getId(p.user ?? p)).filter(Boolean));

	$: filteredFriends = friends.filter((friend) => {
		const userObj = friend.user;
		const fid = getId(userObj);
		if (!fid) return false;

		if (inviteUserIds.has(fid) || participantIds.has(fid)) return false;

		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';
		const searchLastName = searchParts[1]?.toLowerCase() || '';

		return (
			(userObj.firstname?.toLowerCase().includes(searchFirstName) &&
				userObj.lastname?.toLowerCase().includes(searchLastName)) ||
			(userObj.firstname?.toLowerCase().includes(searchLastName) &&
				userObj.lastname?.toLowerCase().includes(searchFirstName)) ||
			userObj.email?.toLowerCase().includes(search.toLowerCase())
		);
	});

	let submitted = false;
	let reset = false;

	let lastInputValue = '';
</script>

<!-- @component Creates a simple form modal. -->
{#if $modalStore[0]}
	<div class="{cBase} flex flex-col overflow-hidden" style="max-height:95svh;">
		<CloseModalButton {parent} classSVG="fill-secondary-500" />
		{#if userRole.name === 'admin' || userRole.name === 'superAdmin'}
			<div id="invitationNav" class="flex gap-8 justify-between mx-auto flex-shrink-0">
				<button
					on:click={() => (participantSide = true)}
					class="max-w-[183px] w-[183px] mobile-large:w-[100px] text-center shadow-md cursor-pointer {participantSide
						? 'bg-gradient text-surface-500'
						: 'bg-surface-400 text-tertiary-500'} py-1 rounded-full relative"
				>
					<p class="nav">Participants</p>
				</button>

				<button
					id="friendsInvitation"
					on:click={() => {
						participantSide = false;
					}}
					class="max-w-[183px] w-[183px] mobile-large:w-[100px] text-center shadow-md cursor-pointer {!participantSide
						? 'bg-gradient text-surface-500'
						: 'bg-surface-400 text-tertiary-500'} py-1 rounded-full text-surface-500"
				>
					<p class="nav">Inviter</p>
				</button>
			</div>
		{:else}
			<h3 class="text-gradient">Particpants</h3>
		{/if}

		<div class="flex-1 min-h-0 overflow-y-auto w-full">
			{#if participantSide}
				<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-[565px]">
					<div class="column gap-4 items-start w-full">
						<input
							bind:value={search}
							type="search"
							class="bg-surface-400 border-none shadow-md rounded-full w-full"
							placeholder="Rechercher..."
						/>
						<ul class="h-[300px] w-full rounded-md overflow-y-auto bg-surface-400">
							{#each filteredParticipants as participant, index}
								{#if index !== 0}
									<li class="bar bg-tertiary-50"></li>
								{/if}
								<ChangeRoleParticipant {user} {roles} {userRole} {participant} />
							{/each}

							{#each filteredInvite as inviteUser, index}
								{#if index !== 0}
									<li class="bar bg-tertiary-50"></li>
								{/if}
								<ChangeRoleParticipant
									{user}
									{roles}
									{userRole}
									participant={inviteUser}
									isPending
								/>
							{/each}
						</ul>
					</div>
				</div>
			{:else}
				<div class="column gap-4 items-start max-w-[565px] w-full mx-auto">
					<h3 class="font-semibold text-lg">Vos amis</h3>
					<form
						on:submit={() => {
							submitted = true;
						}}
						class="flex justify-between flex-col items-center w-full gap-2"
						method="POST"
						action="?/findUserByEmail"
						use:enhance
						on:submit={() => {
							lastInputValue = search;
						}}
					>
						<input
							bind:value={search}
							type="search"
							class="bg-surface-400 border-none shadow-md rounded-full w-full"
							placeholder="Rechercher..."
							name="email"
						/>
						<button
							class="bg-primary-500 text-surface-500 py-2 px-4 rounded-full w-full text-sm mobile-large:text-xs"
						>
							Rechercher hors amis
						</button>
					</form>

					{#if filteredFriends.length === 0}
						{#if $messageFindUser?.user && !$messageFindUser.user.status}
							<!-- Utilisateur trouvé -->
							<div
								class="mb-2 p-3 rounded-md bg-tertiary-100 flex flex-col gap-2 items-start justify-between w-full"
							>
								<div class="flex flex-col gap-1 w-full">
									<span class="font-semibold text-center break-words max-w-full">
										{$messageFindUser.user.firstname}
										{$messageFindUser.user.lastname}
									</span>
									<span class="text-sm text-tertiary-500 text-center break-words max-w-full">
										{$messageFindUser.user.email}
									</span>
								</div>
								<form
									on:submit={() => {
										submitted = true;
									}}
									class="w-full"
									action="?/inviteNonFriends"
									method="POST"
									use:enhance
								>
									<input type="hidden" name="userId" value={$messageFindUser.user.id} />
									<input type="hidden" name="eventId" value={event.id_event} />
									<button
										class="bg-primary-500 text-surface-500 py-1 px-3 rounded-full !text-sm w-full mt-2"
										on:click={() => {
											inviteList = [...inviteList, $messageFindUser.user.email];
										}}
									>
										Inviter
									</button>
								</form>
							</div>
						{:else if $messageFindUser?.user?.status}
							<!-- Aucun utilisateur trouvé -->
							<div
								class="mb-2 p-3 rounded-md bg-tertiary-100 flex flex-col gap-2 items-start justify-between w-full"
							>
								<div class="flex flex-col gap-1 w-full">
									<span
										class="text-tertiary-500 text-sm text-center break-words max-w-full overflow-hidden text-ellipsis"
									>
										{lastInputValue}
									</span>
									<span class="text-xs text-tertiary-500 italic text-center break-words max-w-full">
										Aucun utilisateur avec cet email. Un email d'invitation sera envoyé pour créer
										un compte et rejoindre l'événement.
									</span>
								</div>
								<form
									on:submit={() => {
										submitted = true;
									}}
									class="w-full"
									action="?/requestEvent"
									method="POST"
									use:enhance
								>
									<input type="hidden" name="email" value={lastInputValue} />
									<input type="hidden" name="id_event" value={event.id_event} />
									<button
										class="bg-primary-500 text-surface-500 py-1 px-3 rounded-full !text-sm w-full mt-2"
										on:click={() => {
											inviteList = [...inviteList, lastInputValue];
										}}
									>
										Inviter
									</button>
								</form>
							</div>
						{/if}
					{/if}

					<ul class="h-[300px] w-full rounded-md overflow-y-auto bg-surface-400">
						{#if filteredFriends.length === 0 && !$messageFindUser?.user}
							<li class="text-center py-8 text-tertiary-500 text-sm mobile-large:text-xs">
								Chercher d'autres personnes ?
							</li>
						{:else}
							{#each filteredFriends as friend, index}
								{#if index !== 0}
									<li class="bar bg-tertiary-50"></li>
								{/if}
								<InviteFriends bind:reset bind:inviteList {friend} friends />
							{/each}
						{/if}
					</ul>

					<form
						on:submit={() => {
							submitted = true;
						}}
						class="w-full"
						action="?/inviteFriends"
						method="POST"
						use:enhance
					>
						<input type="hidden" value={inviteListString} name="inviteList" />
						<input type="hidden" value={event.id_event} name="eventId" />

						<Submit {submitted} textSubmit="Inviter" />
					</form>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.input-contact-style {
		@apply font-roboto w-full bg-transparent border-b-2 !border-b-surface-500 !border-transparent focus:!outline-none focus:!shadow-none text-surface-500 placeholder:text-surface-500 px-2 py-2 focus:!ring-offset-0 focus:!ring-0;
	}
	.triangle-modal {
		@apply absolute block w-[53%] h-full top-0 -z-[1] bg-primary-500/50 origin-top-right skew-x-[11deg] right-0 mini-tablet:skew-x-[7deg];
	}
</style>
