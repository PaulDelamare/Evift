<script lang="ts">
	// ! IMPORTS
	import { PUBLIC_CAPTCHA_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	// ! VARIABLE
	// 
	export let token: string;

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
	function doRecaptcha() {
		// @ts-ignore
		grecaptcha.ready(function () {
			// @ts-ignore
			grecaptcha.execute(PUBLIC_CAPTCHA_KEY, { action: 'submit' }).then(function (t) {
				state = State.success;
				token = t;
			});
		});
	}

	// Mount
	onMount(() => {
		// Check if grecaptcha is already loaded
		if (window.grecaptcha) {
			onSubmitCaptcha();
		}
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
