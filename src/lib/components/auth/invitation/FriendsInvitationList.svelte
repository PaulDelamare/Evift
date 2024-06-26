<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { Invitation } from '$lib/models/invitation.model';
	import type { ActionData } from '../../../../routes/auth/invitation/$types';

	let invitations: Invitation[] = $page.data.invitations;
     export let form: ActionData;

     $: if (form?.success) {
          invitations = invitations.filter(invitation => invitation.id !== form.idRemove);
    }
</script>

<ul class="column gap-12">
	{#each invitations as invitation}
		<li
			class="w-full flex p-4 bg-surface-500 gap-12 rounded-xl shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]"
		>
			<div>
				<div class="size-32 rounded-full overflow-hidden box-border bg-surface-500 shadow-md">
					<img
						class="object-cover w-full"
						src="/svg/user/user.svg"
						alt="{invitation.user.firstname} Image"
					/>
				</div>
			</div>

			<div class="w-full flex flex-col items-end justify-between">
				<div class="w-full flex flex-col gap-3">
					<h4>
						{invitation.user.firstname.charAt(0).toUpperCase() + invitation.user.firstname.slice(1)}
						{invitation.user.lastname.charAt(0).toUpperCase() + invitation.user.lastname.slice(1)}
					</h4>
					<p>{invitation.user.email}</p>
				</div>
				<div class="flex w-full justify-end gap-4">
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
						<input type="hidden" name="invitationId" value={invitation.id} />
						<input type="hidden" name="accept" value={true} />
						<div
							class="shadow-md w-full !max-w-[153px] group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
						>
							<!-- Second div for animation -->
							<div
								class="w-full !max-w-[153px] group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
							>
								<!-- Submit button -->
								<button
									class="w-full !max-w-[153px] 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
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
						<input type="hidden" name="invitationId" value={invitation.id} />
						<input type="hidden" name="accept" value={false} />
						<button
							class="nav w-[153px] active:scale-95 rounded-xl bg-surface-500 shadow-md hover:ring-2 hover:ring-error-500 hover:text-error-500 !custom-transition !duration-300"
							>Refuser</button
						>
					</form>
				</div>
			</div>
		</li>
	{/each}
</ul>
