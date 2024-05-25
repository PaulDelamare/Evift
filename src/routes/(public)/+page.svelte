<script>
	// Import components
	import Features from '$lib/components/home/Features.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Stape from '$lib/components/home/Stape.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
</script>

<!-- Page Layout dor have good Disposition -->
<PageLayout>
	<!-- Display Hero -->
	<Hero slot="hero" />
	<!-- Display Stape and Features -->
	<Stape />
	<!-- Display Features -->
	<Features />
</PageLayout>
