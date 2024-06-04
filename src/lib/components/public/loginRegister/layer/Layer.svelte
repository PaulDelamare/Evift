<script lang="ts">
	// Imports
	import SlideButton from '$lib/components/tools/SlideButton.svelte';
	import LayerInformation from './LayerInformation.svelte';

	// Import variable
	// For know if it's register or login activateed
	export let loginActivated = true;
	// Function for change the value of loginActivated
	export let handleActivate = (): void => {};
</script>

<!-- Display Layer -->
<!-- Layer it's the blue parti next to the form for pass to register or login -->
<div
	class="tablet:rounded-xl tablet:w-full tablet:!static mini-desk:p-4 w-2/4 top-0 bottom-0 {loginActivated
		? 'right-0'
		: 'right-2/4'} transition-all duration-1000 absolute p-12 bg-secondaryGradient text-surface-500 column justify-center z-10"
>
	<div class="w-full column gap-8 text-center mx-auto">
		<!-- If it's loginActivated -->
		{#if loginActivated}
			<!-- Display Text for change to register side -->
			<LayerInformation />
		{:else}
			<!-- Display Text for change to login side -->
			<LayerInformation
				img="login.svg"
				h2="Déjà un Compte ?"
				p="Connectez vous à votre compte pour accéder  à vos événements"
			/>
		{/if}
		<!-- Display Button -->
		<SlideButton
			text={loginActivated ? 'Inscription' : 'Connexion'}
			{handleActivate}
			toRight={loginActivated}
		/>
	</div>
</div>
