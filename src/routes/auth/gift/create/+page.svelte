<script lang="ts">
	import GiftForm from '$lib/components/auth/form/GiftForm.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { giftSchema } from '$lib/validationSchema/gift.schema';

	export let data: PageData;

	const { message, errors, validateForm, enhance, form } = superForm(data.formCreateGift, {
		validators: zodClient(giftSchema),
		dataType: 'json'
	});
</script>

<PageLayout gap="gap-8" padding="py-8">
	<div class="between wrap px-4">
		<h2 class="mini-tablet:text-center text-gradient">Créez votre liste de cadeaux</h2>
	</div>
	<GiftForm action="?/createGiftList" />
</PageLayout>
