<script lang="ts">
	import AddGift from '$lib/components/auth/form/AddGift.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

</script>

<PageLayout gap="gap-8" padding="py-8">
	<div class="between wrap px-4">
		<h2 class="mini-tablet:text-center text-gradient">Aouter à votre liste</h2>
	</div>
	<AddGift action="?/addGift" />
</PageLayout>
