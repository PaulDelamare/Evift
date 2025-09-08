<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import type { FormInput } from '$lib/models/form/formLoginRegister.model';
	import { fade } from 'svelte/transition';
	import Captcha from '$lib/components/extra/captcha/Captcha.svelte';
	import { enhance } from '$app/forms';
	import CustomCheckbox from '$lib/components/extra/CustomCheckbox.svelte';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

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
	export let moreContent = "";
	export let classCustom = "";
	export let classForm = "";

	let captchaSubmit: Captcha;
	let token = '';
	let duration = 500;

	$: {
		if ($innerWidthStore < 850) {
			duration = 0;
		} else {
			duration = 500;
		}
	}
</script>

<Captcha {PUBLIC_CAPTCHA_KEY} bind:this={captchaSubmit} bind:token />


<div
	class="{classCustom} mobile-large:p-8 mobile:px-2 tablet:shadow-[41px_41px_82px_0_rgba(190,190,190,1),-41px_-41px_82px_0_rgba(255,255,255,1)] bg-surface-500 w-2/4 tablet:w-full p-12 column justify-center tablet:rounded-xl  {$innerWidthStore < 1151 ? 'min-h-0' : 'min-h-[744.5px]'}"
	in:fade={{ duration: 1000 }}
	out:fade={{ duration }}
>
	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false, invalidateAll: false });
			};
		}}
		{action}
		method="post"
		on:submit={() => {
			onSubmit();
			submitted = true;
			captchaSubmit.onSubmitCaptcha();
		}}
		class="{classForm} column w-full gap-10 text max-w-[450px] mx-auto"
	>
		<h2 class="!text-gradient mobile:text-4xl">{title}</h2>
		<p class="text-center text-sm">{moreContent}</p>

		{#each inputs as input}
			{#if input.type === 'group'}
				<div class="flex justify-between !w-full gap-8 mini-tablet:flex-col mini-tablet:w-full">
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
			<a class="self-end text-secondary-500" href="/evift/login/forgot-password">Mot de passe oublie ?</a>
		{/if}

		{#if rgpd}
			<label for="rgpd" class="text-gradient flex items-center gap-2 font-medium mobile:text-sm tablet:text-base w-full">
				<CustomCheckbox classCheck="!scale-50" name="rgpd" />

				<span class="flex items-center gap-1 flex-wrap">
					J'accepte la
					<a href="/privacy" class="break-words min-w-[120px]">
						politique de confidentialité
						<div class="h-[1px] w-full gradient"></div>
					</a>
				</span>
			</label>

			{#if errorRgpd}
				<p in:fade={{ duration: 200 }} class="errorMessage mobile:text-xs tablet:text-sm">
					{errorRgpd}
				</p>
			{/if}
		{/if}

		<Submit {textSubmit} bind:submitted />
	</form>
</div>
