<script lang="ts">
	// ! IMPORT
	import { createEventDispatcher } from 'svelte';

	// ! VARIABLES
	// Type for class name
	export let type: string = '';
	// Props for checkbox
	export let checked = false;
	export let disabled = false;
	// Name if it's a form
	export let name = '';

     export let classCheck = '';

	// ! FUNCTION
	// Create Custom Event for use in parent
	const dispatch = createEventDispatcher();
	// Dispatch Custom Event
	function dispatchFoo() {
		dispatch('change');
	}
</script>

<!-- CheckBox -->
<input
	tabindex="-1"
	class="checkGroups cursor-pointer ui-checkbox {type
		? `${type}-checkbox`
		: ''} disabled:!bg-primary-300 {classCheck}"
	type="checkbox"
	on:change={dispatchFoo}
	{checked}
	{disabled}
	{name}
/>

<!-- Style  -->
<style lang="postcss">
	svg {
		@apply cursor-pointer w-4 h-4;
	}
	input[type='search']::-webkit-search-cancel-button {
		-webkit-appearance: none;
		display: none;
	}

	:global(::-webkit-scrollbar) {
		width: 0.25rem !important;
	}

	:global(::-webkit-scrollbar-track) {
		background: #1e1e24 !important;
	}

	:global(::-webkit-scrollbar-thumb) {
		color: #93caed !important;
	}

	.ui-checkbox {
		@apply scale-90;
		/* checkbox */
		--checkbox-diameter: 50px;
		/* checkmark */
		--checkmark-size: 1.2;
		--check-transi-before: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
		--check-transi-before-2: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
		--check-transi-after: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
		--check-translate-before: translate(-50%, -50%) rotate(45deg) scale(0);
		--check-translate-before-2: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
	}

	.ui-checkbox,
	.ui-checkbox *,
	.ui-checkbox *::before,
	.ui-checkbox *::after {
		@apply ![-webkit-box-sizing:border-box] !box-border;
	}

	.ui-checkbox {
		@apply !relative !cursor-pointer !transition-all !duration-300 !size-[var(--checkbox-diameter)] !appearance-none !border-[1px] !border-surface-700 !rounded-lg;
		@apply ![-moz-appearance:none] ![-webkit-appearance:none] ![-o-transition:all_0.3s] ![-webkit-transition:all_0.3s];
	}

	.ui-checkbox:disabled{
		@apply !border-red-300 !bg-red-500;
	}

	.ui-checkbox::after {
		@apply !content-[""] !rounded-[inherit] !opacity-0  !absolute !top-0 !bottom-0 !left-0 !right-0 !text-primary-500 ![-webkit-box-shadow:_0_0_0_calc(var(--checkbox-diameter)_/_2.5)_rgb(var(--color-primary-500)_/_var(--tw-text-opacity)),_0_0_0_0_rgb(var(--color-primary-500)_/_var(--tw-text-opacity))] ![box-shadow:_0_0_0_calc(var(--checkbox-diameter)_/_2.5)_rgb(var(--color-primary-500)_/_var(--tw-text-opacity))];
		@apply ![-webkit-transition:_var(--check-transi-before)] ![-o-transition:_var(--check-transi-before)] ![transition:_var(--check-transi-before)];
	}

	.ui-checkbox::before {
		@apply !opacity-0 !content-[""] !absolute !w-[10px] !h-[20px] !border-b-2 !border-b-white !border-r-2 !border-r-white !top-[40%] !left-2/4;
		@apply ![-webkit-transform:_var(--check-translate-before)] ![-ms-transform:_var(--check-translate-before)] ![transform:_var(--check-translate-before)];
		@apply ![-webkit-transition:_var(--check-transi-after)] ![-o-transition:_var(--check-transi-after)] ![transition:_var(--check-transi-after)];
	}

	/* actions */

	.ui-checkbox:hover {
		@apply !border-[rgb(var(--color-primary-500)_/_var(--tw-text-opacity))];
	}

	.ui-checkbox:checked {
		@apply !bg-[rgb(var(--color-primary-500)_/_var(--tw-text-opacity))] !border-transparent;
	}
	.ui-checkbox:disabled {
		@apply !bg-[rgb(var(--color-secondary-500)_/_var(--tw-text-opacity))] !opacity-30 !border-transparent !cursor-not-allowed;
	}

	.ui-checkbox:focus {
		/* For Remove border */
		@apply focus:!ring-offset-0 focus:!ring-0 !resize-none;
	}

	.ui-checkbox:checked::before {
		@apply opacity-100;
		@apply ![-webkit-transform:var(--check-translate-before-2)] ![-ms-transform:var(--check-translate-before-2)] ![transform:var(--check-translate-before-2)];
		@apply ![-webkit-transition:var(--check-transi-before-2)] ![-o-transition:var(--check-transi-before-2)] ![transition:var(--check-transi-before-2)];
	}

	.ui-checkbox:active:not(:checked)::after {
		@apply ![-webkit-transition:none] ![-o-transition:none] ![-webkit-box-shadow:_none] !shadow-none !opacity-100 !transition-none;
	}
</style>
