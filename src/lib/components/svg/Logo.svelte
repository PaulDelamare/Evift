<script lang="ts">
	import { page } from '$app/state';

	import LogoSvg from '../extra/logo/LogoSvg.svelte';

	export let gradient = false;
	export let white = false;
	export let color = '';
	export let widthSvg = 50;
	export let text = false;
	export let link = false;
	export let h1 = false;

	$: user = page.data.user;
</script>

<div class="flex items-end gap-2">
	{#if link}
		<a href={user ? '/auth/event' : '/'} class="hover:scale-105 custom-transition">
			<LogoSvg
				{widthSvg}
				fill={gradient
					? 'fill-[url(#paint0_linear_2)]'
					: white
						? 'fill-surface-500'
						: color
							? `fill-[${color}]`
							: ''}
			/>
		</a>
		{#if h1}
			<h1
				class="{text ? '' : 'hidden'} {gradient ? 'text-gradient' : ''} {white
					? 'text-surface-500'
					: ''} {color ? `text-[${color}]` : ''}"
			>
				Evift
			</h1>
		{:else}
			<span
				class="h1 {text ? '' : 'hidden'} {gradient ? 'text-gradient' : ''} {white
					? 'text-surface-500'
					: ''} {color ? `text-[${color}]` : ''}">Evift</span
			>
		{/if}
	{:else}
		<div class="flex items-end gap-2">
			<LogoSvg
				{widthSvg}
				fill={gradient
					? 'fill-[url(#paint0_linear_2)]'
					: white
						? 'fill-surface-500'
						: color
							? `fill-[${color}]`
							: ''}
			/>
			{#if h1}
				<h1
					class="{text ? '' : 'hidden'} {gradient ? 'text-gradient' : ''} {white
						? 'text-surface-500'
						: ''} {color ? `text-[${color}]` : ''}"
				>
					Evift
				</h1>
			{:else}
				<span
					class="h1 {text ? '' : 'hidden'} {gradient ? 'text-gradient' : ''} {white
						? 'text-surface-500'
						: ''} {color ? `text-[${color}]` : ''}">Evift</span
				>
			{/if}
		</div>
	{/if}
</div>
