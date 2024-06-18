<script>
	// Import components
	import Features from '$lib/components/public/home/Features.svelte';
	import Hero from '$lib/components/public/home/Hero.svelte';
	import Stape from '$lib/components/public/home/Stape.svelte';
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
