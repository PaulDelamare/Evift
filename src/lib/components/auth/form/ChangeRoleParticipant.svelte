<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Participant } from '$lib/models/participant.model';
	import type { Role } from '$lib/models/role.model';
	import type { User } from '$lib/models/user.model';

	export let participant: Participant;
	export let roles: Role[];
	export let userRole: Role;
	export let user: User;

	let form: HTMLFormElement;
</script>

<li
	class="w-full flex p-4 bg-surface-400 gap-12shadow-md items-center gap-8 mini-tablet:gap-2 mini-tablet:px-2"
>
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

	<div
		class="w-full flex flex-col items-end justify-between mini-tablet:gap-4 mini-tablet:items-center"
	>
		<div class="w-full flex flex-col gap-3 mini-tablet:text-center">
			<div>
				<h4 class="text-base {user.id === participant.user.id ? 'text-gradient' : ''}">
					{#if user.id !== participant.user.id}
						{participant.user.firstname.charAt(0).toUpperCase() +
							participant.user.firstname.slice(1)}
						{participant.user.lastname.charAt(0).toUpperCase() + participant.user.lastname.slice(1)}
					{:else}
						Vous
					{/if}
				</h4>
			</div>
		</div>
	</div>
	{#if (userRole.name === 'admin' || userRole.name === 'superAdmin') && user.id !== participant.user.id && (participant.roleRef.name !== 'admin' || userRole.name === 'superAdmin')}
		<form
			bind:this={form}
			action="?/changeRoleParticipant"
			method="POST"
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
		>
			<div>
				<select
					on:change={() => form.requestSubmit()}
					class="rounded-full focus:outline-none focus:border-none cursor-pointer"
					name="id_role"
				>
					{#each roles as role}
						<option selected={role.id === participant.roleRef.id} value={role.id}
							>{role.name}</option
						>
					{/each}
				</select>
				<input type="hidden" name="id_user" value={participant.user.id} />
				<input type="hidden" name="id_event" value={participant.id_event} />
			</div>
		</form>
	{:else}
		<div class="">
			<span>{participant.roleRef.name}</span>
		</div>
	{/if}
</li>
