<script lange="ts">
	import ChevronToLeft from '../svg/ChevronToLeft.svelte';

	// Imports
	export let url = '';
	export let fillSvg = 'fill-secondary-500';
</script>

<div class=" w-8">
	<a class="hover:scale-105 active:scale-95 custom-transition" href={url}>
		<ChevronToLeft classSvg="{fillSvg} w-8" />
	</a>
</div>
