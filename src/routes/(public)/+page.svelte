<script>
	import Features from "$lib/components/home/Features.svelte";
	import Hero from "$lib/components/home/Hero.svelte";
	import Stape from "$lib/components/home/Stape.svelte";
	import PageLayout from "$lib/components/structure/PageLayout.svelte";

</script>

<PageLayout>
	<Hero slot="hero" />
	<Stape />
	<Features />
</PageLayout>

