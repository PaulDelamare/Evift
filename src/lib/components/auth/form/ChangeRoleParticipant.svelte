<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Participant } from '$lib/models/participant.model';
	import type { Role } from '$lib/models/role.model';
	import type { User } from '$lib/models/user.model';

	export let participant: Participant;
	export let roles: Role[];
	export let userRole: Role;
	export let user: User;
	export let isPending: boolean = false;
	let form: HTMLFormElement;

	// util : afficher le nom proprement
	const displayName = (() => {
		const first = participant?.user?.firstname ?? '';
		if (!first) return '';
		if (user?.id === participant?.user?.id) return 'Vous';
		const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
		return `${cap(first)} `.trim();
	})();
</script>

<!--
  Composant : item participant
  - avatar à gauche
  - nom (truncate si trop long)
  - à droite : badge "En attente" (petit, no-wrap) OU select admin OU label role
-->

<li class="w-full flex items-center gap-4 p-4 bg-surface-400 rounded-md">
	<!-- avatar -->
	<div>
		<div
			class="size-8 rounded-full overflow-hidden box-border bg-surface-500 shadow-md mobile-large:hidden"
		>
			<img
				class="object-cover w-full"
				src="/svg/user/user.svg"
				alt="{participant.user.firstname} Image"
			/>
		</div>
	</div>

	<!-- main content : nom + éventuel sous-texte -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center justify-between gap-4">
			<div class="flex-1 min-w-0">
				<h4
					class="text-base {isPending ? 'text-primary-400' : ''} font-medium truncate {user?.id ===
					participant?.user?.id
						? '!text-gradient'
						: '!text-primary-700'}"
				>
					{displayName}
				</h4>

			</div>

			{#if isPending}
				<div class="ml-4 flex-shrink-0">
					<span
						class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white bg-primary-500 rounded-full whitespace-nowrap"
						aria-label="Statut : en attente"
						title="En attente"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden
						>
							<path
								d="M12 7v6l4 2"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
							<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle>
						</svg>
						<!-- <span class="text-xs">En attente</span> -->
					</span>
				</div>
			{:else if (userRole?.name === 'admin' || userRole?.name === 'superAdmin') && user?.id !== participant?.user?.id && (participant.roleRef?.name !== 'admin' || userRole?.name === 'superAdmin')}
				<form
					bind:this={form}
					action="?/changeRoleParticipant"
					method="POST"
					use:enhance={() => {
						return async ({ update }) => {
							update({ reset: false });
						};
					}}
					class="ml-4 flex-shrink-0"
				>
					<div>
						<select
							on:change={() => form.requestSubmit()}
							class="rounded-full cursor-pointer text-sm px-3 py-1 bg-white border border-surface-200 focus:outline-none"
							name="id_role"
							aria-label="Changer le rôle du participant"
						>
							{#each roles as role}
								<option selected={role.id === participant.roleRef.id} value={role.id}>
									{role.name}
								</option>
							{/each}
						</select>
						<input type="hidden" name="id_user" value={participant.user.id} />
						<input type="hidden" name="id_event" value={participant.id_event} />
					</div>
				</form>
			{:else}
				<div class="ml-4 flex-shrink-0">
					<span
						class="inline-flex items-center px-3 py-1 text-sm font-medium text-primary-700 bg-primary-50 border border-primary-100 rounded-full whitespace-nowrap"
						aria-label="Rôle du participant"
						title={participant.roleRef?.name}
					>
						{participant.roleRef?.name}
					</span>
				</div>
			{/if}
		</div>
	</div>
</li>

<style>
	:global(.text-gradient) {
		background: linear-gradient(90deg, var(--tw-gradient-stops));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
</style>
