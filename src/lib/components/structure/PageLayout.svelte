<script>
	import { page } from '$app/stores';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import BlueBg from './BlueBg.svelte';
	import PinkBg from './PinkBg.svelte';

	export let gap = 'gap-24';
	export let padding = 'py-24';
	// Imports
	export let pinkBackground = true;
	export let pinkWidth = 'w-[526px] mini-tablet:w-[400px]';
	export let pinkTop = 'top-1/4 mini-tablet:top-52';
	export let pinkLeft = '-left-10';

	// Imports
	export let blueBackground = true;
	export let blueWidth = 'w-[872px] mini-desk:w-[600px]';
	export let blueBottom = '-bottom-1/4 mini-deskt:bottom-52';
	export let blueRight = 'right-0 mini-desk:-right-52';
</script>

<div
	id="target-element"
	class="w-full"
>
	<slot name="hero" />
</div>

<div
	class="flex flex-col {gap} {padding} mini-tablet:gap-12 mini-tablet:py-12 relative overflow-hidden min-h-[100svh]"
>
	{#if pinkBackground}
		<PinkBg {pinkWidth} {pinkTop} {pinkLeft} />
	{/if}
	{#if blueBackground}
		<BlueBg {blueWidth} {blueBottom} {blueRight} />
	{/if}
	<slot />
</div>
