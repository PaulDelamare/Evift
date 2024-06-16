<script lang="ts">
	import { PUBLIC_CAPTCHA_KEY } from "$env/static/public";
	import { onMount } from "svelte";

     let State = {
		idle: 'idle',
		requesting: 'requesting',
		success: 'success'
	};

     export let token: string;
	let state = State.idle;

	export function onSubmitCaptcha() {
		state = State.requesting;
		doRecaptcha();
	}

	function doRecaptcha() {
		grecaptcha.ready(function () {
			grecaptcha.execute(PUBLIC_CAPTCHA_KEY, { action: 'submit' }).then(function (t) {
				state = State.success;
				token = t;				
			});
		});
		console.log('token', token)
	}
	onMount(() => {
		onSubmitCaptcha();
		// console.log(token)
	})

</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={PUBLIC_CAPTCHA_KEY}" async defer></script>
</svelte:head>