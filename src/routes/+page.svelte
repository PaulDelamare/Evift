<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import Features from '$lib/components/public/home/Features.svelte';
	import Hero from '$lib/components/public/home/Hero.svelte';
	import Stape from '$lib/components/public/home/Stape.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';

	onMount(() => {
		const isStandalone =
			(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
			(window.navigator as any).standalone;

		let localFlag: string | null = null;
		try {
			localFlag = localStorage.getItem('pwa-redirect-once');
		} catch (e) {
			localFlag = null;
		}

		let cookieFlag: string | null = null;
		try {
			const match = document.cookie
				.split(';')
				.map((c) => c.trim())
				.find((c) => c.startsWith('pwa_installed='));
			if (match) cookieFlag = match.split('=')[1] ?? null;
		} catch (e) {
			cookieFlag = null;
		}

		if (isStandalone && (localFlag === '1' || cookieFlag === '1')) {
			try {
				localStorage.removeItem('pwa-redirect-once');
			} catch (e) {}
			try {
				document.cookie = 'pwa_installed=; path=/; max-age=0';
			} catch (e) {}

			// goto('/evift/login', { replaceState: true });
		}

		if ($page.url.pathname === '/' && $page.data.user) {
			goto('/auth/event');
		}
	});
</script>

<PageLayout>
	<Hero slot="hero" />
	<Stape />
	<Features />
</PageLayout>
