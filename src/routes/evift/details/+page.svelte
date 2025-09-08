<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LogoSvg from '$lib/components/extra/logo/LogoSvg.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import { onMount } from 'svelte';

	onMount(() => {
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
		const isStandalone =
			(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
			(window.navigator as any).standalone;

		let localFlag: string | null = null;
		try {
			localFlag = localStorage.getItem('pwa-redirect-once');
		} catch (e) {
			localFlag = null;
		}

		let cookieFlag: string | null = null;
		try {
			const match = document.cookie
				.split(';')
				.map((c) => c.trim())
				.find((c) => c.startsWith('pwa_installed='));
			if (match) cookieFlag = match.split('=')[1] ?? null;
		} catch (e) {
			cookieFlag = null;
		}

		if (isStandalone && (localFlag === '1' || cookieFlag === '1')) {
			try {
				localStorage.removeItem('pwa-redirect-once');
			} catch (e) {}
			try {
				document.cookie = 'pwa_installed=; path=/; max-age=0';
			} catch (e) {}

			goto('/evift/login', { replaceState: true });
		}

		if ($page.url.pathname === '/' && $page.data.user) {
			goto('/auth/event');
		}
	});
</script>

<PageLayout padding="py-8">
	<section class="bg-gradient py-4 {$innerWidthStore < 1151 ? 'pt-20' : ''}" slot="hero">
		<div class="wrap px-4 py-12 flex justify-center">
			<h1
				class=" text-[3.5rem] text-surface-500 !drop-shadow-2xl [text-shadow:_1px_1px_5px_rgba(0,0,0,0.5)]"
			>
				Evift
			</h1>
		</div>
	</section>
	<section>
		<div class="flex px-4 middle-wrap items-center justify-center">
			<div
				class=" flex flex-col gap-4 text-center max-w-[700px] text-xl !font-medium items-center text-primary-700 mobile-large:!text-base"
			>
				<div class="flex flex-col gap-4 items-center">
					<LogoSvg fill="fill-[url(#paint0_linear_2)]" widthSvg={75} />
					<h3 class="text-gradient uppercase">Qui sommes nous ?</h3>
				</div>

				<p class="!font-slab">
					Evift a été crée seul. Je m'appelle Paul Delamare et j'ai eu envie d'améliorer les gestion
					des événement pour donner envies à toutes les personnes de se réunir plus souvent.
				</p>
				<p class="!font-slab">
					Etudiant en développement web depuis 2022, je me suis pris de passion pour le codage. Dans
					le cadre de mon projet final pour passer un premier diplôme, j'ai eu comme idée de
					réaliser un site qui peut avoir une réel utilisation derrière. Bien évidement pouvoir
					concrétiser un projet est toujours plus satisfaisant pour rentabiliser les heures de
					travailles qui ont pu faire vivre se site.
				</p>
			</div>
		</div>
	</section>
	<section>
		<div class="middle-wrap px-4 flex flex-col items-center gap-4">
			<h2 class="text-center text-primary-500">Pourquoi Evift ?</h2>
			<div class="bar bg-primary-500"></div>
			<div
				class="flex gap-8 items-center !font-medium text-primary-700 mini-desk:flex-col mobile-large:!text-base"
			>
				<div class="w-2/4 mini-desk:w-4/5 mobile-large:w-full">
					<img class="w-full" src="/img/famille.jpeg" alt="Famille" />
				</div>
				<div
					class="w-2/4 !font-slab flex flex-col gap-4 text-justify mini-desk:w-4/5 mini-desk:text-center mobile-large:w-full"
				>
					<p>
						Evift, tout d'abord, vient de deux mots Event (événement en français) et Gift (cadeau en
						français). Mais pourquoi ce nom ?
					</p>
					<p>
						Tout simplement par ce qu'Evift a pour ambition d'améliorer et rénover la manière
						d'organiser des événements en simplifiant la gestion des cadeaux.
					</p>
					<p>
						Avant Evift, dans ma famille organisais des réveillons de Noël avec un groupe de
						message. Chacun mettait sa liste de cadeaux en message et il arrivait plutôt souvent que
						plusieurs personnes prennent les mêmes cadeaux. Evift intègre donc un système permettant
						de savoir quelle est la liste de cadeaux de la personne et surtout qu'elles sont les
						cadeaux qui ont déjà été pris par un autre membre de la famille.
					</p>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="middle-wrap px-4 flex flex-col items-center gap-4">
			<h2 class="text-center text-primary-500">Le futur d'Evift</h2>
			<div class="bar bg-primary-500"></div>
			<div
				class="flex gap-8 flex-row-reverse items-center !font-medium text-primary-700 mini-desk:flex-col"
			>
				<div class="w-1/4 mobile-large:w-full">
					<img class="w-full" src="/img/futur.jpg" alt="Famille" />
				</div>
				<div
					class="w-3/4 !font-slab flex flex-col gap-4 text-justify mini-desk:text-center mobile-large:!text-base mobile-large:w-full"
				>
					<p>J'aimerais vous faire part de ma vision du futur d'Evift.</p>
					<p>
						Evift est une application fonctionnelle qui permet la création d’événements et le
						partage de sa liste de cadeaux. Il est possible d'ajouter un lien à la liste de cadeaux.
						Si quelqu'un décide d'aller directement en magasin pour acheter le cadeau, il est plus
						pratique d'avoir une application mobile pour regarder la liste.
					</p>
					<p>
						Aujourd'hui, il est possible de discuter avec les participants afin d'organiser
						l'événement, mais il serait plus pratique d'avoir des options de gestion en plus.
						J'aimerais ajouter un endroit pour préciser les choses à ramener pour l'événement, comme
						des boissons ou biscuits apéritifs, et mieux organiser et visualiser ce qu'il y aura
						pour la soirée. Ajouter des widgets qui pourraient permettre de réaliser des sondages et
						de gérer l'événement.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="flex px-4 middle-wrap items-center justify-center">
			<div
				class=" flex flex-col gap-4 text-center max-w-[700px] text-xl !font-medium items-center text-primary-700 mobile-large:!text-base"
			>
				<div class="bar bg-primary-500"></div>

				<p class="!font-slab">J'espère sincèrement que le site Evift vous conviendra.</p>
				<p class="!font-slab">
					Il est possible qu'il y ait des bugs et des problèmes de temps en temps, je vous remercie
					de votre compréhension concernant ceux-ci. Je ferai de mon mieux pour y remédier.
				</p>
				<p>
					Il y a sur le site un formulaire de contact qui vous permet de me contacter pour toute
					sorte de problème ou des idées d'amélioration. Je ferai de mon mieux pour pouvoir vous
					offrir la meilleure expérience possible.
				</p>
			</div>
		</div>
	</section>
</PageLayout>
