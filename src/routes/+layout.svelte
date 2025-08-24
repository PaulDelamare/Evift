<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import CustomAppShell from '$lib/components/structure/CustomAppShell.svelte';
	import {
		Modal,
		initializeStores,
		Toast,
		getModalStore,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { modalComponentRegistry } from '$lib/components/modal/allModal';
	import InstallButton from '$lib/components/utils/InstallButton.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

	export let data: PageData;

	initializeStores();
	const modalStore = getModalStore();

	function handlePopstate() {
		modalStore.close();
	}

	let innerWidth = 0;

	$: if (innerWidth) {
		innerWidthStore.set(innerWidth);
	}

	import { afterNavigate } from '$app/navigation';
	import UserSvg from '$lib/components/svg/UserSvg.svelte';
	import type { PageData } from './$types';

	afterNavigate(() => {
		const targetElement = document.getElementById('target-element');
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	});

	const drawerStore = getDrawerStore();

	$: user = data.user;
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
<Drawer>
	{#if $drawerStore.id === 'drawer-responsive-logged' && user}
		<div class="flex flex-col h-full justify-between p-6">
			<div class="flex flex-col items-center mt-4 text-surface-500 relative">
				<!-- Close button (croix) -->
				<button
					class="absolute top-0 right-0 text-4xl text-surface-50"
					aria-label="Fermer"
					on:click={() => drawerStore.close()}
					style="line-height: 1;"
				>
					&times;
				</button>
				<div
					class="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-4"
				>
					<UserSvg classSvg="w-8" />
				</div>
				<div class="text-lg font-semibold mt-2">
					Bonjour, {user.firstname} !
				</div>
				<div class="text-sm">
					{user.email}
				</div>
			</div>

			<div class="flex-1"></div>

			<div class="mb-2">
				<form action="/evift/login?/logout" method="POST">
					<button
						class="w-full py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
					>
						Déconnexion
					</button>
				</form>

			</div>
		</div>
	{/if}
</Drawer>
