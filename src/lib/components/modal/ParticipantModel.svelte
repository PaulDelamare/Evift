<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import { page } from '$app/state';
	import ChangeRoleParticipant from '../auth/form/ChangeRoleParticipant.svelte';
	import type { Participant } from '$lib/models/participant.model';
	import type { Role } from '$lib/models/role.model';
	import type { User } from '$lib/models/user.model';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { changeRoleParticipantSchema } from '$lib/validationSchema/participant.schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	const modalStore = getModalStore();

	export let parent: SvelteComponent;

	const cBase =
		'card p-4 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0  overflow-hidden';

	const participants: Participant[] = page.data.participants;
	const roles: Role[] = page.data.roles;
	const userRole: Role = page.data.roleUser.role;
	const user: User = page.data.roleUser.user;

	const { message } = superForm(page.data.form, {
		validators: zodClient(changeRoleParticipantSchema),
		validationMethod: 'oninput'
	});

	$: if ($message && $message.success) {
		toast.success($message.message);
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	let search = '';
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
</script>

<!-- @component Creates a simple form modal. -->
{#if $modalStore[0]}
	<div class={cBase}>

		<CloseModalButton {parent} classSVG="fill-secondary-500" />

		<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-[565px]">
			<div class="column gap-4 items-start w-full">
				<div class="flex justify-center w-full">
					<h2 class="text-center uppercase text-gradient mobile-large:text-3xl">Participants</h2>
				</div>
				<input
					bind:value={search}
					type="search"
					class="bg-surface-400 border-none shadow-md rounded-full"
					placeholder="Rechercher..."
				/>
				<ul class="h-[300px] w-full rounded-md overflow-y-auto bg-surface-400">
					{#each filteredParticipants as participant, index}
						{#if index !== 0}
							<li class="bar bg-tertiary-50"></li>
						{/if}
						<ChangeRoleParticipant {user} {roles} {userRole} {participant} />
					{/each}
				</ul>

			</div>
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
