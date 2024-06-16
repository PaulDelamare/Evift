<script lang="ts">
	// Import library
	import { enhance } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import type { FormInput } from '$lib/models/form/formLoginRegister.model';
	import { fade } from 'svelte/transition';
	import type { ActionData } from '../../../../routes/(public)/login/$types';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import Captcha from '$lib/components/extra/captcha/Captcha.svelte';

	// Import variable
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

	export let handleActivate = () => {};

	export let form: ActionData;

	const toastStore = getToastStore();

	let captchaSubmit: Captcha;
	let token = '';

	// Variable
	let innerWidth = 0;
	let duration = 500;
	let submitted = false;

	const t: ToastSettings = {
		message: 'Votre compte à bien été crée',
		background: 'bg-secondary-500',
		classes: 'text-surface-500',
		hideDismiss: true
	};

	// Dynamic
	$: {
		if (innerWidth < 850) {
			duration = 0;
		} else {
			duration = 500;
		}

		if (form) {
			submitted = false;
			if (form.success) {
				toastStore.trigger(t);

				form.success = false;
				handleActivate();
			}
		}
	}

	
</script>

<Captcha bind:this={captchaSubmit} bind:token/>

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
		<input class="hidden" type="text" name="secret" value="{token}">

		<!-- If forgot password is activated display forgot password link -->
		{#if forgotPassword}
			<!-- Forgot Password -->
			<a class="self-end text-secondary-500" href="/">Mot de passe oublie ?</a>
		{/if}

		<!-- Need Two div for do the hover animation with gradient border and text gradient -->
		<Submit {textSubmit} bind:submitted />
		{#if form?.errors?.error}
			<p in:fade={{ duration: 200 }} class="errorMessage">{form.errors.error}</p>
		{/if}
	</form>
</div>
