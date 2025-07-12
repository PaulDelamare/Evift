<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import FormLoginRegister from '../FormLoginRegister.svelte';
	import { page } from '$app/state';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/validationSchema/auth.schema';
	import toast from 'svelte-french-toast';

	export let loginActivated = true;
	export let email = '';
	export let handleEmailChange: (event: Event) => void;
	export let PUBLIC_CAPTCHA_KEY: string;

	const { errors, message } = superForm(page.data.formLogin, {
		validators: zodClient(loginSchema)
	});

	$: if ($message && $message.error) {
		toast.error($message.error);
		submitted = false;
	}

	let submitted = false;
</script>

{#if loginActivated}
	<FormLoginRegister
		bind:submitted
		{PUBLIC_CAPTCHA_KEY}
		title="Connexion"
		action="?/login"
		inputs={[
			{
				type: 'text',
				label: 'Email',
				name: 'email',
				value: email,
				onInput: handleEmailChange,
				error: Array.isArray($errors?.email)
					? $errors.email[0]
					: typeof $errors?.email === 'string'
						? $errors.email
						: undefined
			},
			{
				type: 'password',
				label: 'Mot de passe',
				name: 'password',
				value: '',
				error: Array.isArray($errors?.password)
					? $errors.password[0]
					: typeof $errors?.password === 'string'
						? $errors.password
						: undefined
			}
		]}
		onSubmit={async () => {}}
		textSubmit="Connexion"
		forgotPassword
	/>
{/if}
