<script lang="ts">
	import XSvg from '$lib/components/svg/XSvg.svelte';
	import type { ValidationErrors } from 'sveltekit-superforms';

	export let form: any;
	export let errors: ValidationErrors<any>;
     export let removeField: (index: number) => void;
</script>

{#each form.gifts as v, i}
	<div class="flex flex-col gap-4 bg-surface-50 p-4 rounded-xl relative">
		<div class="pl-2">
			<h4 class="text-gradient">
				{form.gifts[i].name !== '' ? form.gifts[i].name : `Cadeau ${i + 1}`}
			</h4>
		</div>
		<div class="flex gap-4 w-full">
			<label class="w-full flex flex-col gap-2">
				<span class="pl-2">Nom du cadeau :</span>
				<input
					class="bg-surface-400 border-none rounded shadow-lg w-full"
					type="text"
					bind:value={form.gifts[i].name}
				/>
				{#if errors?.gifts && typeof errors.gifts[i] === 'object' && errors.gifts[i] !== null && 'name' in errors.gifts[i]}
					<span class="errorMessage">{errors.gifts[i]?.name}</span>
				{/if}
			</label>

			<label class="flex flex-col gap-2 w-2/4">
				<span class="pl-2">Quantité :</span>
				<input
					class="bg-surface-400 border-none rounded shadow-lg"
					type="number"
					bind:value={form.gifts[i].quantity}
					min="1"
					max="1000"
				/>
				{#if errors?.gifts && typeof errors.gifts[i] === 'object' && errors.gifts[i] !== null && 'quantity' in errors.gifts[i]}
					<span class="errorMessage">{errors.gifts[i]?.quantity}</span>
				{/if}
			</label>
		</div>
		<label class="flex flex-col gap-2">
			<span class="pl-2">Lien pour trouver le cadeau (optionnel) :</span>
			<input
				class="bg-surface-400 border-none rounded shadow-lg w-full"
				type="url"
				bind:value={form.gifts[i].url}
			/>
			{#if errors?.gifts && typeof errors.gifts[i] === 'object' && errors.gifts[i] !== null && 'url' in errors.gifts[i]}
				<span class="errorMessage">{errors.gifts[i]?.url}</span>
			{/if}
		</label>

		<div class="absolute !top-4 !right-4">
			<button class="" type="button" on:click={() => removeField(i)}
				><XSvg classSVG="w-4 fill-secondary-500" /></button
			>
		</div>
	</div>
{/each}
