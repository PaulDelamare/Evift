<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import type { FormInput } from '$lib/models/form/formLoginRegister.model';
	import { fade } from 'svelte/transition';
	import Captcha from '$lib/components/extra/captcha/Captcha.svelte';
	import { enhance } from '$app/forms';
	import CustomCheckbox from '$lib/components/extra/CustomCheckbox.svelte';

	export let title = '';
	export let inputs: FormInput[];
	export let onSubmit = () => {};
	export let action = '';
	export let textSubmit: string;
	export let forgotPassword = false;
	export let submitted = false;
	export let PUBLIC_CAPTCHA_KEY: string;
	export let rgpd = false;
	export let errorRgpd: string | undefined = undefined;

	let captchaSubmit: Captcha;
	let token = '';
	let innerWidth = 0;
	let duration = 500;

	$: {
		if (innerWidth < 850) {
			duration = 0;
		} else {
			duration = 500;
		}
	}
</script>

<Captcha {PUBLIC_CAPTCHA_KEY} bind:this={captchaSubmit} bind:token />

<svelte:window bind:innerWidth />

<div
	class="mobile-large:p-8 mobile:px-4 tablet:shadow-[41px_41px_82px_0_rgba(190,190,190,1),-41px_-41px_82px_0_rgba(255,255,255,1)] bg-surface-500 w-2/4 tablet:w-full p-12 column justify-center tablet:rounded-xl min-h-[744.5px]"
	in:fade={{ duration: 1000 }}
	out:fade={{ duration }}
>
	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		{action}
		method="post"
		on:submit={() => {
			onSubmit();
			submitted = true;
			captchaSubmit.onSubmitCaptcha();
		}}
		class="column w-full gap-10 text max-w-[450px] mx-auto"
	>
		<h2 class="text-gradient mobile:text-4xl">{title}</h2>

		{#each inputs as input}
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

		<input class="hidden" type="text" name="secret" value={token} />

		{#if forgotPassword}
			<a class="self-end text-secondary-500" href="/">Mot de passe oublie ?</a>
		{/if}

		{#if rgpd}
			<label for="rgpd" class="text-gradient flex items-center gap-1 font-medium">
				<CustomCheckbox classCheck="!scale-50" name="rgpd" />

				J'accepte la
				<div>
					<a href="/privacy" class="">politique de confidentialité</a>
					<div class="h-[2px] w-full gradient"></div>
				</div>
			</label>

			{#if errorRgpd}
				<p in:fade={{ duration: 200 }} class="errorMessage">
					{errorRgpd}
				</p>
			{/if}
		{/if}

		<Submit {textSubmit} bind:submitted />
	</form>
</div>
