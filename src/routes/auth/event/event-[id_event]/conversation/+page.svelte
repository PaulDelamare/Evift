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
	const token = data.token;
	const urlWs = data.urlWs;

	let conversationComponent: Conversation;

	let connected: boolean = true;

	let element: HTMLElement;

	onMount(() => {
		ws = new WebSocket(`${urlWs}/message?id_event=${eventId}&token=${token}`);

		ws.addEventListener('message', handleMessage);

		ws.addEventListener('open', () => {
			connected = true;

			// === Ping automatique toutes les 25 secondes ===
			const pingInterval = setInterval(() => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify({ type: 'ping' }));
				} else {
					clearInterval(pingInterval);
				}
			}, 25000);
		});

		ws.addEventListener('close', (event) => {
			connected = false;
		});
	});

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	function handleMessage(msg: MessageEvent) {
		const data = JSON.parse(msg.data);

		switch (data.type) {
			case 'MESSAGES_ADD':
				messages = [...messages, data.data];
				scrollToBottom(element);
				break;
			case 'MESSAGES_SET':
				messages = data.data;
				scrollToBottom(element);
				break;
		}
	}

	function sendMessage(message: string) {
		ws.send(JSON.stringify({ message }));
	}

	$: if (!connected) {
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
