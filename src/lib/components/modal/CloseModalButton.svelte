<script lang="ts">
	// Imports
	import type { SvelteComponent } from 'svelte';
	import XSvg from '../svg/XSvg.svelte';

	export let parent: SvelteComponent;
	export let classSVG = '';
	export let fn = () => {};
</script>

<!-- Button for Close Modal -->
<button
	on:click={fn}
	on:click={parent.onClose}
	class="absolute top-4 right-8 fill-surface-500 w-7 focus:!outline-none active:scale-90"
>
	<XSvg {classSVG} />
</button>
