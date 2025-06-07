<script lang="ts">
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import {
		getYoutubeData,
		linkify,
		matchYoutubeUrl
	} from '$lib/functions/utils/cleanHtml/cleanHtml';
	import { formatDate, formatTime } from '$lib/functions/utils/formatDate/formatDate';
	import type { User } from '$lib/models/user.model';
	import { afterUpdate } from 'svelte';

	export let functionSendMessage: (message: string) => void;
	export let user: User;
	export let event;
	let innerHeight: number;

	let messageToSend = '';

	export let messages: {
		message: string;
		email: string;
		firstname: string;
		lastname: string;
		sendAt: Date;
		eventId: string;
		userId: string;
	}[] = [];

	afterUpdate(() => {
		if (messages) scrollToBottom(element);
	});

	export let element: HTMLElement;
	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<svelte:window bind:innerHeight />

<div class="flex h-full [max-height:_calc(100vh_-_79px)] overflow-hidden">
	<!-- Main Chat Area -->
	<div class="flex-1 flex flex-col justify-between">
		<!-- Chat Header -->
		<section class="bg-gradient px-8 py-2 text-surface-500 flex items-center gap-4">
			<BackButton url={`/auth/event/event-${event.event.id}`} fillSvg="fill-surface-500" />
			<h3 class="text-2xl font-semibold">{event.event.name}</h3>
		</section>

		<!-- Chat Messages -->
		<div bind:this={element} class="h-full max-w-full overflow-y-auto p-4">
			{#each messages as message}
				{#if linkify(message.message)}
					<div class=" flex flex-col gap-1 mb-1">
						<p class="text-sm font-light {user.id === message.userId ? 'text-end' : ''}">
							{user.id === message.userId ? 'Vous' : message.firstname + ' ' + message.lastname}
						</p>
						<div class="flex {user.id === message.userId ? 'flex-row-reverse' : ''}">
							<div
								class="w-9 h-9 rounded-full flex items-center justify-center {user.id ===
								message.userId
									? 'ml-2'
									: 'mr-2'}"
							>
								{#if user.id === message.userId}
									<img
										src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
										alt="My Avatar"
										class="w-8 h-8 rounded-full"
									/>
								{:else}
									<img
										src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
										alt="User Avatar"
										class="w-8 h-8 rounded-full"
									/>
								{/if}
							</div>
							<div class="flex flex-col gap-1">
								<div
									class="flex max-w-96 rounded-lg px-2 py-2 gap-3 {user.id === message.userId
										? 'bg-secondary-500'
										: 'bg-surface-200'}"
								>
									<p
										class=" {user.id === message.userId ? 'text-surface-500' : 'text-tertiary-500'}"
									>
										{@html linkify(message.message)}
										{#if matchYoutubeUrl(message.message)}
											{#await getYoutubeData(message.message) then data}
												{@html data}
											{/await}
										{/if}
									</p>
								</div>
								<time class="text-sm font-extralight not-italic self-end"
									>{#if formatDate(message.sendAt) === formatDate(new Date())}
										{formatTime(message.sendAt)}
									{:else}
										{formatDate(message.sendAt)} {formatTime(message.sendAt)}
									{/if}</time
								>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Chat Input -->
		<footer class="bg-surface-200 border-t border-surface-300 p-4 bottom-0 w-full">
			<form
				on:submit={() => {
					functionSendMessage(messageToSend);
					messageToSend = '';
				}}
				class="flex items-center"
			>
				<input
					bind:value={messageToSend}
					type="text"
					placeholder="Type a message..."
					class="w-full p-2 rounded-md border border-tertiary-400 focus:outline-none focus:border-primary-500"
				/>
				<button class="bg-secondary-400 text-surface-500 px-4 py-2 rounded-md ml-2">Envoyer</button>
			</form>
		</footer>
	</div>
</div>
