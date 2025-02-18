<script lang="ts">
	// Import components
	import Layer from '$lib/components/public/loginRegister/layer/Layer.svelte';
	import Login from '$lib/components/public/loginRegister/login/Login.svelte';
	import Register from '$lib/components/public/loginRegister/register/Register.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const PUBLIC_CAPTCHA_KEY = data.captchaKey!;

	// Variables
	// Login variable for know if user is Activated
	let loginActivated = true;
	// Email variable
	let email = '';

	// Screen width
	let innerWidth = 0;

	// Functions
	/**
	 * Change loginActivated to the opposite.
	 *
	 * This function is used for alternate between login and register
	 *
	 * @return void This function returns nothing.
	 */
	const handleActivate = () => {
		loginActivated = !loginActivated;
		if (innerWidth < 850) {
			const element: HTMLElement | null = document.querySelector('#top');
			if (element) {
				scrollToTop(element);
			}
		}
	};

	/**
	 * Change email variable to the new value.
	 *
	 * This function is used for have the same value in login and register input if user do the wrong form
	 *
	 * @return void This function returns nothing.
	 */
	const handleEmailChange = (event: Event) => {
		if (event.target instanceof HTMLInputElement) {
			email = event.target.value;
		}
	};

	/**
	 * Scroll to the top of the page.
	 *
	 * @param HTMLElement node - The element to scroll to.
	 * @return void This function does not return anything.
	 */
	const scrollToTop = (node: HTMLElement) => {
		if (node) {
			// Scroll to the element with smooth behavior.
			node.scrollIntoView({ behavior: 'smooth' });
		}
	};
</script>

<!-- For know the screen width -->
<svelte:window bind:innerWidth />

<!-- Page Layout for Display Element -->
<PageLayout padding="py-12">
	<!-- Wrap container -->
	<section class="wrap px-8 mobile-large:px-4">
		<!-- Login Register comoponen -->
		<div
			class="tablet:overflow-visible tablet:shadow-none tablet:gap-12 tablet:!flex-col rounded-xl flex overflow-hidden shadow-[41px_41px_82px_0_rgba(190,190,190,1),-41px_-41px_82px_0_rgba(255,255,255,1)] custom-transition min-h-[667px] relative {!loginActivated
				? 'justify-end'
				: ''}"
		>
			<!-- Add Login and Register component -->
			<!-- Login with Form -->
			<Login {PUBLIC_CAPTCHA_KEY} {form} {loginActivated} {email} {handleEmailChange} />
			<!-- Register with Form -->
			<Register
				{PUBLIC_CAPTCHA_KEY}
				{form}
				{loginActivated}
				{email}
				{handleEmailChange}
				{handleActivate}
			/>

			<!-- Add Layer component for change into login or register -->
			<Layer {loginActivated} {handleActivate} />
		</div>
	</section>
</PageLayout>
