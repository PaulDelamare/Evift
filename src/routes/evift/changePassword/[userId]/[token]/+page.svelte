<script lang="ts">
	import { enhance } from '$app/forms';
	import Captcha from '$lib/components/extra/captcha/Captcha.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;

	let submitted = false;
	let captchaSubmit: Captcha;
	let token = '';

	const PUBLIC_CAPTCHA_KEY = data.captchaKey;

	const { errors, message } = superForm(data.form);

	$: if ($message && $message.success) {
		toast.success($message.message);
		$message.success = null;
		submitted = false;
		goto('/evift/login');
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
                update({ reset: false, invalidateAll: false });
            };
        }}
		action="?/changePassword"
		method="post"
		on:submit={() => {
			submitted = true;
			captchaSubmit.onSubmitCaptcha();
		}}
		class="!max-w-[700px] bg-surface-500 p-8 shadow-md rounded-3xl column w-full gap-10 text mx-auto outline outline-surface-900/5 outline-[2px]"
	>
		<h2 class="!text-gradient mobile:text-4xl text-center">Réinitialiser votre mot de passe</h2>

		<Input
			type="password"
			label="Votre mot de passe"
			name="password"
			error={Array.isArray($errors?.password)
				? $errors.password[0]
				: typeof $errors?.password === 'string'
					? $errors.password
					: undefined}
		/>

		<Input
			type="password"
			label="Confirmer votre mot de passe"
			name="confirmPassword"
			error={Array.isArray($errors?.confirmPassword)
				? $errors.confirmPassword[0]
				: typeof $errors?.confirmPassword === 'string'
					? $errors.confirmPassword
					: undefined}
		/>

		<input class="hidden" type="text" name="secret" value={token} />

		<Submit textSubmit="Envoyer" bind:submitted />
	</form>
</PageLayout>
