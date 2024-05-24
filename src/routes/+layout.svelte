<script lang="ts">
	// Imports
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import CustomAppShell from '$lib/components/structure/CustomAppShell.svelte';
	import '../app.postcss';
</script>

<!-- Create Custom APP Shell for Element Position -->
<CustomAppShell
	headerSticky
	headerClass="bg-surface-500 shadow-header"
	footerClass="bg-secondaryGradient"
>
	<!-- Add Header -->
	<Header slot="header" />
	<!-- Define Slot into Header and Footer -->
	<slot />
	<!-- Add Footer -->
	<Footer slot="footer" />
</CustomAppShell>
