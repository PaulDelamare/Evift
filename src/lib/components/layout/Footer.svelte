<script lang="ts">
	import { page } from '$app/stores';
	// Imports
	// Component
	// Network
	import Network from '../extra/footer/Network.svelte';
	// Logo
	import Logo from '../svg/Logo.svelte';
	// Navigation
	import Navigation from './Navigation.svelte';

	$: showFooter = !$page.url.pathname.includes('/conversation');
</script>

{#if showFooter}
	<!-- Bloc for Footer -->
	<div class="middle-wrap py-12 column gap-12 px-8">
		<!-- Footer information -->
		<div class="between w-full tablet:flex-col tablet:gap-12">
			<!-- Display Footer Logo -->
			<Logo white text link />
			<!-- Display Footer Navigation -->
			<Navigation hoverFooter aClass="text-surface-500" contact ulClass="gap-8 flex-col" />
			<!-- Display Footer Network -->
			<Network />
		</div>
		<!-- Bloc for Copyright text -->
		<div>
			<!-- text with Link for going on Legal page -->
			<p class="text-surface-500 text-center tablet:text-sm">
				© 2024 Evift. Tous droits réservés. <a href="/">Mentions Légales</a> |
				<a href="/">Conditions Générales d'Utilisation</a>
				| <a href="/">Politique de Confidentialité</a>
			</p>
		</div>
	</div>
{/if}
