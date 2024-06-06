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

	// Variable for the navigation
	// Define text to display, path and start for know if the active need to start with this url or need to be the same
	const nav = [
		{
			text: 'Accueil',
			path: '/',
			start: false
		},
		{
			text: 'Qui Sommes-Nous ?',
			path: '/details',
			start: true
		},
		{
			text: 'Inscription/Connexion',
			path: '/login',
			start: true
		}
	];

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
			<li class={liC}>
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
			</li>
		{/each}
		<!-- TODO Create component for Contact in modal -->
		<!-- If Contact is true, display contact link -->
		{#if contact}
			<li class={liC}>
				<button on:click={()=> renderModal(modalStore)} class={aC}> Contact </button>
			</li>
		{/if}
	</ul>
</nav>
