<script lang="ts">
	// Imports
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import CustomAppShell from '$lib/components/structure/CustomAppShell.svelte';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { modalComponentRegistry } from '$lib/components/modal/allModal';

	initializeStores();
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

<Modal components={modalComponentRegistry} regionBackdrop="!bg-black/50" />
