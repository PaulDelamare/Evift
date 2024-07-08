<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Participant } from '$lib/models/participant.model';
	import type { Role } from '$lib/models/role.model';
	import type { User } from '$lib/models/user.model';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let participant: Participant;
	export let roles: Role[];
	export let userRole: Role;
	export let user: User;

	const toastStore = getToastStore();

	let toast: ToastSettings = {
		message: 'Le rôle a bien été modifié',
		background: 'bg-success-500'
	};

	let form: HTMLFormElement;
</script>

<li
	class="w-full flex p-4 bg-surface-400 gap-12shadow-md items-center gap-8 mini-tablet:gap-2 mini-tablet:px-2"
>
	<!-- Display user image (for start, the progil picture isn't available, so we display a default image) -->
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

	<!-- Display user infos -->
	<div
		class="w-full flex flex-col items-end justify-between mini-tablet:gap-4 mini-tablet:items-center"
	>
		<div class="w-full flex flex-col gap-3 mini-tablet:text-center">
			<!-- Display user name and email -->
			<h4 class=" text-base">
				{participant.user.firstname.charAt(0).toUpperCase() + participant.user.firstname.slice(1)}
				{participant.user.lastname.charAt(0).toUpperCase() + participant.user.lastname.slice(1)}
			</h4>
		</div>
	</div>
	{#if userRole.name === 'admin' && user.id !== participant.user.id && participant.roleRef.name !== 'admin'}
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
					on:change={(event) => form.requestSubmit()}
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
