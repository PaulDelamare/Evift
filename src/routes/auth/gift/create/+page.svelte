<script lang="ts">
	import GiftForm from '$lib/components/auth/form/GiftForm.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { giftSchema } from '$lib/validationSchema/gift.schema';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import BackButton from '$lib/components/extra/BackButton.svelte';

	export let data: PageData;

	// const { message, errors, validateForm, enhance, form } = superForm(data.formCreateGift, {
	// 	validators: zodClient(giftSchema),
	// 	dataType: 'json'
	// });
</script>

<PageLayout gap="gap-8" padding={$innerWidthStore < 1151 ? 'mb-10 pt-4' : 'py-24'}>
	<div>
		<div class="px-4">
			<BackButton url={`/auth/gift`} fillSvg="fill-primary-500" />
		</div>
		<div class="between wrap px-4 justify-center">
			<h2 class="mini-tablet:text-center text-gradient">Créez votre liste de cadeaux</h2>
		</div>
	</div>

	<GiftForm action="?/createGiftList" />
</PageLayout>
