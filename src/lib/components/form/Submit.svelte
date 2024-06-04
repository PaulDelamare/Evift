<script lang="ts">
	// Import variable
	export let textSubmit = 'Connexion';
</script>

<!-- Container for animation -->
<div class="w-full group bg-gradient p-[2px] active:scale-95 custom-transition">
	<!-- Second div for animation -->
	<div class="w-full group-hover:bg-surface-500 custom-transition">
		<!-- Submit button -->
		<button
			class="w-full 0 py-3 nav text-surface-500 group-hover:text-gradient custom-transition !duration-300"
			type="submit"
		>
			{textSubmit}
		</button>
	</div>
</div>
