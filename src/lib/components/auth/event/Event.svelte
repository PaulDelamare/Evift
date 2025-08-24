<script lang="ts">
	import LogoSvg from '$lib/components/extra/logo/LogoSvg.svelte';
	import DotSvg from '$lib/components/svg/DotSvg.svelte';
	import { formatDate } from '$lib/functions/utils/formatDate/formatDate';
	import type { EventDetail } from '$lib/models/event.model';
	import type { User } from '$lib/models/user.model';

	export let shadow =
		'shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]';

	export let event: EventDetail & { idDriver?: string };
	export let user: User;
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
<li
	class="w-full flex bg-surface-500 gap-12 rounded-xl overflow-hidden {shadow} flex-col items-center gap-4"
	id={event.idDriver}
>
	<div class="w-full">
		<div class="h-44 w-full overflow-hidden box-border bg-surface-500 shadow-md">
			<div class="bg-gradient w-full h-full flex items-center justify-center">
				<LogoSvg fill="fill-surface-500" widthSvg={75} />
			</div>
		</div>
	</div>

	<div class="w-full p-4 flex flex-col justify-between gap-4 items-center">
		<div class="w-full flex gap-3 justify-between flex-col items-center">
			<div class="w-full flex-col flex gap-2">
				<h4 class="text-center text-base md:text-lg lg:text-xl break-words">
					{event.name.charAt(0).toUpperCase() + event.name.slice(1)}
				</h4>
				<time class="text-center text-sm md:text-base">Le {formatDate(event.date)} à {event.time}</time>
			</div>
			<div class="whitespace-nowrap flex gap-2">
				<div>
					<DotSvg classSvg="fill-secondary-500 w-4 p-0" />
				</div>
				<address class="text-xs md:text-sm break-words">{event.address}</address>
			</div>
		</div>
		<div class="flex w-full gap-4 justify-center flex-col">
			<div class="whitespace-nowrap">
				<p class="text-center">Organisé par : {user.firstname} {user.lastname}</p>
			</div>
			<div id="{event.idDriver}Button" class="flex w-full gap-4 justify-center">
				<slot />
			</div>
		</div>
	</div>
</li>
