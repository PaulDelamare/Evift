<script lang="ts">
	import LogoSvg from '$lib/components/extra/logo/LogoSvg.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import MessageSvg from '$lib/components/svg/MessageSvg.svelte';
	import UserSvg from '$lib/components/svg/UserSvg.svelte';
	import SlideButton from '$lib/components/tools/SlideButton.svelte';
	import renderModal from '$lib/functions/modal/renderModal';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const event = data.event.event;
	const imgUrl = data.imgUrl;
	const id_event = data.event.id_event;
    const modalStore = getModalStore();
</script>

<PageLayout>
	<section slot="hero" class="bg-gradient py-12">
		<div class="wrap px-4 flex flex-col gap-4">
			<div class=" flex items-center justify-center gap-8 text-surface-500 mini-tablet:flex-col">
				<div class="h-44 tablet:w-full w-80 overflow-hidden box-border shadow-md rounded-3xl">
					{#if event.img}
						<img
							class="object-cover object-center w-full h-full"
							src={`${imgUrl}image?name=${event.img}`}
							alt="Evenement"
						/>
					{:else}
						<div class=" w-full h-full flex items-center justify-center">
							<LogoSvg fill="fill-surface-500" widthSvg={75} />
						</div>
					{/if}
				</div>
				<div class="min-w-80 flex flex-col gap-2 mini-tablet:text-center px-4">
					<address class="text-surface-500 ">{event.address}</address>
					<time class="text-surface-500">{event.time}</time>
					<h3>{event.name}</h3>
					<p class="break-all max-w-[280px]">{event.description}</p>
				</div>
			</div>
			<button
				on:click={() =>
					renderModal(modalStore, 'ParticipantModel', 'Participants', 'Participants')}
				class="bg-surface-500 mini-tablet:self-center self-end rounded-lg flex items-center gap-4 py-2 px-3 text-secondary-500 uppercase font-bold hover:scale-[1.02] custom-transition active:scale-90"
			>
				<div class="w-4">
					<UserSvg classSvg="fill-secondary-500 w-6" />
				</div>

				Participants
			</button>
		</div>
	</section>
	<section>
		<div class=" wrap gap-8 grid grid-cols-[repeat(auto-fit,_minmax(360px,_1fr))] mini-tablet:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] px-4">
			<div
				class="w-full min-h-96 bg-gradient rounded-3xl flex flex-col justify-center items-center gap-8 text-surface-500"
			>
				<!-- <div class=" w-full h-full flex items-center justify-center"> -->
				<LogoSvg fill="fill-surface-500" widthSvg={75} />
				<!-- </div> -->
				<h3>Liste de cadeaux</h3>
				<a href="/auth/event/event-{id_event}/gifts">
					<SlideButton text="Accéder" toRight={false} />
				</a>
			</div>
			<div
				class="w-full min-h-96 bg-gradient rounded-3xl flex flex-col justify-center items-center gap-8 text-surface-500"
			>
				<!-- <div class=" w-full h-full flex items-center justify-center"> -->
				<MessageSvg classSvg="fill-surface-500 w-24" />
				<!-- </div> -->
				<h3>Conversation</h3>
				<a href="/auth/event/event-{id_event}/conversation">
					<SlideButton text="Accéder" />
				</a>
			</div>
		</div>
	</section>
</PageLayout>
