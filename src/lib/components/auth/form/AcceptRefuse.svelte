<script lang="ts">
	import { enhance } from '$app/forms';

	export let id;
     export let action: string;
</script>

<form
	class="w-full !max-w-[153px]"
	action="{action}"
	method="post"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<input type="hidden" name="eventId" value={id} />
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
	action="{action}"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
	method="post"
>
	<input type="hidden" name="eventId" value={id} />
	<input type="hidden" name="accept" value={false} />
	<button
		class="nav w-[153px] mini-tablet:!max-w-[100px] active:scale-95 rounded-xl bg-surface-500 shadow-md hover:ring-2 hover:ring-error-500 hover:text-error-500 !custom-transition !duration-300"
		>Refuser</button
	>
</form>
