<script lang="ts">
	// Imports
	import { onDestroy } from 'svelte';
	import Typewriter from 'svelte-typewriter';

	// Variable
	// Define text number for Display title and description associate to this number
	let text = 0;
	// Create Interval Variable
	// Add Comment for disabled eslint for no import NodeJS but it's not necessary
	let intervalId: NodeJS.Timeout; // eslint-disable-line no-undef

	// Create Function for start interval
	function startInterval() {
		// Start interval
		intervalId = setInterval(() => {
			// Text increment
			text++;
			// If text > 2 then text = 0
			if (text >= 3) text = 0;
			// Execute all 10 secondes
		}, 10000);
	}

	// Start interval
	startInterval();

	// Destroy interval when component destroyed
	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<!-- Display Hero -->
<section class="bg-secondaryGradient h-[50rem] max-h-[94svh]">
	<!-- Display Hero Information -->
	<div
		class="wrap h-full between px-12 gap-8 tablet:flex-col tablet:py-12 tablet:px-4 tablet:justify-evenly"
	>
		<!-- Display title and description -->
		<div class="column w-2/5 mini-desk:w-3/5 text-center gap-8 text-surface-500 tablet:w-full">
			<!-- Display title with Textwritter animation -->
			<Typewriter interval={60} cursor={false} unwriteInterval={0}>
				{#if text == 0}
					<h2 class="text-shadow-custom">Créez votre événement</h2>
				{:else if text == 1}
					<h2 class="text-shadow-custom">Rejoingnez un événement</h2>
				{:else if text == 2}
					<h2 class="text-shadow-custom">Créez votre Wish List</h2>
				{/if}
			</Typewriter>
			<!-- Display description with Textwritter animation -->
			<Typewriter interval={30} cursor={false} unwriteInterval={0}>
				{#if text == 0}
					<h4 class="text-shadow-custom tablet:text-xl">
						Pour Noël, un anniversaire ou tout autre occasion !
					</h4>
				{:else if text == 1}
					<h4 class="text-shadow-custom tablet:text-xl">
						Pour y participer et consulter l'organisation super simplement !
					</h4>
				{:else if text == 2}
					<h4 class="text-shadow-custom tablet:text-xl">
						Pour que votre famille et vos amis puissent vous rendre heureux !
					</h4>
				{/if}
			</Typewriter>
			<!-- Display button -->
			<a href="/connexion" class="nav px-12 py-2 bg-secondary-500 rounded-xl shadow-custom">
				Je commence
			</a>
		</div>
		<!-- Display mockup -->
		<div class="w-[719px] mini-desk:max-w-[400px] tablet:!w-full mockup">
			<img
				class="w-full"
				src="/mockup/mockup-evift.png"
				alt="Mockup du site EVIFT sur appareil mobile et tablette, montrant la page d'accueil avec un événement en vedette et une liste des événements à venir"
			/>
		</div>
	</div>
</section>

<style>
	.mockup {
		animation: bounce 7s infinite ease;
	}
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-30px) rotate(2deg);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
