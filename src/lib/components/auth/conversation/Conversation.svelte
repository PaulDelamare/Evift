<script lang="ts">
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import SendSvg from '$lib/components/svg/SendSvg.svelte';
	import {
		getYoutubeData,
		linkify,
		matchYoutubeUrl
	} from '$lib/functions/utils/cleanHtml/cleanHtml';
	import { formatDate, formatTime } from '$lib/functions/utils/formatDate/formatDate';
	import type { User } from '$lib/models/user.model';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';
	import { afterUpdate } from 'svelte';

	export let functionSendMessage: (message: string) => void;
	export let user: User;
	export let event;

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

	export let element: HTMLElement;

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	afterUpdate(() => {
		if (messages) scrollToBottom(element);
	});
</script>

<div class="flex flex-col h-screen">
	<section
		class={`bg-gradient px-8 py-2 text-surface-500 flex items-center gap-4 sticky top-0 z-20 ${
			$innerWidthStore > 1150 ? 'pt-[80px]' : 'pt-2'
		}`}
	>
		<BackButton url={`/auth/event/event-${event.event.id}`} fillSvg="fill-surface-500" />
		<h3 class="text-2xl font-semibold">{event.event.name}</h3>
	</section>

	<div
		bind:this={element}
		class="flex-1 overflow-y-auto p-4"
		style={`margin-bottom: ${$innerWidthStore <= 1150 ? '8rem' : '4rem'}`}
	>
		{#each messages as message}
			{#if linkify(message.message)}
				<div class="flex flex-col gap-1 mb-1">
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
							<img
								src={user.id === message.userId
									? 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
									: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'}
								alt="Avatar"
								class="w-8 h-8 rounded-full"
							/>
						</div>
						<div class="flex flex-col gap-1">
							<div
								class="flex max-w-96 rounded-lg px-2 py-2 gap-3 {user.id === message.userId
									? 'bg-secondary-500'
									: 'bg-surface-200'}"
							>
								<p class={user.id === message.userId ? 'text-surface-500' : 'text-tertiary-500'}>
									{@html linkify(message.message)}
									{#if matchYoutubeUrl(message.message)}
										{#await getYoutubeData(message.message) then data}
											{@html data}
										{/await}
									{/if}
								</p>
							</div>
							<time class="text-sm font-extralight not-italic self-end">
								{#if formatDate(message.sendAt) === formatDate(new Date())}
									{formatTime(message.sendAt)}
								{:else}
									{formatDate(message.sendAt)} {formatTime(message.sendAt)}
								{/if}
							</time>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<footer
		class={`fixed bottom-0 left-0 w-full border-t border-surface-300 p-4 bg-white z-20 ${
			$innerWidthStore < 1151 ? 'pb-20' : ''
		}`}
	>
		<form
			on:submit={() => {
				functionSendMessage(messageToSend);
				messageToSend = '';
			}}
			class="flex items-center"
		>
			<div class="flex w-full bg-surface-50 rounded-full">
				<input
					bind:value={messageToSend}
					type="text"
					placeholder="Type a message..."
					class="w-full bg-transparent border-none p-2 rounded-md border border-tertiary-400 focus:outline-none focus:border-primary-500"
				/>
				<button class="bg-secondary-400 text-surface-50 px-8 py-2 ml-2 rounded-full">
					<SendSvg classCustom="w-4 h-4 stroke-surface-50" />
				</button>
			</div>
		</form>
	</footer>
</div>
