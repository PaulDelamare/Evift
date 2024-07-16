<script lang="ts">
	import GiftForm from '$lib/components/auth/form/GiftForm.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<PageLayout gap="gap-8" padding="py-8">
	<div class="between wrap px-4">
		<h2 class="mini-tablet:text-center text-gradient">Créez votre liste de cadeaux</h2>
	</div>
	<GiftForm {form} action="?/createGiftList" />
</PageLayout>
