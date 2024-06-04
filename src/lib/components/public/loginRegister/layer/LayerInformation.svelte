<script lang="ts">
	// Import library
	import { fade } from 'svelte/transition';

	// Import variable
	export let timeTransition = 2000;
	export let img = 'register.svg';
	export let h2 = 'Pas de compte ?';
	export let p = 'Entrez vos informations et commencez votre aventure avec nous';
</script>

<!-- Container Infomation -->
<div
	in:fade={{ duration: timeTransition }}
	class="w-3/4 mini-desk:w-full column gap-8 text-center mx-auto"
>
	<!-- Display SVG -->
	<div class="w-24 mobile-large:w-20">
		<!-- Display SVG (Register or Login) -->
		<img class="w-full" src="/svg/login/{img}" alt="Svg Register" />
	</div>
	<!-- Display Text title -->
	<h2 class="mobile-large:text-4xl">
		{h2}
	</h2>
	<!-- Display Text -->
	<p>
		{p}
	</p>
</div>
