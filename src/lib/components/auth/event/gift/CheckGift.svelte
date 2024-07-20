<script lang="ts">
	import { enhance } from '$app/forms';
	import CustomCheckbox from '$lib/components/extra/CustomCheckbox.svelte';

	let form: HTMLFormElement;

	export let giftId: string;
	export let taken: boolean;
	export let takenId: string | null;
	export let userId: string;
	export let eventId: string;
</script>

<form
	bind:this={form}
	method="post"
	action="?/checkGift"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<input type="hidden" value={giftId} name="giftId" />
	<input type="hidden" value={eventId} name="eventId" />
	<CustomCheckbox
		on:change={() => form.requestSubmit()}
		name="taken"
		disabled={takenId !== null ? (userId === takenId ? false : true) : false}
		checked={taken}
		classCheck="!w-[50px] !h-[50px] !rounded-lg"
	/>
</form>
