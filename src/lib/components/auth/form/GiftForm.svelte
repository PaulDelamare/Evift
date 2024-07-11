<script lang="ts">
	import { enhance } from '$app/forms';
	import { getToastStore, type ToastSettings, type ToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import Submit from '$lib/components/form/Submit.svelte';
	import XSvg from '$lib/components/svg/XSvg.svelte';
	import PlusSvg from '$lib/components/svg/PlusSvg.svelte';

	export let action: string;

	const toastStore: ToastStore = getToastStore();

	let name: string;

	let submitted = false;

	export let form;

	$: if (form) {
		submitted = false;
	}

	$: if (form?.success) {
		const t: ToastSettings = {
			message: 'La liste de cadeaux a été créée avec succès',
			background: 'bg-success-500 text-surface-500',
			classes: 'text-surface-500'
		};   
		toastStore.trigger(t);

		goto('/auth/gift');
	}

	let values = [
		{
			url: '',
			name: '',
			quantity: 1
		}
	];

	const addField = () => {
		values = [...values, { url: '', name: '', quantity: 1 }];
	};

	const removeField = (index: number) => {
		values = values.filter((_, i) => i !== index);
	};

	$: valueFields = JSON.stringify(values);
</script>

<section class="flex flex-col gap-8">
	<form
		on:submit={() => (submitted = true)}
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		method="post"
		{action}
		class=" w-full mr-auto flex flex-col px-4 gap-8 wrap"
		enctype="multipart/form-data"
	>
		<div class="w-full">
			<input
				bind:value={name}
				class="bg-surface-400 border-none rounded shadow-md w-full"
				name="name"
				placeholder="Nom de la liste"
			/>

			{#if form?.errors?.name}
				<span class="errorMessage">{form?.errors?.name}</span>
			{/if}
		</div>
		{#each values as v, i}
			<div class="flex flex-col gap-4 bg-surface-50 p-4 rounded-xl relative">
				<div class="pl-2">
					<h4 class="text-gradient">
						{values[i].name !== '' ? values[i].name : `Cadeau ${i + 1}`}
					</h4>
				</div>
				<div class="flex gap-4 w-full">
					<label class="w-full flex flex-col gap-2">
						<span class="pl-2">Nom du cadeau :</span>
						<input
							class="bg-surface-400 border-none rounded shadow-lg w-full"
							type="text"
							bind:value={values[i].name}
						/>
					</label>

					<label class="flex flex-col gap-2 w-2/4">
						<span class="pl-2">Quantité :</span>
						<input
							class="bg-surface-400 border-none rounded shadow-lg"
							type="number"
							bind:value={values[i].quantity}
							min="1"
							max="1000"
						/>
					</label>
				</div>
				<label class="flex flex-col gap-2">
					<span class="pl-2">Lien pour trouver le cadeau (optionnel) :</span>
					<input
						class="bg-surface-400 border-none rounded shadow-lg w-full"
						type="url"
						bind:value={values[i].url}
					/>
				</label>

				<div class="absolute !top-4 !right-4">
					<button class="" type="button" on:click={() => removeField(i)}
						><XSvg classSVG="w-4 fill-secondary-500" /></button
					>
				</div>
			</div>
		{/each}
		{#if form?.errors?.giftsJson}
			<span class="errorMessage">{form?.errors?.giftsJson}</span>
		{/if}
		<button
			class="bg-primary-400 text-surface-500 px-3 py-2 rounded-lg flex items-center gap-2 justify-center"
			type="button"
			on:click={addField}><PlusSvg classSvg="w-4 fill-surface-500" />Ajouter</button
		>
		<input type="hidden" value={valueFields} name="gifts" />

		<div>
			<div class="max-w-[300px] mx-auto">
				<Submit {submitted} textSubmit="Créer" />
				{#if form?.errors?.error}
					<p class="errorMessage">{form?.errors?.error}</p>
				{/if}
			</div>
		</div>
	</form>
</section>
