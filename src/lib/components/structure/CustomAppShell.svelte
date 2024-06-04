<script lang="ts">
	// Import parameters
	// Class
	export let headerClass: string = '';
	export let mainClass: string = '';
	export let footerClass: string = '';

	// Position
	// Sticky
	export let headerSticky: boolean = false;

	// Fixed
	export let headerFixe: boolean = false;
	export let footerFixe: boolean = false;

	// Position class
	const sticky = 'sticky top-0 z-50';

	// Create class
	const headerC = `${headerClass} ${headerSticky ? sticky : ''} ${headerFixe ? 'fixed top-0 w-full' : ''} bg-surface-500`;
	const mainC = `flex-auto ${mainClass}`;
	const footerC = `${footerClass} ${footerFixe ? 'fixed bottom-0 w-full' : ''}`;
</script>

<!-- APP SHELL -->
<div class="relative w-full h-full flex flex-col overflow-hidden" data-testid="app-shell">
	<div class="flex-auto w-full h-full flex overflow-hidden">
		<div
			id="page"
			class="relative flex-1 overflow-x-hidden flex flex-col h-full my-0"
			style="scrollbar-gutter: auto;"
		>
			<!-- Elements -->
			<!-- Header -->
			<header class={headerC}>
				<slot name="header" />
			</header>

			<!-- Main (Content) -->
			<main id="top" class={mainC}>
				<slot />
			</main>

			<!-- Footer -->
			<footer class={footerC}>
				<slot name="footer" />
			</footer>
		</div>
	</div>
</div>
