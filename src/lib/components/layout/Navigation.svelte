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

	function handleBeforeInstallPrompt() {
		if (typeof window !== 'undefined') {
			installAvailable = true;
			localStorage.setItem('pwa_install_available', 'true');
		}
	}

	function handleAppInstalled() {
		installAvailable = false;
		localStorage.removeItem('pwa_install_available');
		localStorage.setItem('pwa_installed', 'true');
		goto('/evift/login');
	}

	onMount(() => {
		isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
		isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone ||
			(document.referrer || '').includes('android-app://');

		let currentPath = window.location.pathname;

		if (
			(isStandalone || localStorage.getItem('pwa_installed') === 'true') &&
			(currentPath === '/' || currentPath === '/details')
		) {
			goto('/evift/login');
		}

		if (localStorage.getItem('pwa_install_available') === 'true') {
			installAvailable = true;
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
		window.addEventListener('appinstalled', handleAppInstalled as EventListener);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
			window.removeEventListener('appinstalled', handleAppInstalled as EventListener);
		}
	});

	function triggerInstallFromNav() {
		if (!installAvailable || isIOS || isStandalone) return;
		window.dispatchEvent(new CustomEvent('pwa-install-trigger'));
	}
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
