<script lang="ts">
	import { enhance } from '$app/forms';
	import type { GetUser } from '$lib/models/user.model';

	export let shadow =
		'shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]';
	export let sizeImg = 'size-32';
	export let button = true;

	export let data: GetUser;
	export let addButton = false;

	export let friends = false;
</script>

<!-- Display data in li -->
<li
	class="w-full flex p-4 bg-surface-500 gap-12 rounded-xl {shadow} {friends
		? 'items-center gap-8 mini-tablet:gap-4'
		: 'mini-tablet:flex-col mini-tablet:items-center mini-tablet:gap-4'}"
>
	<!-- Display user image (for start, the progil picture isn't available, so we display a default image) -->
	<div>
		<div class="{sizeImg} rounded-full overflow-hidden box-border bg-surface-500 shadow-md">
			<img class="object-cover w-full" src="/svg/user/user.svg" alt="{data.user.firstname} Image" />
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
				{data.user.firstname.charAt(0).toUpperCase() + data.user.firstname.slice(1)}
				{data.user.lastname.charAt(0).toUpperCase() + data.user.lastname.slice(1)}
			</h4>
			{#if !friends}
				<p>{data.user.email}</p>
			{/if}
		</div>
		{#if button}
			<!-- Display accept and refuse button -->
			<div class="flex w-full justify-end gap-4 mini-tablet:justify-center">
				<form
					class="w-full !max-w-[153px]"
					action="?/invitation"
					method="post"
					use:enhance={() => {
						return async ({ update }) => {
							update({ reset: false });
						};
					}}
				>
					<input type="hidden" name="invitationId" value={data.id} />
					<input type="hidden" name="accept" value={true} />
					<div
						class="shadow-md w-full !max-w-[153px] mini-tablet:!max-w-[100px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
					>
						<!-- Second div for animation -->
						<div
							class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
						>
							<!-- Submit button -->
							<button
								class="w-full !max-w-[153px] mini-tablet:!max-w-[100px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
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
					method="post"
				>
					<input type="hidden" name="invitationId" value={data.id} />
					<input type="hidden" name="accept" value={false} />
					<button
						class="nav w-[153px] mini-tablet:!max-w-[100px] active:scale-95 rounded-xl bg-surface-500 shadow-md hover:ring-2 hover:ring-error-500 hover:text-error-500 !custom-transition !duration-300"
						>Refuser</button
					>
				</form>
			</div>
		{:else if addButton}
			<form
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
					<!-- Second div for animation -->
					<div
						class="w-full !max-w-[153px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
					>
						<!-- Submit button -->
						<button
							class="w-full px-4 !max-w-[153px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
							type="submit"
						>
							<b>Ajouter</b>
						</button>
					</div>
				</div>
			</form>
		{/if}
	</div>
</li>
