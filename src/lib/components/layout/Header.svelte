<script lang="ts">
	import { page } from '$app/stores';

	// Imports
	import Burger from '../extra/header/Burger.svelte';
	import Logo from '../svg/Logo.svelte';
	import Navigation from './Navigation.svelte';

	$: user = $page.data.user;
</script>

<!-- Bloc for Header -->
<div class="wrap py-2 px-8 between items-end relative">
	<!-- Display Logo -->
	<Logo gradient text link h1 />

	<!-- TODO Add condition for Loged Nav -->
	<!-- For Desktop Display Navigation -->
	<Navigation navClass="{!user ? 'tablet:hidden' : 'mini-desk:hidden'}" ulClass="gap-12 pb-2" hover />

	<!-- For Responsive Display Burger Menu -->
	<Burger divClass="hidden {!user ? 'tablet:block' : 'mini-desk:block'}" />
</div>
