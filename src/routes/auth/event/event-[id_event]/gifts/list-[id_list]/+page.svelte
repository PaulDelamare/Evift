<script lang="ts">
	import { enhance } from '$app/forms';
	import CheckGift from '$lib/components/auth/event/gift/CheckGift.svelte';
	import BackButton from '$lib/components/extra/BackButton.svelte';
	import CustomCheckbox from '$lib/components/extra/CustomCheckbox.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const list = data.list;
	const user = data.user;
	// console.log(list)
</script>

<PageLayout padding="py-8">
	<section>
		<div class="wrap px-4 flex flex-col gap-8">
			<div class="text-center">
				<BackButton url={`/auth/event/event-${list.id_event}/gifts`} fillSvg="fill-secondary-500" />
				<h2 class="text-gradient mobile-large:text-3xl">{list.list.name}</h2>
				<span class="text-gradient"
					>({list.list && list.list.user
						? `${list.list.user.firstname} ${list.list.user.lastname}`
						: ''})</span
				>
			</div>
			<div>
				<div class="flex flex-col items-center gap-8">
					<ul class="flex flex-col gap-8 w-full">
						{#each list.list.gifts as gift}
							<li class="flex items-center gap-8 justify-between">
								<div
									class="w-full items-center flex justify-between shadow-md px-8 py-4 mobile-large:px-4 bg-surface-400 rounded-xl overflow-hidde mobile-large:flex-col mobile-large:gap-8"
								>
									<div class="flex items-center gap-4 mobile-large:flex-col">
										<h4 class="text-primary-500 mini-tablet:text-lg text-center">{gift.name}</h4>
										<span class="text-gradient">({gift.quantity} cadeaux)</span>
									</div>
									{#if gift.url}
										<div
											class="shadow-md w-full !max-w-[70px] mobile-large:!max-w-full group bg-gradient p-[2px] active:scale-95 custom-transition !duration-300 rounded-xl"
										>
											<div
												class="w-full !max-w-[70px] mobile-large:!max-w-full group-hover:bg-surface-500 custom-transition rounded-[10px] !duration-300"
											>
												<button
													class="w-full !max-w-[70px] mobile-large:!max-w-full 0 nav rounded-xl nav group-hover:text-gradient text-surface-500 custom-transition !duration-300 between justify-center gap-8"
													type="submit"
												>
													<a class="text-lg" href={gift.url} target="_blank">Lien</a>
												</button>
											</div>
										</div>
									{/if}
								</div>
								{#if user.id !== gift.id_user}
									<CheckGift eventId={list.id_event} takenId={gift.id_userTaken} giftId={gift.id} taken={gift.taken} userId={user.id} />
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
</PageLayout>
