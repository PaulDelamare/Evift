<script lang="ts">

    // Imports
    import { quintOut } from "svelte/easing";
	import { fade } from "svelte/transition";
    import Navigation from "../../layout/Navigation.svelte";

    // Import variable
    export let divClass = '';

    // Variables
    let burger = false;

    // Functions
    /**
    * Change the value of the `burger` variable to `false`.
    *
    * This function is used to close the burger menu when the user clicks on a page.
    *
    * @return {void} This function returns nothing.
    */
    const changePage = (): void => {
        burger = false;
    }

</script>

<!-- Burger Bouton -->
<div class="absolute right-10 top-2/4 -translate-y-1/4 z-50 {divClass}">
    <div id="menuToggle ">
        <!-- Define Hidden input for know if it check -->
        <input on:change={()=>{burger = !burger}} bind:checked={burger} id="checkbox" class="hidden" type="checkbox">

        <!-- Burger Icon -->
        <label  class="toggle relative w-10 cursor-pointer m-auto block h-[calc(4px_*_3_+_11px_*_2)]" for="checkbox">
            <!-- For Top Bar -->
            <div class="bar gradient-secondary bar--top bottom-[calc(50%_+_11px_+_4px/_2)] transition-[bottom,margin,transform] delay-[calc(0s_+0.35s),0s,0s]"></div>
            <!-- For Middle Bar -->
            <div class="bar gradient-secondary bar--middle top-[calc(50%_-_4px/_2)] transition-[top,opacity] duration-[0.35s,0s] delay-[calc(0s_+_0.35s_*_1.3),calc(0s_+_0.35s_*_1.3)]"></div>
            <!-- For Bottom Bar -->
            <div class="bar gradient-secondary bar--bottom top-[calc(50%_+_11px_+_4px/_2)] transition-[top,transform] delay-0"></div>
        </label>
    </div>
</div>

{#if burger}
    <div in:fade={{ duration: 300, easing: quintOut }} out:fade={{ duration: 300, easing: quintOut }} class="fixed top-0 left-0 right-0 bottom-0 gradient z-40">
        <Navigation on:changePage={changePage} ulClass="column justify-center h-screen" navClass="w-screen h-screen" liClass="w-full text-center" aClass="text-surface-500 py-6 w-full inline-block" mobile/>
    </div>
{/if}

<style lang="postcss">

    /* Define global class */
    .bar {
        @apply absolute left-0 right-0 h-1 rounded-[calc(4px_/_2)] bg-secondary-500 text-inherit opacity-100 transition-[none_0.35s_cubic-bezier(.5,-0.35,.35,1.5)_0s];
    }

    /***** Collapse Animation *****/
    #checkbox:checked + .toggle .bar{
        @apply !bg-transparent bg-[linear-gradient(rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_100%)] transition-all duration-300;
    }

    #checkbox:checked + .toggle .bar--top {
        @apply bottom-[calc(50%_-_11px_-_4px)] mb-[calc(11px_+_4px/_2)] rotate-45 delay-[calc(0s_+_0.35s_*_.3),calc(0s_+_0.35s_*_1.3),calc(0s_+_0.35s_*_1.3)];
    }

    #checkbox:checked + .toggle .bar--middle {
        @apply top-[calc(50%_+_11px)] opacity-0 duration-[0.35s,0s] delay-[0s,calc(0s_+_0.35s)];
    }

    #checkbox:checked + .toggle .bar--bottom {
        @apply top-[calc(50%_-_4px/_2)] -rotate-45 delay-[calc(0s_+_0.35s_*_1.3),calc(0s_+_0.35s_*_1.3)];
    }
</style>
