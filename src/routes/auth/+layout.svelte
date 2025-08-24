<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { LayoutData } from './$types';
	import Driver from '$lib/driver/Driver.svelte';
	import DriverResponsive from '$lib/driver/DriverResponsive.svelte';
	import PartySvg from '$lib/components/svg/PartySvg.svelte';
	import LogoSvg from '$lib/components/extra/logo/LogoSvg.svelte';
	import InvitationSvg from '$lib/components/svg/InvitationSvg.svelte';
	import FriendSvg from '$lib/components/svg/FriendSvg.svelte';
	import { page } from '$app/stores';
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import UserSvg from '$lib/components/svg/UserSvg.svelte';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	export let data: LayoutData;

	$: notification = data.notificationEvents + data.notificationFriends;

	let user = data.user;
	let innerWidth = 0;
	let mounted = false;

	onMount(() => {
		mounted = true;
		innerWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			innerWidth = window.innerWidth;
		});
	});

	$: firstLogin = user?.firstLogin;

	$: activePath = $page.url.pathname;

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'drawer-responsive-logged',
		bgDrawer: 'bg-gradient z-[100]',
		bgBackdrop: 'bg-secondary-500/30 z-[100]',
		width: 'max-w-[240px] w-full',
		padding: 'p-2',
		rounded: 'rounded-xl',
		position: 'right'
	};
</script>

<svelte:window bind:innerWidth />

{#if browser && mounted && firstLogin}
	{#if innerWidth && innerWidth > 1150}
		<Driver />
	{:else}
		<DriverResponsive />
	{/if}
{/if}

<slot />
{#if $innerWidthStore < 1151}
	<nav
		id="navbar-responsive"
		class="fixed bottom-2 rounded-xl left-2/4 translate-x-[-50%] w-[97%] bg-surface-300 border-t flex justify-around items-center z-50 shadow-md"
	>
		<a
			href="/auth/event"
			class="flex flex-col items-center transition-all duration-200 ease-in-out
			{activePath.startsWith('/auth/event') ? 'flex-[1.5]' : 'flex-1'} py-2"
		>
			<PartySvg
				classCustom="h-8 fill-none {activePath.startsWith('/auth/event')
					? 'stroke-primary-500'
					: 'stroke-gray-700'}"
			/>
			<span
				class="text-[11px] transition-all duration-300 ease-in-out
			{activePath.startsWith('/auth/event')
					? 'opacity-100 text-primary-500 scale-100 max-h-6'
					: 'opacity-0 text-gray-700 scale-75 max-h-0'}"
			>
				Événements
			</span>
		</a>

		<a
			id="gift-auth-responsive"
			href="/auth/gift"
			class="flex flex-col items-center border-l border-gray-200 transition-all duration-200 ease-in-out
			{activePath.startsWith('/auth/gift') ? 'flex-[1.5]' : 'flex-1'} py-2"
		>
			<LogoSvg
				fill={activePath.startsWith('/auth/gift') ? 'fill-primary-500' : 'fill-gray-700'}
				widthSvg={26}
			/>
			<span
				class="text-[11px] transition-all duration-300 ease-in-out
			{activePath.startsWith('/auth/gift')
					? 'opacity-100 text-primary-500 scale-100 max-h-6'
					: 'opacity-0 text-gray-700 scale-75 max-h-0'}"
			>
				Cadeaux
			</span>
		</a>

		<a
			id="invitation-auth-responsive"
			href="/auth/invitation"
			class="flex flex-col items-center border-l border-gray-200 transition-all duration-200 ease-in-out
			{activePath.startsWith('/auth/invitation') ? 'flex-[1.5]' : 'flex-1'} py-2 relative"
		>
			<div class="relative">
				{#if notification !== 0}
					<span class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary-500"></span>
				{/if}
				<InvitationSvg
					classSvg="h-8 {activePath.startsWith('/auth/invitation')
						? 'fill-primary-500'
						: 'fill-gray-700'}"
				/>
			</div>

			<span
				class="text-[11px] transition-all duration-300 ease-in-out
			{activePath.startsWith('/auth/invitation')
					? 'opacity-100 text-primary-500 scale-100 max-h-6'
					: 'opacity-0 text-gray-700 scale-75 max-h-0'}"
			>
				Invitations
			</span>
		</a>

		<a
			id="friends-auth-responsive"
			href="/auth/friends"
			class="flex flex-col items-center border-l border-gray-200 transition-all duration-200 ease-in-out
			{activePath.startsWith('/auth/friends') ? 'flex-[1.5]' : 'flex-1'} py-2"
		>
			<FriendSvg
				classSvg="h-8 {activePath.startsWith('/auth/friends')
					? 'fill-primary-500'
					: 'fill-gray-700'}"
			/>
			<span
				class="text-[11px] transition-all duration-300 ease-in-out
			{activePath.startsWith('/auth/friends')
					? 'opacity-100 text-primary-500 scale-100 max-h-6'
					: 'opacity-0 text-gray-700 scale-75 max-h-0'}"
			>
				Amis
			</span>
		</a>
		<button
			id="logout-button"
			on:click={() => {
				drawerStore.open(drawerSettings);
			}}
			class="flex flex-col items-center border-l border-gray-200 transition-all duration-200 ease-in-out flex-1
			 py-2"
		>
			<UserSvg classSvg="h-6 fill-gray-700" />
		</button>
	</nav>
{/if}
