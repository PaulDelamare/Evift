<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { getModalStore, type ModalStore } from '@skeletonlabs/skeleton';
	import renderModal from '$lib/functions/modal/renderModal';

	export let ulClass = '';
	export let liClass = '';
	export let aClass = '';
	export let navClass = '';
	export let mobile = false;
	export let contact = false;
	export let hover = false;
	export let hoverFooter = false;
	export let responsive = false;

	$: user = $page.data.user;
	$: notificationFriends = $page.data.notificationFriends as number;
	$: notificationEvents = $page.data.notificationEvents as number;

	$: totalNotification = notificationEvents + notificationFriends;

	$: if (user && user.firstLogin) {
		totalNotification = 2;
	}

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

	const dispatch = createEventDispatcher();

	const ulC = `flex items-end ${ulClass}`;
	const liC = `${liClass}`;
	const aC = `nav ${aClass} ${hover ? 'hover:!text-gradient hover:!duration-300' : ''} ${hoverFooter ? 'hover:!text-surface-700 hover:!duration-300' : ''}`;
	const navC = `${navClass}`;

	/**
	 * Emits a "changePage" event when a click is detected.
	 *
	 * @return {void} This function does not return anything.
	 */
	const changePage = (): void => {
		dispatch('changePage');
	};

	const modalStore: ModalStore = getModalStore();
</script>

<nav class={navC}>
	<ul class={ulC}>
		{#each nav as item}
			<li id="{item.id}{responsive ? "-responsive" : ""}" class="{liC} {item.text === 'Invitation' && !contact ? 'relative' : ''} {item.text === 'Invitation' && !contact && totalNotification > 0 ? 'pt-2 pr-6' : ''}">
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
					{item.text}
				</a>
				{#if item.text === 'Invitation' && !contact && totalNotification > 0}
					<div
						id="notificationNumber"
						class="absolute -z-10 -top-[0px] leading-none p-2 -right-[0px] text-surface-500 bg-secondary-500/80 size-6 flex justify-center items-center rounded-full"
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
	</ul>
</nav>
