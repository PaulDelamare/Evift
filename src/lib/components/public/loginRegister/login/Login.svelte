<script lang="ts">
	import type { ActionData } from '../../../../../routes/evift/login/$types';
	import FormLoginRegister from '../FormLoginRegister.svelte';

	// Import Variable
	// For know if it's register or login activated
	export let loginActivated = true;
	// Pass email to register if user do mistake
	export let email = '';
	// Function for stock email in variable do on on:input email
	export let handleEmailChange: (event: Event) => void;

	// Form
	export let form: ActionData;

	// Import Key
	export let PUBLIC_CAPTCHA_KEY: string;
</script>

<!-- If login Activated, display form Login -->
{#if loginActivated}
	<!-- Send information to form -->
	<!-- Send Title/Action/Inputs/onSubmit Function/textSubmit/forgotPassword -->
	<FormLoginRegister
		{PUBLIC_CAPTCHA_KEY}
		{form}
		title="Connexion"
		action="?/login"
		inputs={// Display Inputs
		[
			// Email Input
			{
				type: 'text',
				label: 'Email',
				name: 'email',
				value: email,
				onInput: handleEmailChange,
				error: form?.errors?.emailLogin
			},
			// Password Input
			{
				type: 'password',
				label: 'Mot de passe',
				name: 'password',
				value: '',
				error: form?.errors?.passwordLogin
			}
		]}
		onSubmit={() => {}}
		textSubmit="Connexion"
		forgotPassword
	/>
{/if}
