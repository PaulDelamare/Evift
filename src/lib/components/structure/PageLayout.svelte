<script>
	export let gap = 'gap-24';
	export let padding = 'py-24';
	// Imports
	export let pinkBackground = true;
	export let pinkWidth = 'w-[526px] mini-tablet:w-[400px]';
	export let pinkTop = 'top-1/4 mini-tablet:top-52';
	export let pinkLeft = '-left-10';

	// Imports
	export let blueBackground = true;
	export let blueWidth = 'w-[872px] mini-tablet:w-[600px]';
	export let blueBottom = '-bottom-1/4 mini-tablet:bottom-52';
	export let blueRight = 'right-0 mini-tablet:-right-52';
</script>

<!-- Display Page Hero -->
<slot name="hero" />
<!-- Place div whith flex display -->
<div
	class="flex flex-col {gap} {padding} mini-tablet:gap-12 mini-tablet:py-12 relative overflow-hidden"
>
	<!-- If pink background is true display pink background -->
	{#if pinkBackground}
		<div class="{pinkWidth} {pinkTop} {pinkLeft} absolute -z-10">
			<img
				class="w-full"
				src="/svg/background/pinkBackground.svg"
				alt="Style de Fond du site EVIFT"
			/>
		</div>
	{/if}
	<!-- If blue background is true display blue background -->
	{#if blueBackground}
		<div class="{blueWidth} {blueBottom} {blueRight} absolute -z-10">
			<img
				class="w-full"
				src="/svg/background/blueBackground.svg"
				alt="Style de Fond du site EVIFT"
			/>
		</div>
	{/if}
	<!-- Display all page content -->
	<slot />
</div>
