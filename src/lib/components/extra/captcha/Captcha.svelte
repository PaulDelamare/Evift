<script lang="ts">
	/* eslint-disable */
	// ! IMPORTS

	import { onMount } from 'svelte';

	// ! VARIABLE
	//
	export let token: string;
	export let PUBLIC_CAPTCHA_KEY: string;

	// Define state captcha
	let State = {
		idle: 'idle',
		requesting: 'requesting',
		success: 'success'
	};

	// Define state
	let state = State.idle;

	// Function execute on submit
	export function onSubmitCaptcha() {
		// Change state
		state = State.requesting;

		// Execute do recaptcha for get the token
		doRecaptcha();
	}

	// Get toke function
	const doRecaptcha = () => {
		// @ts-expect-error
		grecaptcha.ready(function () {
			// @ts-expect-error
			grecaptcha.execute(PUBLIC_CAPTCHA_KEY, { action: 'submit' }).then(function (t) {
				state = State.success;
				token = t;
			});
		});
	};

	onMount(() => {
		let check = setInterval(() => {
			// @ts-expect-error
			if (window.grecaptcha) {
				clearInterval(check);
				onSubmitCaptcha();
			}
		}, 100);
	});
</script>

<!-- Define in header the captcha -->
<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_CAPTCHA_KEY}"
		async
		defer
	></script>
</svelte:head>
