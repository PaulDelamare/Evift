<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount, type SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import Input from '../form/Input.svelte';

	const modalStore = getModalStore();

	export let parent: SvelteComponent;

	const event = page.data.event;

	const cBase =
		'card p-4 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0 overflow-hidden';

	const { message, enhance, form, submitting, errors } = superForm(page.data.formAddItem);

	$: if ($message && $message.success) {
		toast.success($message.message);
		modalStore.close();
		$form.name = '';
		$form.quantity = 1;
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	$form.quantity = 1;
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<CloseModalButton {parent} classSVG="fill-secondary-500" />

		<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-sm">
			<div class="column gap-12 items-start w-full">
				<div class="flex justify-center w-full">
					<h2 class="text-center uppercase text-gradient">Ajouter un produit</h2>
				</div>

				<form method="POST" action="?/create" use:enhance class="flex flex-col gap-4 w-full">
					<input type="hidden" name="eventId" value={event.id_event} />

					<div class="flex flex-col gap-16">
						<label for="name">
							<Input
								label="Nom du produit"
								value=""
								error={Array.isArray($errors?.name)
									? $errors.name[0]
									: typeof $errors?.name === 'string'
										? $errors.name
										: undefined}
								type="text"
								name="name"
							/>
						</label>

						<label for="quantity">
							<Input
								label="Quantité demandée"
								value="1"
								error={Array.isArray($errors?.requestedQuantity)
									? $errors.requestedQuantity[0]
									: typeof $errors?.requestedQuantity === 'string'
										? $errors.requestedQuantity
										: undefined}
								type="number"
								name="requestedQuantity"
							/>
						</label>
					</div>
					<button
						type="submit"
						disabled={$submitting}
						class="w-full px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition font-bold shadow-md hover:shadow-lg"
					>
						{#if $submitting}
							Chargement...
						{:else}
							Ajouter
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.text-gradient {
		background-image: linear-gradient(to right, #6ee7b7, #3b82f6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@media (prefers-color-scheme: dark) {
		.text-gradient {
			background-image: linear-gradient(to right, #4ade80, #3b82f6);
		}
	}
</style>
