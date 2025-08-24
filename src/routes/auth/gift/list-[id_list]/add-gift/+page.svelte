<script lang="ts">
	import AddGift from '$lib/components/auth/form/AddGift.svelte';
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import type { PageData } from './$types';

	export let data: PageData;
	const id = data.id_list;
</script>

<PageLayout gap="gap-8" padding={$innerWidthStore < 1151 ? 'mb-10 pt-4' : 'py-24'}>
	<div>
		<div class="px-4">
			<BackButton url={`/auth/gift/list-${id}`} fillSvg="fill-primary-500" />
		</div>
		<div class="between wrap px-4 flex justify-center">
			<h2 class="text-center text-gradient">Ajouter à votre liste</h2>
		</div>
	</div>

	<AddGift action="?/addGift" />
</PageLayout>
