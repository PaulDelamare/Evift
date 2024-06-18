<script lang="ts">
	// ! Import library
	import { enhance } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import type { FormInput } from '$lib/models/form/formLoginRegister.model';
	import { fade } from 'svelte/transition';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import Captcha from '$lib/components/extra/captcha/Captcha.svelte';
	import type { ActionData } from '../../../../routes/evift/login/$types';

	// ! Import variable
	// Title
	export let title = '';
	// Inputs
	export let inputs: FormInput[];
	// Function on for Submit
	export let onSubmit = () => {};
	// Form Actionw
	export let action = '';
	// Text in Submit Button
	export let textSubmit: string;
	// If gotgotPassword is true, display link for going on the page forgotPassword
	export let forgotPassword = false;
	// Function for change the value of loginActivated
	export let handleActivate = () => {};
	// Form for get error or success
	export let form: ActionData;

	// ! VARIABLE
	// Get toast store for display
	const toastStore = getToastStore();

	// Captcha for use function
	let captchaSubmit: Captcha;

	// Variable for stock captcha token
	let token = '';

	// Screen widt
	let innerWidth = 0;

	// transition duration for component apparition
	let duration = 500;

	// Function for disabled or able submitted button
	let submitted = false;

	// Toast
	const t: ToastSettings = {
		message: 'Votre compte à bien été crée',
		background: 'bg-secondary-500',
		classes: 'text-surface-500',
		hideDismiss: true
	};

	// ! DYNAMIC
	$: {
		// If innerWidth is under 850px, set duration to 0
		if (innerWidth < 850) {
			duration = 0;
		} else {
			// Else, set duration to 500
			duration = 500;
		}

		// If form is not null
		if (form) {
			// Reset submitted
			submitted = false;
			// If form.success is true
			if (form.success) {
				// Display toast
				toastStore.trigger(t);

				// Reset form
				form.success = false;
				// Call handleActivate
				handleActivate();
			}
		}
	}

</script>

<!-- Call Captcha component -->
<Captcha bind:this={captchaSubmit} bind:token/>

<!-- For innerwidth -->
<svelte:window bind:innerWidth />

<!-- Display Form -->
<div
	class="mobile-large:p-8 mobile:px-4 tablet:shadow-[41px_41px_82px_0_rgba(190,190,190,1),-41px_-41px_82px_0_rgba(255,255,255,1)] bg-surface-500 w-2/4 tablet:w-full p-12 column justify-center tablet:rounded-xl"
	in:fade={{ duration: 1000 }}
	out:fade={{ duration }}
>
	<!-- Display Form -->
	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		{action}
		method="post"
		on:submit|preventDefault={() => {
			onSubmit();
			submitted = true;
			captchaSubmit.onSubmitCaptcha()

		}}
		class="column w-full gap-10 text max-w-[450px] mx-auto"
	>
		<!-- Display Title -->
		<h2 class="text-gradient mobile:text-4xl">{title}</h2>

		<!-- Display Each Input -->
		{#each inputs as input}
			<!-- If the input is a group display it in row -->
			{#if input.type === 'group'}
				<div class="flex justify-between gap-8 mini-tablet:flex-col mini-tablet:w-full">
					{#each input.inputs as subInput}
						<Input
							type={subInput.type}
							label={subInput.label}
							name={subInput.name}
							value={subInput.value}
							onInputFunc={subInput.onInput}
							error={subInput.error}
						/>
					{/each}
				</div>
			{:else}
			<!-- Display input -->
				<Input
					type={input.type}
					label={input.label}
					name={input.name}
					value={input.value}
					onInputFunc={input.onInput}
					error={input.error}
				/>
			{/if}
		{/each}

		<!-- Display secret input -->
		<input class="hidden" type="text" name="secret" value="{token}">

		<!-- If forgot password is activated display forgot password link -->
		{#if forgotPassword}
			<!-- Forgot Password -->
			<a class="self-end text-secondary-500" href="/">Mot de passe oublie ?</a>
		{/if}

		<!-- Need Two div for do the hover animation with gradient border and text gradient -->
		<Submit {textSubmit} bind:submitted />

		<!-- Display error form -->
		{#if form?.errors?.error}
			<p in:fade={{ duration: 200 }} class="errorMessage">{form.errors.error}</p>
		{/if}
	</form>
</div>
