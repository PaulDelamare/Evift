<script lang="ts">
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
</script>

<PageLayout padding="py-24 mt-12 flex flex-col justify-center">
	<section>
		<div class="p-2"><BackButton url={`/evift/login`} fillSvg="fill-primary-500" /></div>
		<div class="middle-wrap flex flex-col items-center gap-8 px-4">
			<div class="flex flex-col items-center gap-4">
				<h2 class="mb-4 font-bold text-primary">Politique de Confidentialité</h2>
				<p>En vigueur au 12/07/2024</p>
				<p class="mb-4 text-lg text-tertiary w-full">
					Cette politique de confidentialité décrit nos politiques et procédures relatives à la
					collecte, à l'utilisation et à la divulgation de vos informations lorsque vous utilisez le
					service et vous informe de vos droits à la vie privée et de la manière dont la loi vous
					protège.
				</p>
				<p>
					Nous utilisons vos données personnelles pour fournir et améliorer le service. En utilisant
					le Service, vous acceptez la collecte et l'utilisation d'informations conformément à la
					présente politique de confidentialité. Cette politique de confidentialité a été créée à
					l'aide du générateur de politique de confidentialité.
				</p>
			</div>

			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 font-bold text-primary w-full text-start">
					Interprétation et définitions :
				</h3>
				<h4 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Interprétation
				</h4>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Les mots dont la lettre initiale est en majuscule ont des significations définies dans
						les conditions suivantes. Les définitions suivantes auront la même signification
						qu’elles apparaissent au singulier ou au pluriel.
					</p>
				</div>
				<h4 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Définitions
				</h4>
				<p>Aux fins de cette politique de confidentialité :</p>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>
						<b>Compte</b> désigne un compte unique créé pour vous permettre d'accéder à notre service
						ou à des parties de notre service.
					</li>
					<li>
						<b>Société affiliée</b> désigne une entité qui contrôle, est contrôlée par ou est sous contrôle
						commun avec un parti, où « contrôle » désigne la propriété de 50 % ou plus des actions, participations
						ou autres titres donnant droit à voter pour l'élection d'administrateurs ou d'autres autorités
						de gestion. .
					</li>
					<li>
						<b>La Société</b> (appelée « la Société », « Nous », « Notre » ou « Notre » dans le présent
						Accord) fait référence à Evift.
					</li>
					<li>
						<b>Les cookies</b> sont de petits fichiers placés sur votre ordinateur, appareil mobile ou
						tout autre appareil par un site Web, contenant les détails de votre historique de navigation
						sur ce site Web parmi ses nombreuses utilisations.
					</li>
					<li>
						<b>Le pays</b> fait référence à : France
					</li>
					<li>
						<b>Appareil</b> désigne tout appareil pouvant accéder au Service tel qu'un ordinateur, un
						téléphone portable ou une tablette numérique.
					</li>
					<li>
						<b>Les données personnelles</b> sont toute information relative à une personne identifiée
						ou identifiable.
					</li>
					<li>
						<b>Service</b> fait référence au Site Internet.
					</li>
					<li>
						<b>Prestataire</b> désigne toute personne physique ou morale qui traite les données pour
						le compte de la Société. Il fait référence à des sociétés tierces ou à des personnes employées
						par la Société pour faciliter le Service, pour fournir le Service au nom de la Société, pour
						exécuter des services liés au Service ou pour aider la Société à analyser la manière dont
						le Service est utilisé.
					</li>
					<li>
						<b>Les Données d'Utilisation</b> font référence aux données collectées automatiquement, soit
						générées par l'utilisation du Service, soit à partir de l'infrastructure du Service elle-même
						(par exemple, la durée d'une visite d'une page).
					</li>
					<li>
						<b>Le site Web</b> fait référence à Evift, accessible depuis http://localhost:5173/
					</li>
					<li>
						<b>Vous</b> désignez la personne accédant ou utilisant le Service, ou la société ou autre
						entité juridique au nom de laquelle cette personne accède ou utilise le Service, selon le
						cas.
					</li>
				</ul>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h2>Collecte et utilisation de vos données personnelles</h2>
				<h3 class="self-start mb-4 font-bold text-primary w-full text-start">
					Types de données collectées :
				</h3>
				<h4 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Données personnelles
				</h4>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Lors de l'utilisation de notre service, nous pouvons vous demander de nous fournir
						certaines informations personnelles identifiables qui peuvent être utilisées pour vous
						contacter ou vous identifier. Les informations personnelles identifiables peuvent
						inclure, sans s’y limiter :
					</p>
				</div>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>Adresse e-mail</li>
					<li>Prénom et nom</li>
					<li>Des données d'utilisation</li>
				</ul>
				<h4 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Des données d'utilisation
				</h4>
				<p>
					Les données d'utilisation sont collectées automatiquement lors de l'utilisation du
					service.
				</p>
				<p>
					Les données d'utilisation peuvent inclure des informations telles que l'adresse de
					protocole Internet de votre appareil (par exemple, l'adresse IP), le type de navigateur,
					la version du navigateur, les pages de notre service que vous visitez, l'heure et la date
					de votre visite, le temps passé sur ces pages, l'appareil unique. identifiants et autres
					données de diagnostic.
				</p>
				<p>
					Lorsque vous accédez au Service via ou via un appareil mobile, nous pouvons collecter
					automatiquement certaines informations, notamment, mais sans s'y limiter, le type
					d'appareil mobile que vous utilisez, l'identifiant unique de votre appareil mobile,
					l'adresse IP de votre appareil mobile, votre système d'exploitation, le type de navigateur
					Internet mobile que vous utilisez, les identifiants uniques de l'appareil et d'autres
					données de diagnostic.
				</p>
				<p>
					Nous pouvons également collecter des informations que votre navigateur envoie chaque fois
					que vous visitez notre service ou lorsque vous accédez au service via ou via un appareil
					mobile.
				</p>
				<h4>Technologies de suivi et cookies</h4>
				<p>
					Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité
					sur notre service et stocker certaines informations. Les technologies de suivi utilisées
					sont des balises, des balises et des scripts pour collecter et suivre des informations et
					pour améliorer et analyser notre service. Les technologies que nous utilisons peuvent
					inclure :
				</p>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>
						<b>Cookies ou cookies de navigateur</b>. Un cookie est un petit fichier placé sur votre
						appareil. Vous pouvez demander à Votre navigateur de refuser tous les Cookies ou
						d'indiquer lorsqu'un Cookie est envoyé. Cependant, si vous n'acceptez pas les cookies,
						vous ne pourrez peut-être pas utiliser certaines parties de notre service. Sauf si vous
						avez ajusté les paramètres de votre navigateur afin qu'il refuse les cookies, notre
						service peut utiliser des cookies.
					</li>
					<li>
						<b>Balises Web</b>. Certaines sections de notre Service et nos e-mails peuvent contenir
						de petits fichiers électroniques appelés balises Web (également appelées gifs clairs,
						balises pixel et gifs à pixel unique) qui permettent à la Société, par exemple, de
						compter les utilisateurs qui ont visité ces pages. ou ouvert un e-mail et pour d'autres
						statistiques connexes sur le site Web (par exemple, enregistrer la popularité d'une
						certaine section et vérifier l'intégrité du système et du serveur).
					</li>
				</ul>
				<p>
					Les cookies peuvent être des cookies « persistants » ou « de session ». Les cookies
					persistants restent sur votre ordinateur personnel ou appareil mobile lorsque vous vous
					déconnectez, tandis que les cookies de session sont supprimés dès que vous fermez votre
					navigateur Web. Apprenez-en davantage sur les cookies dans l’ article du site Web
					Politiques de confidentialité .
				</p>
				<p>
					Nous utilisons à la fois des cookies de session et des cookies persistants aux fins
					énoncées ci-dessous :
				</p>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>
						<b>Cookies nécessaires/essentiels</b><br /><br />
						Type : Cookies de session<br /><br />
						Administré par : Nous <br /><br />
						Finalité : Ces Cookies sont indispensables pour Vous fournir les services disponibles sur
						le Site et pour Vous permettre d’utiliser certaines de ses fonctionnalités. Ils aident à
						authentifier les utilisateurs et à prévenir l'utilisation frauduleuse des comptes d'utilisateurs.
						Sans ces cookies, les services que vous avez demandés ne peuvent pas être fournis et nous
						utilisons ces cookies uniquement pour vous fournir ces services.
					</li>
				</ul>
				<p>
					Pour plus d'informations sur les cookies que nous utilisons et vos choix concernant les
					cookies, veuillez consulter notre Politique de cookies ou la section Cookies de notre
					Politique de confidentialité.
				</p>
				<h3>Utilisation de vos données personnelles</h3>
				<p>La Société peut utiliser les Données Personnelles aux fins suivantes</p>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>
						<b>Pour fournir et maintenir notre service</b> , y compris pour surveiller l'utilisation
						de notre service.
					</li>
					<li>
						<b>Pour gérer Votre Compte</b> : pour gérer Votre inscription en tant qu'utilisateur du Service.
						Les Données Personnelles que Vous fournissez peuvent Vous donner accès à différentes fonctionnalités
						du Service qui Vous sont accessibles en tant qu'utilisateur enregistré.
					</li>
					<li>
						<b>Pour l'exécution d'un contrat</b> : l'élaboration, le respect et l'exécution du contrat
						d'achat des produits, articles ou services que vous avez achetés ou de tout autre contrat
						avec nous via le Service.
					</li>
					<li>
						<b>Pour vous contacter</b> : pour vous contacter par e-mail, appels téléphoniques, SMS ou
						autres formes de communication électronique équivalentes, telles que les notifications push
						d'une application mobile concernant les mises à jour ou les communications informatives liées
						aux fonctionnalités, produits ou services souscrits, y compris les mises à jour de sécurité,
						lorsque cela est nécessaire ou raisonnable pour leur mise en œuvre.
					</li>
					<li>
						<b>Pour vous fournir des actualités</b>, des offres spéciales et des informations
						générales sur d'autres biens, services et événements que nous proposons et similaires à
						ceux que vous avez déjà achetés ou sur lesquels vous avez demandé des renseignements, à
						moins que vous ayez choisi de ne pas recevoir de telles informations.
					</li>
					<li>
						<b>Pour gérer vos demandes</b> : Pour répondre et gérer vos demandes auprès de nous.
					</li>
					<li>
						<b>Pour les transferts d'entreprise</b> : nous pouvons utiliser vos informations pour évaluer
						ou procéder à une fusion, une cession, une restructuration, une réorganisation, une dissolution
						ou toute autre vente ou transfert de tout ou partie de nos actifs, que ce soit dans le cadre
						d'une activité en activité ou dans le cadre d'une faillite, d'une liquidation, ou une procédure
						similaire, dans laquelle les données personnelles que nous détenons sur les utilisateurs
						de nos services font partie des actifs transférés.
					</li>
					<li>
						<b>À d'autres fins</b> : nous pouvons utiliser vos informations à d'autres fins, telles que
						l'analyse de données, l'identification des tendances d'utilisation, la détermination de l'efficacité
						de nos campagnes promotionnelles et l'évaluation et l'amélioration de notre service, de nos
						produits, de nos services, de notre marketing et de votre expérience.
					</li>
				</ul>
				<p>Nous pouvons partager vos informations personnelles dans les situations suivantes :</p>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>
						<b>Avec les fournisseurs de services</b> : nous pouvons partager vos informations personnelles
						avec des fournisseurs de services pour surveiller et analyser l'utilisation de notre service
						et pour vous contacter.
					</li>
					<li>
						<b>Pour les transferts d'entreprise</b> : nous pouvons partager ou transférer vos informations
						personnelles dans le cadre de ou pendant les négociations de toute fusion, vente d'actifs
						de la société, financement ou acquisition de tout ou partie de notre entreprise à une autre
						société.
					</li>
					<li>
						<b>Avec les affiliés</b> : nous pouvons partager vos informations avec nos affiliés, auquel
						cas nous demanderons à ces affiliés de respecter cette politique de confidentialité. Les
						sociétés affiliées comprennent notre société mère et toutes autres filiales, partenaires
						de coentreprise ou autres sociétés que nous contrôlons ou qui sont sous contrôle commun avec
						nous.
					</li>
					<li>
						<b>Avec des partenaires commerciaux</b> : nous pouvons partager vos informations avec nos
						partenaires commerciaux pour vous proposer certains produits, services ou promotions.
					</li>
					<li>
						<b>Avec d'autres utilisateurs</b> : lorsque vous partagez des informations personnelles ou
						interagissez de toute autre manière dans les espaces publics avec d'autres utilisateurs,
						ces informations peuvent être consultées par tous les utilisateurs et peuvent être diffusées
						publiquement à l'extérieur.
					</li>
					<li>
						<b>Avec votre consentement</b> : Nous pouvons divulguer vos informations personnelles à toute
						autre fin avec votre consentement.
					</li>
				</ul>
				<h3>Conservation de vos données personnelles</h3>
				<p>
					La Société conservera vos données personnelles uniquement aussi longtemps que nécessaire
					aux fins énoncées dans la présente politique de confidentialité. Nous conserverons et
					utiliserons vos données personnelles dans la mesure nécessaire pour nous conformer à nos
					obligations légales (par exemple, si nous sommes tenus de conserver vos données pour nous
					conformer aux lois applicables), résoudre les litiges et faire respecter nos accords et
					politiques juridiques.
				</p>
				<p>
					La Société conservera également les données d'utilisation à des fins d'analyse interne.
					Les données d'utilisation sont généralement conservées pendant une période plus courte,
					sauf lorsque ces données sont utilisées pour renforcer la sécurité ou pour améliorer la
					fonctionnalité de notre service, ou lorsque nous sommes légalement tenus de conserver ces
					données pendant des périodes plus longues.
				</p>
				<h3>Transfert de vos données personnelles</h3>
				<p>
					Vos informations, y compris vos données personnelles, sont traitées dans les bureaux
					opérationnels de la Société et dans tout autre endroit où se trouvent les parties
					impliquées dans le traitement. Cela signifie que ces informations peuvent être transférées
					vers – et conservées sur – des ordinateurs situés en dehors de votre état, province, pays
					ou autre juridiction gouvernementale où les lois sur la protection des données peuvent
					différer de celles de votre juridiction.
				</p>
				<p>
					Votre consentement à cette politique de confidentialité suivi de votre soumission de ces
					informations représente votre accord à ce transfert.
				</p>
				<p>
					La Société prendra toutes les mesures raisonnablement nécessaires pour garantir que vos
					données sont traitées de manière sécurisée et conformément à la présente politique de
					confidentialité et aucun transfert de vos données personnelles n'aura lieu vers une
					organisation ou un pays à moins que des contrôles adéquats ne soient en place, y compris
					la sécurité de Vos données et autres informations personnelles.
				</p>
				<h3>Supprimez vos données personnelles</h3>
				<p>
					Vous avez le droit de supprimer ou de demander que nous vous aidions à supprimer les
					données personnelles que nous avons collectées à votre sujet.
				</p>
				<p>
					Notre Service peut vous donner la possibilité de supprimer certaines informations vous
					concernant du Service.
				</p>
				<p>
					Vous pouvez mettre à jour, modifier ou supprimer vos informations à tout moment en vous
					connectant à votre compte, si vous en avez un, et en visitant la section des paramètres du
					compte qui vous permet de gérer vos informations personnelles. Vous pouvez également nous
					contacter pour demander l'accès, la correction ou la suppression de toute information
					personnelle que vous nous avez fournie.
				</p>
				<p>
					Veuillez toutefois noter que nous pouvons être amenés à conserver certaines informations
					lorsque nous avons une obligation légale ou une base légale de le faire
				</p>
				<h3>Divulgation de vos données personnelles</h3>
				<h4>Transactions commerciales</h4>
				<p>
					Si la Société est impliquée dans une fusion, une acquisition ou une vente d'actifs, vos
					données personnelles peuvent être transférées. Nous vous informerons avant que vos données
					personnelles ne soient transférées et ne soient soumises à une politique de
					confidentialité différente.
				</p>
				<h4>Forces de l'ordre</h4>
				<p>
					Dans certaines circonstances, la Société peut être tenue de divulguer vos données
					personnelles si la loi l'y oblige ou en réponse à des demandes valables des autorités
					publiques (par exemple un tribunal ou un organisme gouvernemental).
				</p>
				<h4>Autres exigences légales</h4>
				<p>
					La Société peut divulguer vos données personnelles en croyant de bonne foi qu'une telle
					action est nécessaire pour :
				</p>
				<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
					<li>Se conformer à une obligation légale</li>
					<li>Protéger et défendre les droits ou les biens de la Société</li>
					<li>
						Prévenir ou enquêter sur d'éventuels actes répréhensibles en relation avec le Service
					</li>
					<li>Protéger la sécurité personnelle des Utilisateurs du Service ou du public</li>
					<li>Se protéger contre la responsabilité légale</li>
				</ul>
				<h3>Sécurité de vos données personnelles</h3>
				<p>
					La sécurité de vos données personnelles est importante pour nous, mais n'oubliez pas
					qu'aucune méthode de transmission sur Internet ni aucune méthode de stockage électronique
					n'est sécurisée à 100 %. Bien que nous nous efforcions d'utiliser des moyens
					commercialement acceptables pour protéger vos données personnelles, nous ne pouvons
					garantir leur sécurité absolue.
				</p>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h2 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Confidentialité des enfants :
				</h2>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Notre service ne s'adresse pas aux personnes de moins de 13 ans. Nous ne collectons
						sciemment aucune information personnelle identifiable auprès de toute personne de moins
						de 13 ans. Si vous êtes un parent ou un tuteur et que vous savez que votre enfant nous a
						fourni des données personnelles, veuillez Contactez-nous. Si nous apprenons que nous
						avons collecté des données personnelles auprès d'une personne de moins de 13 ans sans
						vérification du consentement parental, nous prenons des mesures pour supprimer ces
						informations de nos serveurs.
					</p>
					<p>
						Si nous devons nous fier au consentement comme base légale pour le traitement de vos
						informations et que votre pays exige le consentement d'un parent, nous pouvons exiger le
						consentement de votre parent avant de collecter et d'utiliser ces informations.
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Liens vers d'autres sites Web :
				</h3>
				<div class="text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Notre Service peut contenir des liens vers d'autres sites Web qui ne sont pas exploités
						par Nous. Si vous cliquez sur un lien tiers, vous serez dirigé vers le site de ce tiers.
						Nous vous conseillons fortement de consulter la politique de confidentialité de chaque
						site que vous visitez.
					</p>
					<p>
						Nous n'avons aucun contrôle et n'assumons aucune responsabilité quant au contenu, aux
						politiques de confidentialité ou aux pratiques de tout site ou service tiers
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Modifications de cette politique de confidentialité :
				</h3>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous
						vous informerons de tout changement en publiant la nouvelle politique de confidentialité
						sur cette page.
					</p>
					<p>
						Nous vous en informerons par e-mail et/ou par un avis bien visible sur notre service,
						avant que le changement n'entre en vigueur et mettrons à jour la date de « Dernière mise
						à jour » en haut de cette politique de confidentialité.
					</p>
					<p>
						Il vous est conseillé de consulter périodiquement cette politique de confidentialité
						pour tout changement. Les modifications apportées à cette politique de confidentialité
						entrent en vigueur dès leur publication sur cette page.
					</p>
				</div>
			</div>
			<div class="bar bg-tertiary-500 h-[1px] max-w-[600px]"></div>
			<div class="w-full flex flex-col">
				<h3 class="self-start mb-4 text-2xl font-bold text-primary w-full text-start">
					Contactez-nous :
				</h3>
				<div class=" text-justify">
					<p class="mb-4 text-lg text-tertiary w-full">
						Si vous avez des questions concernant cette politique de confidentialité, vous pouvez
						nous contacter :
					</p>
					<ul class="!list-disc flex flex-col gap-4 !items-start !text-justify">
						<li>Par email : paulodela2006@gmail.com</li>
					</ul>
					<p>Généré à l'aide du générateur de politiques de confidentialité</p>
				</div>
			</div>
		</div>
	</section>
</PageLayout>
