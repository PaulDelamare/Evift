<script lang="ts">
	// ! IMPORTS
	import LogoSvg from '$lib/components/extra/logo/LogoSvg.svelte';
	import DotSvg from '$lib/components/svg/DotSvg.svelte';
	import { formatDate } from '$lib/functions/utils/formatDate/formatDate';
	import type { Event } from '$lib/models/event.model';
	import type { User } from '$lib/models/user.model';

	// ! PROPS
	export let shadow =
		'shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]';

	export let event: Event & {idDriver?: string};
	export let user: User;

	export let imgUrl = '';
</script>

<!-- 
@component
     This component is use for event listing.render
     @returnServerSide {Event} event - The event
     @params {string} imgUrl - The url of the image
     @params {Event} event - The event you want to display
     @params {string} shadow (optionnal) - The shadow of the component
     @slot Pass in slot the button you want to use for this listing (accept/refuse, access, etc...)
 -->
<!-- Display event in li -->
<li
	class="w-full flex bg-surface-500 gap-12 rounded-xl overflow-hidden {shadow} tablet:flex-col tablet:items-center tablet:gap-4" id="{event.idDriver}"
>
	<!-- Display user image (for start, the progil picture isn't available, so we display a default image) -->
	<div class="tablet:w-full">
		<div class="h-44 tablet:w-full w-52 overflow-hidden box-border bg-surface-500 shadow-md">
			{#if event.img}
				<img
					class="object-cover object-center w-full h-full"
					src={`${imgUrl}image?name=${event.img}`}
					alt="{user.firstname} Image"
				/>
			{:else}
				<div class="bg-gradient w-full h-full flex items-center justify-center">
					<LogoSvg fill="fill-surface-500" widthSvg={75} />
				</div>
			{/if}
		</div>
	</div>

	<!-- Display user infos -->
	<div class="w-full p-4 flex flex-col items-end justify-between tablet:gap-4 tablet:items-center">
		<div class="w-full flex gap-3 justify-between tablet:flex-col tablet:items-center">
			<div class="w-full flex-col flex gap-2">
				<!-- Display user name and email -->
				<h4 class=" tablet:text-center">
					{event.name.charAt(0).toUpperCase() + event.name.slice(1)}
				</h4>
				<time class="tablet:text-center">Le {formatDate(event.date)} à {event.time}</time>
			</div>
			<div class="whitespace-nowrap flex gap-2">
				<div>
					<DotSvg classSvg="fill-secondary-500 w-4 p-0" />
				</div>
				<address class="">{event.address}</address>
			</div>
		</div>
		<!-- Display accept and refuse button -->
		<div class="flex w-full justify-between gap-4 tablet:justify-center tablet:flex-col">
			<div class="whitespace-nowrap">
				<p class="tablet:text-center">Organisé par : {user.firstname} {user.lastname}</p>
			</div>
			<div class="flex w-full justify-end gap-4 tablet:justify-center">
				<slot />
			</div>
		</div>
	</div>
</li>
