<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Submit from '$lib/components/form/Submit.svelte';
	import type { Friends } from '$lib/models/friends.model';
	import InviteFriends from './InviteFriends.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventSchema } from '$lib/validationSchema/event.schema';
	import toast from 'svelte-french-toast';

	export let action: string;

	let submitted = false;
	let inviteList: string[] = [];

	$: inviteListString = inviteList.join(',');

	const {
		form: formEvent,
		errors,
		message,
		enhance
	} = superForm(page.data.form, {
		validators: zodClient(createEventSchema),
		validationMethod: 'oninput'
	});

	$: if ($message) {
		submitted = false;
	}

	$: if ($message && $message.success) {
		toast.success("L'événement a bien été créé");
		goto('/auth/event');
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	const friends: Friends[] = page.data.friends;

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
		method="post"
		{action}
		class=" w-full mr-auto flex flex-col px-4 gap-8 wrap"
		use:enhance
	>
		<div class="w-full">
			<input
				bind:value={$formEvent.name}
				class="bg-surface-400 border-none rounded shadow-md w-full"
				name="name"
				placeholder="Nom de l'évenement"
			/>

			{#if $errors?.name}
				<p class="errorMessage">{$errors?.name}</p>
			{/if}
		</div>

		<div class="w-full">
			<textarea
				bind:value={$formEvent.description}
				class="bg-surface-400 border-none rounded shadow-md max-h-56 min-h-10 w-full"
				placeholder="Description"
				name="description"
			></textarea>
			{#if $errors?.description}
				<p class="errorMessage">{$errors?.description}</p>
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
					bind:value={$formEvent.date}
				/>
			</label>
			{#if $errors?.date}
				<p class="errorMessage">{$errors?.date}</p>
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
					bind:value={$formEvent.time}
				/>
			</label>
			{#if $errors?.time}
				<p class="errorMessage">{$errors?.time}</p>
			{/if}
		</div>
		<div class="w-full">
			<input
				type="text"
				class="bg-surface-400 border-none rounded shadow-md max-h-56 min-h-10 w-full"
				placeholder="Adresse"
				name="address"
				bind:value={$formEvent.address}
			/>
			{#if $errors?.address}
				<p class="errorMessage">{$errors?.address}</p>
			{/if}
		</div>

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
			{#if $errors?.inviteList}
				<p class="errorMessage">{$errors?.inviteList}</p>
			{/if}
			<input type="hidden" value={inviteListString} name="inviteList" />
		</div>
		<div>
			<div class="max-w-[300px] mx-auto">
				<Submit {submitted} textSubmit="Créer" />
				{#if $errors?.error}
					<p class="errorMessage">{$errors?.error}</p>
				{/if}
			</div>
		</div>
	</form>
</section>
