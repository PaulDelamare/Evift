<script lang="ts">
	import { goto } from '$app/navigation';
	import Submit from '$lib/components/form/Submit.svelte';
	import XSvg from '$lib/components/svg/XSvg.svelte';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { page } from '$app/state';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import toast from 'svelte-french-toast';
	import { giftSchema } from '$lib/validationSchema/gift.schema';

	export let action: string;

	let submitted = false;

	const {
		message,
		errors,
		validateForm,
		enhance,
		form: formData
	} = superForm(page.data.formCreateGift, {
		validators: zodClient(giftSchema),
		dataType: 'json'
	});

	$: if ($message) {
		submitted = false;
	}

	$: if ($message && $message.success) {
		toast.success($message.message);

		goto('/auth/gift');
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	$formData.gifts = [{ url: '', name: '', quantity: 1 }];

	const addField = () => {
		$formData.gifts = [...$formData.gifts, { url: '', name: '', quantity: 1 }];
	};

	const removeField = (index: number) => {
		$formData.gifts = $formData.gifts.filter(
			(_: { url: string; name: string; quantity: number }, i: number) => i !== index
		);
	};
</script>

<section class="flex flex-col gap-8">
	<form
		use:enhance
		on:submit={async () => {
			submitted = true;
			const result = await validateForm();

			if (!result.valid) {
				submitted = false;
			}
		}}
		method="POST"
		{action}
		class=" w-full mr-auto flex flex-col px-4 gap-8 wrap"
	>
		<div class="w-full">
			<input
				class="bg-surface-400 border-none rounded shadow-md w-full"
				name="name"
				placeholder="Nom de la liste"
				bind:value={$formData.name}
			/>

			{#if $errors?.name}
				<span class="errorMessage">{$errors?.name}</span>
			{/if}
		</div>
		{#each $formData.gifts as v, i}
			<div class="flex flex-col gap-4 bg-surface-50 p-4 rounded-xl relative">
				<div class="pl-2">
					<h4 class="text-gradient">
						{$formData.gifts[i].name !== '' ? $formData.gifts[i].name : `Cadeau ${i + 1}`}
					</h4>
				</div>
				<div class="flex gap-4 w-full">
					<label class="w-full flex flex-col gap-2">
						<span class="pl-2">Nom du cadeau :</span>
						<input
							class="bg-surface-400 border-none rounded shadow-lg w-full"
							type="text"
							bind:value={$formData.gifts[i].name}
						/>
						{#if $errors?.gifts && typeof $errors.gifts[i] === 'object' && $errors.gifts[i] !== null && 'name' in $errors.gifts[i]}
							<span class="errorMessage">{$errors.gifts[i]?.name}</span>
						{/if}
					</label>

					<label class="flex flex-col gap-2 w-2/4">
						<span class="pl-2">Quantité :</span>
						<input
							class="bg-surface-400 border-none rounded shadow-lg"
							type="number"
							bind:value={$formData.gifts[i].quantity}
							min="1"
							max="1000"
						/>
						{#if $errors?.gifts && typeof $errors.gifts[i] === 'object' && $errors.gifts[i] !== null && 'quantity' in $errors.gifts[i]}
							<span class="errorMessage">{$errors.gifts[i]?.quantity}</span>
						{/if}
					</label>
				</div>
				<label class="flex flex-col gap-2">
					<span class="pl-2">Lien pour trouver le cadeau (optionnel) :</span>
					<input
						class="bg-surface-400 border-none rounded shadow-lg w-full"
						type="url"
						bind:value={$formData.gifts[i].url}
					/>
					{#if $errors?.gifts && typeof $errors.gifts[i] === 'object' && $errors.gifts[i] !== null && 'url' in $errors.gifts[i]}
						<span class="errorMessage">{$errors.gifts[i]?.url}</span>
					{/if}
				</label>

				<div class="absolute !top-4 !right-4">
					<button class="" type="button" on:click={() => removeField(i)}
						><XSvg classSVG="w-4 fill-secondary-500" /></button
					>
				</div>
			</div>
		{/each}
		
		<button
			class="bg-primary-400 text-surface-500 px-3 py-2 rounded-lg flex items-center gap-2 justify-center"
			type="button"
			on:click={addField}><PlusSvg classSvg="w-4 fill-surface-500" />Ajouter</button
		>

		<div>
			<div class="max-w-[300px] mx-auto">
				<Submit {submitted} textSubmit="Créer" />
				{#if $message &&  $message.error}
					<p class="errorMessage">{$message.error}</p>
				{/if}
			</div>
		</div>
	</form>
</section>
