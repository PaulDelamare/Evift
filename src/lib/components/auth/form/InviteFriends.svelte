<script lang="ts">
	import type { Friends } from '$lib/models/friends.model';

	export let friend: Friends;
	export let friends: boolean;
	export let inviteList: string[];

	let selected = false;
</script>

<li class="w-full flex p-4 bg-surface-400 gap-12shadow-md items-center gap-8 mini-tablet:gap-4">
	<!-- Display user image (for start, the progil picture isn't available, so we display a default image) -->
	<div>
		<div class="size-8 rounded-full overflow-hidden box-border bg-surface-500 shadow-md">
			<img
				class="object-cover w-full"
				src="/svg/user/user.svg"
				alt="{friend.user.firstname} Image"
			/>
		</div>
	</div>

	<!-- Display user infos -->
	<div
		class="w-full flex flex-col items-end justify-between {friends
			? ''
			: 'mini-tablet:gap-4 mini-tablet:items-center'} "
	>
		<div class="w-full flex flex-col gap-3 {friends ? '' : 'mini-tablet:text-center'} ">
			<!-- Display user name and email -->
			<h4 class="{friends ? 'text-base' : ''} ">
				{friend.user.firstname.charAt(0).toUpperCase() + friend.user.firstname.slice(1)}
				{friend.user.lastname.charAt(0).toUpperCase() + friend.user.lastname.slice(1)}
			</h4>
			{#if !friends}
				<p>{friend.user.email}</p>
			{/if}
		</div>
	</div>
	<div>
		<button
			class="{selected
				? 'bg-secondary-500'
				: 'bg-primary-500'} text-surface-500 rounded-md px-2 py-1 custom-transition hover:opacity-80"
			type="button"
			on:click={() => {
				if (selected) {
					inviteList = inviteList.filter((id) => id !== friend.id);
				}else {
					inviteList = [...inviteList, friend.userId];
				}
				selected = !selected;
			}}>{selected ? 'Retirer' : 'Inviter'}</button
		>
	</div>
</li>
