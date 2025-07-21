<script lang="ts">
	export let notification: number;
	export let active: boolean;
</script>

{#if notification > 0}
	<div
		id="notificationNumber"
		class="absolute -top-[10px] leading-none p-2 -right-[10px] text-surface-500 bg-secondary-500/80 size-6 flex justify-center items-center rounded-full shadow-md {active
			? 'bg-surface-50 !text-secondary-500'
			: ''}"
	>
		<span>
			{notification < 9 ? notification : '9+'}
		</span>
	</div>
{/if}
