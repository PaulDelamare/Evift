<script lang="ts">
	// Variable
	// All Stape with number and description
	const stapes = [
		{
			number: '01',
			description: 'Je crée gratuitement mon compte Evift'
		},
		{
			number: '02',
			description: 'J’ajoute ma famille ou mes amis en “Amis”'
		},
		{
			number: '03',
			description: 'Je crée mon évènement en ajoutant mes amis à cette évènement'
		},
		{
			number: '04',
			description: 'Je gère de manière simplifier mon évènement pour qu’il se déroule au mieux'
		}
	];
</script>

<!-- Section Stape -->
<section>
	<!-- Wrap Stape -->
	<div
		class="wrap w-full between items-start px-8 mini-desk:flex-col mini-desk:gap-12 mini-tablet:px-4"
	>
		<!-- Display Title -->
		<h3 class="w-2/6 mini-desk:w-full mini-desk:text-center">
			Votre évènement crée en <b class="text-gradient">quatres étapes</b>
		</h3>
		<!-- Display Stape -->
		<div class="w-3/5 column gap-6 mini-desk:w-full">
			<!-- For each stape -->
			{#each stapes as stape}
				<!-- Display Stape -->
				<!-- First div for border linear graident -->
				<div class="bg-gradient p-[2px] w-full rounded-lg hover:scale-105 custom-transition">
					<!-- Second for the content -->
					<div
						class="w-full flex items-center gap-6 bg-surface-500 px-8 py-4 rounded-[calc(0.5rem_-_2px)] min-h-24 mini-tablet:px-4"
					>
						<!-- Display number -->
						<p class="number">{stape.number}</p>
						<!-- Display description -->
						<p class="information mini-tablet:text-base">{stape.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
