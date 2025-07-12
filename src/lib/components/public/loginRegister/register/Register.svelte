<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import FormRegister from '../FormLoginRegister.svelte';
	import { page } from '$app/state';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerSchema } from '$lib/validationSchema/auth.schema';
	import toast from 'svelte-french-toast';

	export let loginActivated = false;
	export let email = '';
	export let handleEmailChange: (event: Event) => void;
	export let handleActivate = () => {};
	export let PUBLIC_CAPTCHA_KEY: string;

	const { errors, message } = superForm(page.data.formRegister, {
		validators: zodClient(registerSchema)
	});

	$: if ($message && $message.success) {

		toast.success($message.message);
		submitted = false;

		handleActivate();
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
		submitted = false;
	}

	let submitted = false;
</script>

{#if !loginActivated}
	<FormRegister
		bind:submitted
		{PUBLIC_CAPTCHA_KEY}
		title="Inscription"
		action="?/register"
		inputs={[
			{
				type: 'group',
				inputs: [
					{
						type: 'text',
						label: 'Prénom*',
						name: 'firstname',
						value: '',
						error: Array.isArray($errors?.firstname)
							? $errors.firstname[0]
							: typeof $errors?.firstname === 'string'
								? $errors.firstname
								: undefined
					},
					{
						type: 'text',
						label: 'Nom*',
						name: 'lastname',
						value: '',
						error: Array.isArray($errors?.lastname)
							? $errors.lastname[0]
							: typeof $errors?.lastname === 'string'
								? $errors.lastname
								: undefined
					}
				]
			},

			{
				type: 'text',
				label: 'Email*',
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
				label: 'Mot de passe*',
				name: 'password',
				value: '',
				error: Array.isArray($errors?.password)
					? $errors.password[0]
					: typeof $errors?.password === 'string'
						? $errors.password
						: undefined
			},

			{
				type: 'password',
				label: 'Confirmation mot de passe*',
				name: 'passwordConfirm',
				value: '',
				error: Array.isArray($errors?.passwordConfirm)
					? $errors.passwordConfirm[0]
					: typeof $errors?.passwordConfirm === 'string'
						? $errors.passwordConfirm
						: undefined
			}
		]}
		onSubmit={() => {}}
		textSubmit="Inscription"
	/>
{/if}
