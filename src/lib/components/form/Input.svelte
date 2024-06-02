<script lang="ts">
    // Import variable
    export let value = '';
    export let onInputFunc = (event: Event): void => {};
    export let type = "text";
    export let label = "";
    export let name = "";

    // Function    
    /**
     * Creates an array of objects, each containing a character from the input text
     * and the delay in milliseconds for the animation.
     *
     * @param {string} text - The text to create spans from.
     * @return {Array<{char: string, delay: number}>} An array of objects with the character and delay.
     */
    function createLabelSpans(text: string) {
        let spans = [];
        let delay = 0;

        for (let char of text) {
            spans.push({ char, delay });
            delay += 50;
        }

        return spans;
    }

    // Create spans table for animation
    let labelSpans = createLabelSpans(label);

</script>
<!-- Container-->
<div class="form-control gradient">
    <!-- Email Input need required for animation -->
    <input type="{type}" class="text-tertiary-500" name="{name}" required value="{value}" on:input={onInputFunc}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- Label with All span in letter for animation -->
    <label class="text-gradient">
        {#each labelSpans as { char, delay }}
            <span style="transition-delay:{delay}ms">{char}</span>
        {/each}    
    </label>
</div>

<style lang="postcss">
    /* All input css for animation */
    .form-control {
        @apply relative pb-[2px] w-full;
    }

    .form-control input {
        @apply bg-surface-500 border-0 py-4 text-base w-full;
    }

    .form-control input:focus,
    .form-control input:active {
        @apply border-b-light-blue-500 outline-0;
    }

    .form-control label {
        @apply pl-2 absolute top-4 left-0 pointer-events-none
    }

    .form-control label span {
        @apply inline-block text-base mobile:text-[.9rem] min-w-2 transition-[0.3s_cubic-bezier(0.68,-0.55,0.265,1.55)];
    }

    .form-control input:focus+label span,
    .form-control input:valid+label span {
        @apply text-light-blue-500 -translate-y-8;
    }
</style>