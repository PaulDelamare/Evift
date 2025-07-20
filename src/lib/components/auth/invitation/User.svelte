<script lang="ts">
	import { enhance } from '$app/forms';
	import DeleteButton from '$lib/components/extra/multiButton/DeleteButton.svelte';
	import MultiButton from '$lib/components/extra/multiButton/MultiButton.svelte';
	import { confirmDelete } from '$lib/functions/modal/confirmDelete';
	import type { GetUser } from '$lib/models/user.model';
	import { getModalStore, type ModalStore } from '@skeletonlabs/skeleton';

	export let shadow =
		'shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]';
	export let sizeImg = 'size-32';
	export let button = true;

	export let data: GetUser & { idDriver?: string };
	export let addButton = false;
	export let friends = false;
	export let canDelete = false;

	const modalStore: ModalStore = getModalStore();
</script>

<li
	id={data.idDriver}
	class="w-full flex p-4 bg-surface-300 gap-12 rounded-xl {shadow} {friends
		? 'items-center gap-8 mini-tablet:gap-4'
		: 'mini-tablet:flex-col mini-tablet:items-center mini-tablet:gap-4'}"
>
	<div>
		<div class="{sizeImg} rounded-full overflow-hidden box-border bg-surface-500 shadow-md">
			<img class="object-cover w-full" src="/svg/user/user.svg" alt="{data.user.firstname} Image" />
		</div>
	</div>

	<div
		class="w-full flex flex-col items-end justify-between {friends
			? ''
			: 'mini-tablet:gap-4 mini-tablet:items-center'} "
	>
		<div class="w-full flex flex-col gap-3 {friends ? '' : 'mini-tablet:text-center'} ">
			<h4 class="{friends ? 'text-base' : ''} ">
				{data.user.firstname.charAt(0).toUpperCase() + data.user.firstname.slice(1)}
				{data.user.lastname.charAt(0).toUpperCase() + data.user.lastname.slice(1)}
			</h4>
			{#if !friends}
				<p>{data.user.email}</p>
			{/if}
		</div>
		{#if button}
			<div class="flex w-full justify-end gap-4 mini-tablet:justify-center">
				<div id="{data.idDriver}2" class="flex gap-4">
					<form
						class="w-full !max-w-[153px]"
						action="?/invitation"
						method="POST"
						use:enhance={() => {
							return async ({ update }) => {
								update({ reset: false });
							};
						}}
					>
						<input type="hidden" name="id" value={data.id} />
						<input type="hidden" name="response" value={true} />
						<div
							class="shadow-md w-[153px] !max-w-[153px] mini-tablet:!max-w-[100px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
						>
							<div
								class="w-full mini-tablet:!max-w-[100px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
							>
								<button
									class="w-full mini-tablet:!max-w-[100px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
									type="submit"
								>
									<b>Accepter</b>
								</button>
							</div>
						</div>
					</form>
					<form
						action="?/invitation"
						use:enhance={() => {
							return async ({ update }) => {
								update({ reset: false });
							};
						}}
						method="POST"
					>
						<input type="hidden" name="id" value={data.id} />
						<input type="hidden" name="response" value={false} />
						<button
							class="nav w-[153px] mini-tablet:!max-w-[100px] active:scale-95 rounded-xl bg-surface-500 shadow-md hover:ring-2 hover:ring-error-500 hover:text-error-500 !custom-transition !duration-300"
						>
							Refuser
						</button>
					</form>
				</div>
			</div>
		{:else if addButton}
			<form
				id="addFriendForm"
				method="post"
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false });
					};
				}}
				action="?/sendFriendsInvitation"
			>
				<input type="hidden" name="id" value={data.user.id} />
				<div
					class="shadow-md w-full !max-w-[153px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
				>
					<div
						class="w-full !max-w-[153px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
					>
						<button
							class="w-full px-4 !max-w-[153px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
							type="submit"
						>
							<b>Ajouter</b>
						</button>
					</div>
				</div>
			</form>
		{:else if canDelete}
			<MultiButton index={0} identification="gift" side="end">
				<form
					slot="summary"
					on:submit={async (event) => {
						const res = await confirmDelete(
							event,
							modalStore,
							`Êtes vous sur de vouloir supprimer ${data.user.email} ?`
						);

						if (res.success) {
							location.reload();
						}
					}}
					method="POST"
					action="?/deleteFriend"
					class="p-2"
				>
					<input name="id" type="hidden" value={data.user.id} />
					<DeleteButton customtext="Supprimer" />
				</form>
			</MultiButton>
		{/if}
	</div>
</li>
