<script lang="ts">
	import type { LayoutData } from './$types';
	import Driver from '$lib/driver/Driver.svelte';

	export let data: LayoutData;

	const user = data.user;

	const firstLogin = user.firstLogin;
</script>

{#if firstLogin}
	<Driver />
{/if}

<slot />
