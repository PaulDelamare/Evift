<script lang="ts">
	import type { ActionData, LayoutData } from './$types';
	import Driver from '$lib/driver/Driver.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data: LayoutData;

	let user = data.user;

	const firstLogin = user.firstLogin;

	export let form: ActionData;


</script>

{#if firstLogin}
	<Driver />
{/if}

<slot />
