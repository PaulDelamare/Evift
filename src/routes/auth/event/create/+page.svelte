<script lang="ts">
	import EventForm from '$lib/components/auth/form/EventForm.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageLayout gap="gap-8" padding="py-8">
	<div class="between wrap px-4">
		<h2 class="mini-tablet:text-center text-gradient">Créez votre événement</h2>
	</div>
	<EventForm action="?/createEvent" />
</PageLayout>
