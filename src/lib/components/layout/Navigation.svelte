<script lang="ts">
	// Imports
	// import page for know url
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	// IMPORT
	// Import Modal Store
	import {
		getModalStore,
		// getToastStore,
		type ModalStore
		// type ToastStore
	} from '@skeletonlabs/skeleton';
	import renderModal from '$lib/functions/modal/renderModal';

	// Import vraiable
	export let ulClass = '';
	export let liClass = '';
	export let aClass = '';
	export let navClass = '';
	export let mobile = false;
	export let contact = false;
	export let hover = false;
	export let hoverFooter = false;

	$: user = $page.data.user;
	$: notificationFriends = $page.data.notificationFriends as number;
	$: notificationEvents = $page.data.notificationEvents as number;

	$: totalNotification = notificationEvents + notificationFriends;

	// Variable for the navigation
	// Define text to display, path and start for know if the active need to start with this url or need to be the same
	let nav: { text: string; path: string; start: boolean; id: string }[] = [];

	$: if (!user) {
		nav = [
			{
				text: 'Accueil',
				path: '/',
				start: false,
				id: 'home-unauth'
			},
			{
				text: 'Qui Sommes-Nous ?',
				path: '/evift/details',
				start: true,
				id: 'about-unauth'
			},
			{
				text: 'Inscription/Connexion',
				path: '/evift/login',
				start: true,
				id: 'login-unauth'
			}
		];
	} else {
		nav = [
			{
				text: 'Evénements',
				path: '/auth/event',
				start: true,
				id: 'event-auth'
			},
			{
				text: 'Liste des cadeaux',
				path: '/auth/gift',
				start: true,
				id: 'gift-auth'
			},
			{
				text: 'Invitation',
				path: '/auth/invitation',
				start: true,
				id: 'invitation-auth'
			},
			{
				text: 'Amis',
				path: '/auth/friends',
				start: true,
				id: 'friends-auth'
			}
		];
	}

	// Get Dispacth for create on:event
	const dispatch = createEventDispatcher();

	// Create Class
	const ulC = `flex items-center ${ulClass}`;
	const liC = `${liClass}`;
	const aC = `nav ${aClass} ${hover ? 'hover:!text-gradient hover:!duration-300' : ''} ${hoverFooter ? 'hover:!text-surface-700 hover:!duration-300' : ''}`;
	const navC = `${navClass}`;

	// Functions
	/**
	 * Emits a "changePage" event when a click is detected.
	 *
	 * @return {void} This function does not return anything.
	 */
	const changePage = (): void => {
		// Emit the "click" event
		dispatch('changePage');
	};

	const modalStore: ModalStore = getModalStore();
</script>

<!-- Bloc Navigation -->
<nav class={navC}>
	<!-- Define ul for list -->
	<ul class={ulC}>
		<!-- Display all link -->
		{#each nav as item}
			<li id="{item.id}" class="{liC} {item.text === 'Invitation' && !contact ? 'relative' : ''}">
				<!-- If start is true, display link as active -->
				<!-- Define different active style for mobile and desktop -->
				<a
					on:click={changePage}
					aria-current={item.start
						? $page.url.pathname.startsWith(item.path)
							? mobile
								? 'location'
								: 'page'
							: undefined
						: $page.url.pathname === item.path
							? mobile
								? 'location'
								: 'page'
							: undefined}
					class={aC}
					href={item.path}
				>
					<!-- Display text Link -->
					{item.text}
				</a>
				<!-- If the navigation is Invitation, display notification -->
				{#if item.text === 'Invitation' && !contact && totalNotification > 0}
					<div
						class="absolute -z-10 -top-[10px] leading-none p-2 -right-[17px] text-surface-500 bg-secondary-500/80 size-6 flex justify-center items-center rounded-full"
					>
						<!-- Display number in circle -->
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
		<!-- TODO Create component for Contact in modal -->
		<!-- If Contact is true, display contact link -->
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
	</ul>
</nav>
