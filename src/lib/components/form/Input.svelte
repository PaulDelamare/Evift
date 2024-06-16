<script lang="ts">
	import { fade } from "svelte/transition";

	// Import variable
	export let value = '';
	export let onInputFunc: ((event: Event) => void) | undefined = undefined;
	export let type = 'text';
	export let label = '';
	export let name = '';
	export let classInput = '';
	export let error = '';

	// Function
	/**
	 * Creates an array of objects, each containing a character from the input text
	 * and the delay in milliseconds for the animation.
	 *
	 * @param text - The text to create spans from.
	 * @return An array of objects with the character and delay.
	 */
	function createLabelSpans(text: string) {
		let spans = [];
		let delay = 0;

		for (let char of text) {
			spans.push({ char, delay });
			delay += 50;
		}

		return spans;
	}

	// Create spans table for animation
	let labelSpans = createLabelSpans(label);
</script>

<!-- Container-->
<div class="w-full">
	<div class="form-control gradient">
		<div class="bg-surface-500">
			<!-- Email Input need required for animation -->
			{#if type !== 'content'}
				<input
					{type}
					class="text-tertiary-500 {classInput}"
					{name}
					required
					{value}
					on:input={onInputFunc}
				/>
			{:else}
				<textarea
					class="!box-border text-tertiary-500 {classInput} resize-none"
					{name}
					required
					{value}
					on:input={onInputFunc}
				></textarea>
			{/if}

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- Label with All span in letter for animation -->
			<label class="text-gradient">
				{#each labelSpans as { char, delay }}
					<span style="transition-delay:{delay}ms">{char}</span>
				{/each}
			</label>
		</div>
	</div>
	{#if error}
		<p in:fade={{ duration: 200 }} class="errorMessage">{error}</p>
	{/if}
</div>

<style lang="postcss">
	/* All input css for animation */
	.form-control {
		@apply relative pb-[2px] w-full;
	}

	.form-control input,
	.form-control textarea {
		@apply bg-surface-500 border-0 py-4 text-base w-full;
	}

	.form-control input:focus,
	.form-control input:active,
	.form-control textarea:focus,
	.form-control textarea:active {
		@apply border-b-light-blue-500 outline-0;
	}

	.form-control label {
		@apply pl-2 absolute top-4 left-0 pointer-events-none;
	}

	.form-control label span {
		@apply inline-block text-base mobile:text-[.9rem] min-w-2 transition-[0.3s_cubic-bezier(0.68,-0.55,0.265,1.55)];
	}

	.form-control input:focus + label span,
	.form-control input:valid + label span,
	.form-control textarea:focus + label span,
	.form-control textarea:valid + label span {
		@apply text-light-blue-500 -translate-y-8;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active{

	@apply [box-shadow:_inset_0_0_20px_20px_rgb(var(--color-surface-500)_/_var(--tw-bg-opacity))] [-webkit-background-clip:_text]
	}

	/*Change text in autofill textbox*/
	input:-webkit-autofill{
		@apply ![-webkit-text-fill-color:_rgb(var(--color-tertiary-500)_/_var(--tw-text-opacity))]
	}
</style>
