<script lang="ts">
	// ! IMPORT
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	// Import variable
	export let textSubmit = 'Connexion';

	// Know if form is submitted
	export let submitted: boolean;
	
</script>


<!-- Container for animation -->
<div class="w-full group bg-gradient p-[2px] active:scale-95 custom-transition">
	<!-- Second div for animation -->
	<div class="w-full group-hover:bg-surface-500 custom-transition {submitted ? 'bg-surface-500' : ''}">
		<!-- Submit button -->
		<button
			class="w-full 0 py-3 nav  group-hover:text-gradient {submitted ? 'text-gradient' : 'text-surface-500'} custom-transition !duration-300 between justify-center gap-8"
			type="submit"
			disabled={submitted}
		>
			<b>{textSubmit}</b>
			<!-- Display Progress if submitted (spinner) -->
			{#if submitted}
				<ProgressRadial value={undefined} width="w-8" fill="fill-red-500" track="stroke-tertiary-500/30" meter="stroke-secondary-500"/>
			{/if}
		</button>
	</div>
</div>
