<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { getModalStore, type ModalStore } from '@skeletonlabs/skeleton';
	import renderModal from '$lib/functions/modal/renderModal';
	import { goto } from '$app/navigation';

	export let ulClass = '';
	export let liClass = '';
	export let aClass = '';
	export let navClass = '';
	export let mobile = false;
	export let contact = false;
	export let hover = false;
	export let hoverFooter = false;
	export let responsive = false;

	// Nouveau : contrôle si on veut afficher le bouton install
	export let showInstall = false;

	$: user = $page.data.user;
	$: notificationFriends = $page.data.notificationFriends as number;
	$: notificationEvents = $page.data.notificationEvents as number;

	$: totalNotification = notificationEvents + notificationFriends;

	$: if (user && user.firstLogin) {
		totalNotification = 2;
	} else if (user && !user.firstLogin) {
		totalNotification = notificationEvents + notificationFriends;
	}

	let nav: { text: string; path: string; start: boolean; id: string }[] = [];

	$: if (!user) {
		nav = [
			{ text: 'Accueil', path: '/', start: false, id: 'home-unauth' },
			{ text: 'Qui Sommes-Nous ?', path: '/evift/details', start: true, id: 'about-unauth' },
			{ text: 'Inscription/Connexion', path: '/evift/login', start: true, id: 'login-unauth' }
		];
	} else {
		nav = [
			{ text: 'Evénements', path: '/auth/event', start: true, id: 'event-auth' },
			{ text: 'Liste des cadeaux', path: '/auth/gift', start: true, id: 'gift-auth' },
			{ text: 'Invitation', path: '/auth/invitation', start: true, id: 'invitation-auth' },
			{ text: 'Amis', path: '/auth/friends', start: true, id: 'friends-auth' }
		];
	}

	const dispatch = createEventDispatcher();

	const ulC = `flex items-end ${ulClass}`;
	const liC = `${liClass}`;
	const aC = `nav ${aClass} ${hover ? 'hover:!text-gradient hover:!duration-300' : ''} ${hoverFooter ? 'hover:!text-surface-700 hover:!duration-300' : ''}`;
	const navC = `${navClass}`;

	const changePage = (): void => {
		dispatch('changePage');
	};

	const modalStore: ModalStore = getModalStore();

	let installAvailable = false;
	let isIOS = false;
	let isStandalone = false;
	let isMobile = false;

	// Détection robuste - retourne vrai seulement si le navigateur indique explicitement standalone
	function isStandaloneMode(): boolean {
		if (typeof window === 'undefined') return false;
		const navAny = window.navigator as any;
		try {
			const mm = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
			const navStandalone = navAny.standalone === true;
			const referrerAndroid = (document.referrer || '').startsWith('android-app://');
			return !!(mm || navStandalone || referrerAndroid);
		} catch (e) {
			return false;
		}
	}

	// Handler beforeinstallprompt : stocke l'event pour déclenchement manuel plus tard
	function handleBeforeInstallPrompt(e: Event) {
		if (typeof window === 'undefined') return;
		(window as any).__pwa_deferred_prompt = e;
		installAvailable = true;
		try {
			sessionStorage.setItem('pwa_install_available', 'true');
		} catch (err) {}
		console.debug('[PWA] beforeinstallprompt received — installAvailable=true');
	}

	// Handler appinstalled : on marque l'installation, mais on ne redirige QUE si on est réellement en standalone
	function handleAppInstalled() {
		installAvailable = false;
		try {
			sessionStorage.removeItem('pwa_install_available');
			localStorage.setItem('pwa_installed', 'true'); // uniquement info, ne déclenche pas la redirection à lui seul
		} catch (err) {}
		console.debug('[PWA] appinstalled event — stored pwa_installed=true');

		// redirige uniquement si le navigateur est réellement en standalone
		if (isStandaloneMode()) {
			console.debug('[PWA] confirmed standalone after install -> redirect to /evift/login');
			goto('/evift/login');
		} else {
			console.debug('[PWA] appinstalled but not standalone -> no redirect');
		}
	}

	// déclenche l'installation depuis le nav (bouton)
	async function triggerInstallFromNav() {
		if (!installAvailable || isIOS || isStandalone) return;

		const deferred = (window as any).__pwa_deferred_prompt;
		if (deferred && typeof deferred.prompt === 'function') {
			try {
				await deferred.prompt();
				// attendre userChoice si présent
				if (deferred.userChoice && typeof deferred.userChoice.then === 'function') {
					const choice = await deferred.userChoice;
					console.debug('[PWA] userChoice', choice);
				}
				(window as any).__pwa_deferred_prompt = undefined;
				installAvailable = false;
				try { sessionStorage.removeItem('pwa_install_available'); } catch (e) {}
			} catch (err) {
				// fallback : dispatch un event custom pour que d'autres handlers s'en occupent
				window.dispatchEvent(new CustomEvent('pwa-install-trigger'));
			}
		} else {
			// fallback
			window.dispatchEvent(new CustomEvent('pwa-install-trigger'));
		}
	}

	onMount(() => {
		isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
		isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
		isStandalone = isStandaloneMode();

		let currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

		// chemins où l'on souhaite forcer la redirection depuis la PWA
		const pathsToRedirect = new Set(['/','/evift','/evift/','/evift/details','/details']);

		// NOTE IMPORTANTE : on **NE** redirige plus juste parce que localStorage.pwa_installed === 'true'.
		// On redirige uniquement si le navigateur indique le mode standalone (vraie PWA context).
		const shouldRedirect = isStandalone; // strict

		// Debug : affiche les valeurs pour comprendre ce qui change quand tu ouvres l'inspecteur
		console.debug('[PWA] onMount debug:',
			{ currentPath, isMobile, isIOS, isStandalone, localStorage_pwa_installed: (() => { try { return localStorage.getItem('pwa_installed'); } catch (e) { return 'err'; } })(),
			  session_pwa_install_available: (() => { try { return sessionStorage.getItem('pwa_install_available'); } catch (e) { return 'err'; } })(),
			  userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'no-nav' }
		);

		if (shouldRedirect && pathsToRedirect.has(currentPath)) {
			console.debug('[PWA] redirect condition met -> goto /evift/login');
			goto('/evift/login');
		} else {
			console.debug('[PWA] redirect condition NOT met -> stay');
		}

		// restore installAvailable depuis session (UI)
		try {
			if (sessionStorage.getItem('pwa_install_available') === 'true') {
				installAvailable = true;
			}
		} catch (err) {}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
		window.addEventListener('appinstalled', handleAppInstalled as EventListener);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
			window.removeEventListener('appinstalled', handleAppInstalled as EventListener);
		}
	});
</script>

<nav class={navC}>
	<ul class={ulC}>
		{#each nav as item}
			<li
				id="{item.id}{responsive ? '-responsive' : ''}"
				class="{liC} {item.text === 'Invitation' && !contact ? 'relative' : ''} {item.text ===
					'Invitation' &&
				!contact &&
				totalNotification > 0 &&
				!responsive
					? 'pt-2 pr-6'
					: ''}"
			>
				<a
					on:click={changePage}
					aria-current={item.start && !hoverFooter
						? $page.url.pathname.startsWith(item.path)
							? mobile
								? 'location'
								: 'page'
							: undefined
						: $page.url.pathname === item.path && !hoverFooter
							? mobile
								? 'location'
								: 'page'
							: undefined}
					class={aC}
					href={item.path}
				>
					{item.text}
				</a>
				{#if item.text === 'Invitation' && !contact && totalNotification > 0}
					<div
						id="notificationNumber"
						class="absolute -z-10 -top-[0px] leading-none p-2 -right-[0px] text-surface-500 bg-secondary-500/80 size-6 flex justify-center items-center rounded-full {responsive
							? 'bg-surface-500 !text-secondary-500 left-[65%] top-1/4'
							: ''}"
					>
						<span>
							{totalNotification < 9 ? totalNotification : '9+'}
						</span>
					</div>
				{/if}
			</li>
		{/each}

		{#if user && !contact}
			<form class={liC} action="/evift/login?/logout" method="POST">
				<button class={aC} type="submit"> Déconnexion </button>
			</form>
		{/if}

		{#if contact}
			<li class={liC}>
				<button
					on:click={() => renderModal(modalStore, 'ContactModal', 'Contact', 'Contactez nous')}
					class={aC}
				>
					Contact
				</button>
			</li>
		{/if}

		{#if showInstall && installAvailable && !isIOS && !isStandalone}
			<li class={liC}>
				<button on:click={triggerInstallFromNav} class={aC} aria-label="Installer l'application">
					Installer l'application
				</button>
			</li>
		{/if}
	</ul>
</nav>
