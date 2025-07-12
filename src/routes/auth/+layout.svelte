<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { LayoutData } from './$types';
	import Driver from '$lib/driver/Driver.svelte';
	import DriverResponsive from '$lib/driver/DriverResponsive.svelte';

	export let data: LayoutData;
	let user = data.user;
	let innerWidth = 0;
	let mounted = false;

	onMount(() => {
		mounted = true;
		innerWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			innerWidth = window.innerWidth;
		});
	});

	$: firstLogin = user?.firstLogin;

</script>

<svelte:window bind:innerWidth />

{#if browser && mounted && firstLogin}
	{#if innerWidth && innerWidth > 1150}
		<Driver />
	{:else}
		<DriverResponsive />
	{/if}
{/if}

<slot />
