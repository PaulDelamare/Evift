<script lang="ts">
	import FormRegister from '../FormLoginRegister.svelte';

	// Import Variable
	// For know if it's register or login activated
	export let loginActivated = false;
	// Pass email to login if user do mistake
	export let email = '';
	// Function for stock email in variable do on on:input email
	export let handleEmailChange: (event: Event) => void;
</script>

<!-- If login not Activated, display form Register -->
{#if !loginActivated}
	<!-- Send information to form -->
	<!-- Send Title/Action/Inputs/onSubmit Function/textSubmit -->
	<FormRegister
		title="Inscription"
		action="?/register"
		inputs={[
			// Display Inputs
			{
				// Group input for display it in row
				type: 'group',
				inputs: [
					// Firstname Input
					{
						type: 'text',
						label: 'Prénom*',
						name: 'firstName',
						value: ''
					},
					// Lastname Input
					{
						type: 'text',
						label: 'Nom*',
						name: 'name',
						value: ''
					}
				]
			},
			// Email Input
			{
				type: 'text',
				label: 'Email*',
				name: 'email',
				value: email,
				onInput: handleEmailChange
			},
			// Password Input
			{
				type: 'password',
				label: 'Mot de passe*',
				name: 'password',
				value: ''
			},
			// Password Confirmation Input
			{
				type: 'password',
				label: 'Confirmation mot de passe*',
				name: 'passwordConfirmation',
				value: ''
			}
		]}
		onSubmit={() => {
			console.log('submit');
		}}
		textSubmit="Inscription"
	/>
{/if}
