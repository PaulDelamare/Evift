<script lang="ts">
	import type { ActionData } from '../../../../../routes/(public)/login/$types';
	import FormRegister from '../FormLoginRegister.svelte';

	// Import Variable
	// For know if it's register or login activated
	export let loginActivated = false;
	// Pass email to login if user do mistake
	export let email = '';
	// Function for stock email in variable do on on:input email
	export let handleEmailChange: (event: Event) => void;
	export let handleActivate = () => {};

	export let form: ActionData;
</script>

<!-- If login not Activated, display form Register -->
{#if !loginActivated}
	<!-- Send information to form -->
	<!-- Send Title/Action/Inputs/onSubmit Function/textSubmit -->
	<FormRegister
		{handleActivate}
		{form}
		title="Inscription"
		action="?/register"
		inputs={[
			// Display Inputs
			{
				// Group input for display it in row
				type: 'group',
				inputs: [
					// firstName Input
					{
						type: 'text',
						label: 'Prénom*',
						name: 'firstName',
						value: '',
						error: form?.errors?.firstname
					},
					// Lastname Input
					{
						type: 'text',
						label: 'Nom*',
						name: 'name',
						value: '',
						error: form?.errors?.lastname
					}
				]
			},
			// Email Input
			{
				type: 'text',
				label: 'Email*',
				name: 'email',
				value: email,
				onInput: handleEmailChange,
				error: form?.errors?.emailRegister
			},
			// Password Input
			{
				type: 'password',
				label: 'Mot de passe*',
				name: 'password',
				value: '',
				error: form?.errors?.passwordRegister
			},
			// Password Confirmation Input
			{
				type: 'password',
				label: 'Confirmation mot de passe*',
				name: 'passwordConfirmation',
				value: '',
				error: form?.errors?.passwordConfirmRegister
			}
		]}
		onSubmit={() => {
		}}
		textSubmit="Inscription"
	/>
{/if}
