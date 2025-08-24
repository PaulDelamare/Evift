<script>
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
</script>

<PageLayout padding="py-24 mt-12 flex flex-col justify-center">
	<section>
		<div class="p-2"><BackButton url={`/evift/login`} fillSvg="fill-primary-500" /></div>
		<div class="middle-wrap flex flex-col items-center text-center gap-8 px-4">
			<div>
				<h2 class="mb-4 font-bold text-primary">Mentions légales</h2>
				<p class="mb-4 text-lg text-tertiary w-full">
					Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en
					l'économie numérique, il est précisé aux utilisateurs du site Evift l'identité des
					différents intervenants dans le cadre de sa réalisation et de son suivi
				</p>
			</div>

			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Edition du site :
				</h3>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Le présent site, accessible à l’URL https://evift.fr (le « Site »), est édité par
						:
					</p>
					<p class="mb-4 text-lg text-tertiary w-full">
						Paul Delamare, résidant 16 bis rue Georges Brassens 76960 Notre Dame de Bondeville, de
						nationalité Française (France), né(e) le 20/06/2002,
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Hébergement :
				</h3>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Le Site est hébergé sur un Nas synology par l'entreprise Posware, situé 61 rue du mail 76000
						Rouen, (contact téléphonique ou email : +33781875226).
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Directeur de publication :
				</h3>
				<div class="text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Le Directeur de la publication du Site est Paul Delamare.
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Nous contacter :
				</h3>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Par téléphone : +33781875226 <br />
						Par email : paulodela2006@gmail.com <br />
						Par courrier : 16 bis rue Georges Brassens 76960 Notre Dame de Bondeville
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Données personnelles :
				</h3>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Le traitement de vos données à caractère personnel est régi par notre Charte du respect
						de la vie privée, disponible depuis la section "Charte de Protection des Données
						Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679
						du 27 avril 2016 («RGPD»).
					</p>
				</div>
			</div>
			<p>Génération des mentions légales par Legalstart.</p>
		</div>
	</section>
</PageLayout>
