<script lang="ts">
	import Conversation from '$lib/components/auth/conversation/Conversation.svelte';
	import type { User } from '$lib/models/user.model.js';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();

	$: messages = [] as {
		message: string;
		email: string;
		firstname: string;
		lastname: string;
		sendAt: Date;
		eventId: string;
		userId: string;
	}[];

	let ws: WebSocket;

	export let data;

	const eventId = data.event.id_event;
	const user = data.user as User;
	const event = data.event;

	let conversationComponent: Conversation;

	let connected: boolean = true;

	let element: HTMLElement;

	onMount(() => {
		ws = new WebSocket(`ws://localhost:3000/ws/message?id_event=${eventId}`);

		ws.addEventListener('message', handleMessage);

		ws.addEventListener('open', () => {
			connected = true;
		});

		ws.addEventListener('close', () => {
			connected = false;
		});
	});

	function handleMessage(msg: MessageEvent) {
		const data = JSON.parse(msg.data);

		switch (data.type) {
			case 'MESSAGES_ADD':
				messages = [...messages, data.data];
				conversationComponent.scrollToBottom(element);
				break;
			case 'MESSAGES_SET':
				messages = data.data;
				conversationComponent.scrollToBottom(element);
				break;
		}
	}

	function sendMessage(message: string) {
		// if (message !== '') {
		ws.send(JSON.stringify({ message }));
		// }
	}

	$: if (!connected) {
		// Toast
		const t: ToastSettings = {
			message: 'Vous êtes déconnecté, veuillez recharger la page pour vous reconnecter.',
			background: 'bg-error-500',
			classes: 'text-surface-500',
			hideDismiss: true,
			timeout: 100000
		};
		toastStore.trigger(t);
	}
</script>

<Conversation
	bind:element
	{event}
	{user}
	bind:this={conversationComponent}
	bind:messages
	functionSendMessage={sendMessage}
/>
