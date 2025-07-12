<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import 'driver.js/dist/driver.css';
	import { driver } from './driver';

	let innerWidth = 0;

	onMount(async () => {
		if (!browser) return;

		if (innerWidth && innerWidth > 1150) {
			driver.drive();
		}
	});
</script>

<svelte:window bind:innerWidth />
