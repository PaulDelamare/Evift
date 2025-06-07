<script lang="ts">
	import { enhance } from '$app/forms';
	import FileInput from '$lib/components/form/FileInput.svelte';
	import { getToastStore, type ToastSettings, type ToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { ActionData } from '../../../../routes/auth/event/create/$types';
	import { page } from '$app/stores';
	import Submit from '$lib/components/form/Submit.svelte';
	import type { Friends } from '$lib/models/friends.model';
	import InviteFriends from './InviteFriends.svelte';

	export let action: string;

	const toastStore: ToastStore = getToastStore();

	let imageLogo: HTMLImageElement;

	let resultLogo: string;

	let name: string;
	let description: string;

	let submitted = false;
	let inviteList: string[] = [];

	$: inviteListString = inviteList.join(',');

	$: form = $page.form as ActionData;
	const friends: Friends[] = $page.data.friends;

	$: if (form) {
		submitted = false;
	}

	$: if (form?.success) {
		const t: ToastSettings = {
			message: 'La marque a bien été enregistrée',
			background: 'bg-success-500',
			classes: 'text-surface-500'
		};
		toastStore.trigger(t);

		goto('/auth/event');
	}

	let search = '';

	const now = new Date().toISOString().slice(0, 10);

	$: filteredFriends = friends.filter((friend) => {
		const searchParts = search.trim().split(' ').filter(Boolean);
		const searchFirstName = searchParts[0]?.toLowerCase() || '';
		const searchLastName = searchParts[1]?.toLowerCase() || '';

		return (
			(friend.user.firstname.toLowerCase().includes(searchFirstName) &&
				friend.user.lastname.toLowerCase().includes(searchLastName)) ||
			(friend.user.firstname.toLowerCase().includes(searchLastName) &&
				friend.user.lastname.toLowerCase().includes(searchFirstName)) ||
			friend.user.email.toLowerCase().includes(search.toLowerCase())
		);
	});
</script>

<!-- 
@component
     Component for Brand form (update or create)
     @param action [string] action - The action to perform.
-->
<section class="flex flex-col gap-8">
	<form
		on:submit={() => (submitted = true)}
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		method="post"
		{action}
		class=" w-full mr-auto flex flex-col px-4 gap-8 wrap"
		enctype="multipart/form-data"
	>
		<div class="w-full">
			<input
				bind:value={name}
				class="bg-surface-400 border-none rounded shadow-md w-full"
				name="name"
				placeholder="Nom de l'évenement"
			/>

			{#if form?.errors?.name}
				<p class="errorMessage">{form?.errors?.name}</p>
			{/if}
		</div>

		<div class="w-full">
			<textarea
				bind:value={description}
				class="bg-surface-400 border-none rounded shadow-md max-h-56 min-h-10 w-full"
				placeholder="Description"
				name="description"
			></textarea>
			{#if form?.errors?.description}
				<p class="errorMessage">{form?.errors?.description}</p>
			{/if}
		</div>

		<div class="w-full">
			<label>
				<span>Date de l'événement :</span>
				<input
					type="date"
					class="bg-surface-400 border-none rounded shadow-md max-h-56 min-h-10 w-full"
					placeholder="date"
					name="date"
					min={now}
				/>
			</label>
			{#if form?.errors?.date}
				<p class="errorMessage">{form?.errors?.date}</p>
			{/if}
		</div>
		<div class="w-full">
			<label>
				<span>Heure de l'événement :</span>
				<input
					type="time"
					class="bg-surface-400 border-none rounded shadow-md max-h-56 min-h-10 w-full"
					placeholder="time"
					name="time"
				/>
			</label>
			{#if form?.errors?.time}
				<p class="errorMessage">{form?.errors?.time}</p>
			{/if}
		</div>
		<div class="w-full">
			<input
				type="text"
				class="bg-surface-400 border-none rounded shadow-md max-h-56 min-h-10 w-full"
				placeholder="Adresse"
				name="address"
			/>
			{#if form?.errors?.address}
				<p class="errorMessage">{form?.errors?.address}</p>
			{/if}
		</div>
<!-- 
		<div class="flex gap-8 w-full items-end mini-tablet:flex-col mini-tablet:items-center">
			<FileInput
				label="Image pour illustrer l'événement (optionnel)"
				bind:image={imageLogo}
				bind:result={resultLogo}
				name="image"
			/>
			{#if form?.errors?.image}
				<p class="errorMessage">{form?.errors?.image}</p>
			{/if}
		</div> -->

		<div class="column gap-4 items-start">
			<input
				bind:value={search}
				type="search"
				class="bg-surface-400 border-none shadow-md rounded-full"
				placeholder="Rechercher..."
			/>
			<ul class="h-[300px] w-full rounded-md overflow-y-auto bg-surface-400">
				{#each filteredFriends as friend, index}
					{#if index !== 0}
						<li class="bar bg-tertiary-50"></li>
					{/if}
					<InviteFriends bind:inviteList {friend} friends />
				{/each}
			</ul>
			{#if form?.errors?.inviteList}
				<p class="errorMessage">{form?.errors?.inviteList}</p>
			{/if}
			<input type="hidden" value={inviteListString} name="inviteList" />
		</div>
		<div>
			<div class="max-w-[300px] mx-auto">
				<Submit {submitted} textSubmit="Créer" />
				{#if form?.errors?.error}
					<p class="errorMessage">{form?.errors?.error}</p>
				{/if}
			</div>
		</div>
	</form>
</section>
