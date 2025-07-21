<script lang="ts">
	import DeleteButton from '$lib/components/extra/multiButton/DeleteButton.svelte';
	import { confirmDelete } from '$lib/functions/modal/confirmDelete';

	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let id: string;
	export let name: string;
	export let action: string;
	export let successDelete: () => void;
</script>

<form
	on:submit={async (event) => {
		const res = await confirmDelete(
			event,
			modalStore,
			`Êtes vous sur de vouloir supprimer ${name} ?`
		);
		if (res.success) {
			successDelete();
		}
	}}
	method="POST"
	{action}
	class="p-2"
>
	<input name="id" type="hidden" value={id} />
	<DeleteButton />
</form>
