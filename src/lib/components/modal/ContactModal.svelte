<script lang="ts">
	// Imports
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CloseModalButton from './CloseModalButton.svelte';
	import Input from '../form/Input.svelte';
	import Submit from '../form/Submit.svelte';

	// Stores
	const modalStore = getModalStore();

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Variable
	let innerWidth: number;
	let innerHeight: number;
	let submitted = false;

	// Base Classes
	const cBase =
		'card p-4 py-12 w-[75%] max-h-[95svh] shadow-xl space-y-4 column justify-center bg-surface-500 rounded-2xl relative mini-tablet:w-11/12 z-0  overflow-hidden';
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- @component Creates a simple form modal. -->
{#if $modalStore[0]}
	<!-- Component Modal -->
	<div class={cBase}>
		<!-- Background style  -->
		<!-- Close Button -->
		<CloseModalButton {parent} classSVG="fill-secondary-500" />
		<!-- Content in Modal -->
		<div class="column gap-12 mini-tablet:gap-8 w-full mx-auto max-w-[565px]">
			<!-- SVG With Titlte PosContact -->
			<div class="text-center text-gradient">
				<h2 class="tablet:text-3xl tracking-normal">Contactez nous !</h2>
			</div>
			<!--  Form Contact -->
			<form class="column gap-12 w-full py-4 max-h-[50svh] overflow-y-auto mini-tablet:gap-8">
				<Input value="" name="email" label="Email" />
				<!-- Bloc with message -->
				<Input
					classInput="min-h-[200px] tablet:min-h-[130px]"
					type="content"
					value=""
					name="message"
					label="Contenu du message"
				/>
				<Submit textSubmit="Envoyer" bind:submitted={submitted}/>
			</form>
		</div>
	</div>
{/if}

<style lang="postcss">
	/* Global style for input */
	.input-contact-style {
		@apply font-roboto w-full bg-transparent border-b-2 !border-b-surface-500 !border-transparent focus:!outline-none focus:!shadow-none text-surface-500 placeholder:text-surface-500 px-2 py-2 focus:!ring-offset-0 focus:!ring-0;
	}
	/* background triangle style */
	.triangle-modal {
		@apply absolute block w-[53%] h-full top-0 -z-[1] bg-primary-500/50 origin-top-right skew-x-[11deg] right-0 mini-tablet:skew-x-[7deg];
	}
</style>
