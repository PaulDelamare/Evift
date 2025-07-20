<script lang="ts">
	export let index: number;
	export let side: 'end' | 'start' = 'end';
	export let identification: string;

	let isOpen = false;
	let isAtBottom = false;
	let details: HTMLDetailsElement;
	let innerHeight = 0;

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (
				!node.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('.close-button')
			) {
				document.querySelectorAll(`.${identification}`).forEach((el) => el.removeAttribute('open'));
				isOpen = false;
			}
		};
		document.addEventListener('click', handleClick, true);
		return { destroy: () => document.removeEventListener('click', handleClick, true) };
	}

	function toggle(event: MouseEvent) {
		const current = document.querySelector(`.${identification}-${index}`);
		const rect = current?.getBoundingClientRect();
		document.querySelectorAll(`.${identification}`).forEach((el) => {
			if (el !== current && !el.contains(event.target as Node)) el.removeAttribute('open');
		});
		isAtBottom = (rect?.bottom ?? 0) + 200 > window.innerHeight;
		isOpen = !isOpen;
	}

	$: {
		if (isOpen && details) {
			const rect = details.getBoundingClientRect();
			isAtBottom = rect.bottom + 100 > innerHeight;
		}
	}
</script>

<svelte:window bind:innerHeight />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<details
	bind:this={details}
	id={identification}
	class="relative group [&_summary::-webkit-details-marker]:hidden {identification} {identification}-{index}"
	use:clickOutside
	on:click={toggle}
>
	<summary class="inline-flex items-center overflow-hidden rounded-md border bg-surface-100">
		<slot name="summary" />

		<span
			class=" px-2 text-secondary-600 py-[7px] hover:bg-gray-100 hover:text-secondary-700 group-open:rotate-180 custom-transition close-button"
		>
			<span class="sr-only">Menu</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</span>
	</summary>

	<div
		class={`z-50 group-open:absolute ${side === 'end' ? 'group-open:end-0' : 'group-open:start-0'} divide-secondary-100 bg-surface-50 min-w-36 rounded-md ${isAtBottom ? 'mb-2 group-open:bottom-full' : 'mt-2 group-open:top-full'} group-open:mt-2`}
		role="menu"
	>
		<slot />
	</div>
</details>
