<script lang="ts">
	import { page } from '$app/stores';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import Network from '../extra/footer/Network.svelte';
	import Logo from '../svg/Logo.svelte';
	import Navigation from './Navigation.svelte';

	$: showFooter = (() => {
		if (!$page.url.pathname.includes('/auth')) {
			return true;
		}

		if ($page.url.pathname.includes('/conversation')) {
			return false;
		}

		return $innerWidthStore > 1150;
	})();
</script>

{#if showFooter}
	<div class="middle-wrap py-12 column gap-12 px-8">
		<div class="between w-full tablet:flex-col tablet:gap-12">
			<Logo white text link />

			<Navigation
				showInstall
				hover={false}
				hoverFooter
				aClass="text-surface-500"
				contact
				ulClass="gap-8 flex-col items-center"
			/>

			<Network />
		</div>

		<div>
			<p class="text-surface-500 text-center tablet:text-sm">
				© 2025 Evift. Tous droits réservés. <a href="/legal">Mentions Légales</a> |
				<a href="/cgu">Conditions Générales d'Utilisation</a>
				| <a href="/privacy">Politique de Confidentialité</a>
			</p>
		</div>
	</div>
{/if}
