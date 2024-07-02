<script>
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

<!-- Display Page Hero -->
<slot name="hero" />
<!-- Place div whith flex display -->
<div
	class="flex flex-col {gap} {padding} mini-tablet:gap-12 mini-tablet:py-12 relative overflow-hidden min-h-[80svh]"
>
	<!-- If pink background is true display pink background -->
	{#if pinkBackground}
		<PinkBg {pinkWidth} {pinkTop} {pinkLeft} />
	{/if}
	<!-- If blue background is true display blue background -->
	{#if blueBackground}
		<BlueBg {blueWidth} {blueBottom} {blueRight} />
	{/if}
	<!-- Display all page content -->
	<slot />
</div>
