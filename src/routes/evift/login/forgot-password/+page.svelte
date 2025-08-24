<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { responseForgotPasswordSchema } from '$lib/validationSchema/forgotPassword.schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import toast from 'svelte-french-toast';
	import Submit from '$lib/components/form/Submit.svelte';
	import { enhance } from '$app/forms';
	import Captcha from '$lib/components/extra/captcha/Captcha.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';

	export let data: PageData;

	let submitted = false;
	let captchaSubmit: Captcha;
	let token = '';

	const PUBLIC_CAPTCHA_KEY = data.captchaKey;

	const { errors, message } = superForm(data.form, {
		validators: zodClient(responseForgotPasswordSchema)
	});

	$: if ($message && $message.success) {
		toast.success($message.message);
		$message.success = null;
		submitted = false;
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
		$message.error = null;
		submitted = false;
	}
</script>

<PageLayout gap="justify-center">
	<Captcha {PUBLIC_CAPTCHA_KEY} bind:this={captchaSubmit} bind:token />

	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		action="?/forgotPassword"
		method="post"
		on:submit={() => {
			submitted = true;
			captchaSubmit.onSubmitCaptcha();
		}}
		class="!max-w-[700px] bg-surface-500 p-8 shadow-lg rounded-3xl column w-full gap-10 text mx-auto"
	>
		<h2 class="!text-gradient mobile:text-4xl">Mot de passe oublié</h2>
		<p class="text-center text-sm">
			Un email vous sera envoyer avec un lien vous permettant de modifier votre mot de passe.
		</p>

		<Input
			type="email"
			label="Votre email"
			name="email"
			error={Array.isArray($errors?.email)
				? $errors.email[0]
				: typeof $errors?.email === 'string'
					? $errors.email
					: undefined}
		/>

		<input class="hidden" type="text" name="secret" value={token} />

		<Submit textSubmit="Envoyer" bind:submitted />
	</form>
</PageLayout>
