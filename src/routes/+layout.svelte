<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import CustomAppShell from '$lib/components/structure/CustomAppShell.svelte';
	import { Modal, initializeStores, Toast, getModalStore } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { modalComponentRegistry } from '$lib/components/modal/allModal';
	import InstallButton from '$lib/components/utils/InstallButton.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

	initializeStores();
	const modalStore = getModalStore();

	function handlePopstate() {
		modalStore.close();
	}

	let innerWidth = 0;

	$: if (innerWidth) {
		innerWidthStore.set(innerWidth);
	}
</script>

<svelte:window bind:innerWidth on:popstate={handlePopstate} />

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
