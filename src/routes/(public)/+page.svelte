<script>
	import Hero from "$lib/components/home/Hero.svelte";
	import Stape from "$lib/components/home/Stape.svelte";
	import PageLayout from "$lib/components/structure/PageLayout.svelte";

</script>

<PageLayout>
	<Hero slot="hero" />
	<Stape />
</PageLayout>

