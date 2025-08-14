<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import FormLoginRegister from '$lib/components/public/loginRegister/FormLoginRegister.svelte';
	import type { PageData } from './$types';
	import PageLayout from '$lib/components/structure/PageLayout.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const PUBLIC_CAPTCHA_KEY = data.captchaKey;
	const email = data.email;

	const { errors, message } = superForm(data.form);

	$: if ($message && $message.success) {
		toast.success($message.message);
		submitted = false;
		goto('/evift/login');
	}

	$: if ($message && $message.error) {
		toast.error($message.error);
		submitted = false;
		$message.error = null;
	}

	let submitted = false;
</script>

<PageLayout>
	<FormLoginRegister
    classCustom="w-full bg-transparent"
    classForm="!max-w-[700px] bg-surface-500 p-8 shadow-lg rounded-3xl"
		errorRgpd={Array.isArray($errors?.rgpd)
			? $errors.rgpd[0]
			: typeof $errors?.rgpd === 'string'
				? $errors.rgpd
				: undefined}
		rgpd
		bind:submitted
		{PUBLIC_CAPTCHA_KEY}
		title="Inscription"
		moreContent="Vous retrouverez les invitations des utilisateurs après l'inscription. L'adresse email utilisé pour l'inscription est {email}."
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
</PageLayout>
