<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import CustomAppShell from '$lib/components/structure/CustomAppShell.svelte';
	import { Modal, initializeStores, Toast, getModalStore } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { modalComponentRegistry } from '$lib/components/modal/allModal';
	import InstallButton from '$lib/components/utils/InstallButton.svelte';
	import { Toaster } from 'svelte-french-toast';

	initializeStores();
	const modalStore = getModalStore();

	function handlePopstate() {
		modalStore.close();
	}
</script>

<svelte:window on:popstate={handlePopstate} />

<CustomAppShell
	headerSticky
	headerClass="bg-surface-500 shadow-header"
	footerClass="bg-secondaryGradient"
>
	<Header slot="header" />
	<slot />
	<Footer slot="footer" />
</CustomAppShell>

<Modal components={modalComponentRegistry} regionBackdrop="!bg-black/50" />
<Toast />
<Toaster position="bottom-center" />
<InstallButton />
