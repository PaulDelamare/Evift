<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import 'driver.js/dist/driver.css';
	import { driver } from './driver';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

	onMount(async () => {
		if (!browser) return;

		if ($innerWidthStore && $innerWidthStore > 1150) {
			driver.drive();

		}
	});
</script>
