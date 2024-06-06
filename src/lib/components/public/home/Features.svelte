<script>
	// Features in Box
	const features = [
		{
			title: 'Crée ton événement',
			description:
				'Crée ton événement et ajoutes-y ta famille ou tes amis. Il ne te restera plus qu’à utiliser les outils pour le gérer avec toute simplicité.',
			img: '/svg/home/features/add.svg'
		},
		{
			title: 'Rejoins un événement',
			description:
				'Accepte l’invitation que tu as reçue pour participer à un événement pour accéder à toutes les informations de celui-ci.',
			img: '/svg/home/features/join.svg'
		},
		{
			title: 'Gère ta liste de cadeaux',
			description:
				'Crée ta liste de cadeaux pour que les autres membres de l’événement puissent accéder à celle-ci pour recevoir une belle surprise !',
			img: '/svg/home/features/list.svg'
		}
	];
</script>

<!-- Features Bloc -->
<section>
	<!-- Features Container -->
	<div class="wrap between px-8 flex-wrap gap-y-12 gap-x-8">
		<!-- For each feature -->
		{#each features as feature}
			<!-- Display feature in box with icon, title and description -->
			<div
				class="size-96 mobile-large:size-80 mobile:size-72 mobile-large:px-4 bg-[linear-gradient(145deg,#cacaca,#f0f0f0)] rounded-3xl shadow-[38px_38px_77px_#bebebe,-38px_-38px_77px_#ffffff] column p-6 justify-center gap-8 hover:scale-[1.02] custom-transition mx-auto"
			>
				<!-- SVG And Title -->
				<div class="flex items-center gap-3 text-center mobile:gap-2">
					<div>
						<img class="w-full" src={feature.img} alt="Icone de {feature.title}" />
					</div>
					<h4>{feature.title}</h4>
				</div>
				<!-- Description -->
				<p class="information text-gradient text-center mobile:text-base">{feature.description}</p>
			</div>
		{/each}
	</div>
</section>
