<script lang="ts">
	import EventForm from '$lib/components/auth/form/EventForm.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
</script>

<PageLayout gap="gap-8" padding="{$innerWidthStore < 1151 ? 'mb-10 pt-4' : 'py-24'}">
	<div class="between wrap px-4">
		<h2 class="mini-tablet:text-center text-gradient">Créez votre événement</h2>
	</div>
	<EventForm action="?/createEvent" />
</PageLayout>
