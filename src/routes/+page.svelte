<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import Features from '$lib/components/public/home/Features.svelte';
	import Hero from '$lib/components/public/home/Hero.svelte';
	import Stape from '$lib/components/public/home/Stape.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';

	onMount(() => {
		if (page.url.pathname === '/' && page.data.user) {
			goto('/auth/event');
		}
	});
</script>

<PageLayout>
	<Hero slot="hero" />
	<Stape />
	<Features />
</PageLayout>
