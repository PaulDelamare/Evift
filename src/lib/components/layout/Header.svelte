<script lang="ts">
	import { page } from '$app/state';
	import Burger from '../extra/header/Burger.svelte';
	import Logo from '../svg/Logo.svelte';
	import Navigation from './Navigation.svelte';

	$: user = page.data.user;
</script>

<div class="wrap py-2 px-8 between items-end relative">
	<Logo gradient text link h1 />

	<Navigation navClass={!user ? 'tablet:hidden' : 'mini-desk:hidden'} ulClass="gap-12 pb-2" hover />

	<Burger divClass="hidden {!user ? 'tablet:block' : 'mini-desk:block'}" />
</div>
