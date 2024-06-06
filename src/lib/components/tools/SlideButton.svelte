<script lang="ts">
	// Import components
	import Arrow from '../svg/Arrow.svelte';

	// Import variable
	// Function when button is clicked
	export let handleActivate = (): void => {};
	// Text in Button
	export let text: string;
	// Way to display
	export let toRight = true;
</script>

<!-- Button with animation -->
<button
	on:click={handleActivate}
	class="{toRight
		? 'pr-[1.2em] pl-[3.3em]'
		: 'pl-[1.2em] pr-[3.3em]'} cssbuttons-io-button group nav uppercase bg-transparent text-surface-500 p-[0.35em] text-base font-medium rounded-full border-none tracking-widest flex items-center overflow-hidden relative h-[2.8em] cursor-pointer outline outline-2"
>
	<!-- Display the text -->
	{text}
	<!-- Bloc for Animation -->
	<div
		class="{toRight
			? ' left-[0.3em] '
			: ' right-[0.3em]'} group-hover:w-[calc(100%-0.6em)] icon group-active:scale-95 bg-surface-500 absolute flex items-center justify-center h-[2.2em] w-[2.2em] rounded-full transition-all duration-300"
	>
		<!-- Display the arrow -->
		<Arrow
			classSvg="{toRight
				? ''
				: 'rotate-180'} w-[1.1em] transition-all duration-300 fill-primary-500 group-hover:translate-x-[0.1em]"
		/>
	</div>
</button>
