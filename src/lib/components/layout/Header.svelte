<script lang="ts">
	import { page } from '$app/stores';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import Burger from '../extra/header/Burger.svelte';
	import Logo from '../svg/Logo.svelte';
	import Navigation from './Navigation.svelte';
	import { onMount } from 'svelte';

	let isStandalone = false;

	onMount(() => {
		isStandalone =
			(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
			(window.navigator as any).standalone;
	});

	$: user = $page.data.user;

	$: showHeader =
		!isStandalone && (!$page.url.pathname.includes('/auth') || $innerWidthStore > 1150);
</script>

{#if showHeader}
	<div class="wrap py-2 px-8 between items-end relative">
		<Logo gradient text link h1 />

		{#if !user && $innerWidthStore >= 850}
			<Navigation ulClass="gap-12 pb-2" hover />
		{:else if !user && $innerWidthStore}
			<Burger />
		{/if}

		{#if user && $innerWidthStore >= 1150}
			<Navigation ulClass="gap-12 pb-2" hover />
		{:else if user && $innerWidthStore}
			<Burger />
		{/if}
	</div>
{/if}
