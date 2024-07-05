<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import UploadFileSvg from '../svg/UploadFileSvg.svelte';
	import LogoSvg from '../extra/logo/LogoSvg.svelte';

	export let label: string;

	export let image: HTMLImageElement;
	let files: FileList;
	export let result: string;
	export let name: string;
	export let multiple = false;
	export let preview = true;

	let showImage = false;

	function onChange() {
		if (preview) {
			const file = files[0];

			if (file) {
				showImage = true;

				const reader = new FileReader();
				reader.addEventListener('load', function () {
					image.setAttribute('src', reader.result as string);
					result = reader.result as string;
				});
				reader.readAsDataURL(file);

				return;
			}
			showImage = false;
		}
	}
</script>

<div class=" w-full max-w-[500px]">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="flex flex-col gap-2">
		<h5>{label}</h5>
		<div class="">
			<FileDropzone
				{multiple}
				rounded="rounded bg-surface-400"
				border="shadow-lg"
				bind:files
				on:change={onChange}
				{name}
			>
				<svelte:fragment slot="lead"
					><UploadFileSvg classSvg="fill-secondary-500 max-w-8 mx-auto" /></svelte:fragment
				>
				<svelte:fragment slot="message"
					><strong>Télécharger un fichier</strong> ou faites un glisser-déposer</svelte:fragment
				>
				<svelte:fragment slot="meta">PNG, JPG et GIG autorisé</svelte:fragment>
			</FileDropzone>
		</div>
	</label>
</div>

{#if preview}
	<div
		class="h-44 w-52 overflow-hidden box-border bg-surface-500 shadow-md rounded-lg"
	>
		{#if showImage}
			<img class="object-cover object-center w-full h-full" bind:this={image} src="" alt="Preview" />
		{:else}
			<!-- <span>Visualisation de l'image</span> -->
			<div class="bg-gradient w-full h-full flex items-center justify-center">
				<LogoSvg fill="fill-surface-500" widthSvg={75} />
			</div>
		{/if}
	</div>
{/if}
