<div class="bg-surface-500 w-2/4 p-12">
    <!-- Display Form -->
    <form class="column w-full gap-12 text max-w-[450px] mx-auto">
        <!-- Display Title -->
        <h2 class="text-gradient">Connexion</h2>
        <!-- Email Input -->
        <div class="form-control gradient">
            <!-- Email Input need required for animation -->
            <input type="text" class="text-tertiary-500" required>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <!-- Label with All span in letter for animation -->
            <label class="text-gradient">
                <span style="transition-delay:0ms">E</span><span style="transition-delay:50ms">m</span><span style="transition-delay:100ms">a</span><span style="transition-delay:150ms">i</span><span style="transition-delay:200ms">l</span>
            </label>
        </div>
        <!-- Password Input -->
        <div class="form-control gradient">
            <!-- Password Input need required for animation -->
            <input type="text" class="text-tertiary-500"  required>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <!-- Label with All span in letter for animation -->
            <label class="text-gradient">
                <span style="transition-delay:0ms">M</span><span style="transition-delay:50ms">o</span><span  style="transition-delay:100ms">t</span><span  style="transition-delay:150ms"> </span><span  style="transition-delay:200ms">d</span><span  style="transition-delay:250ms">e</span><span  style="transition-delay:300ms"> </span><span  style="transition-delay:350ms">p</span><span  style="transition-delay:400ms">a</span><span  style="transition-delay:450ms">s</span><span  style="transition-delay:500ms">s</span><span  style="transition-delay:550ms">e</span>
            </label>
        </div>
        <a class="self-end text-secondary-500" href="/">Mot de passe oublie ?</a>
        <!-- Need Two div for do the hover animation with gradient border and text gradient -->
        <div class="w-full group bg-gradient p-[2px] active:scale-95 custom-transition">
            <!-- Second div for animation -->
            <div class="w-full group-hover:bg-surface-500 custom-transition">
                <!-- Submit button -->
                <button class="w-full 0 py-3 nav text-surface-500 group-hover:text-gradient custom-transition !duration-300" type="submit">
                    Connexion
                </button>
            </div>
        </div>
    </form>
</div>

<style lang="postcss">

    /* All input css for animation */
    .form-control {
        @apply relative bg-red-500 pb-[2px] w-full;
    }

    .form-control input {
        @apply bg-surface-500 border-0 py-4 text-base w-full;
    }

    .form-control input:focus,
    .form-control input:valid {
        @apply border-b-light-blue-500 outline-0;
    }

    .form-control label {
        @apply pl-2 absolute top-4 left-0 pointer-events-none
    }

    .form-control label span {
        @apply inline-block text-base min-w-2 transition-[0.3s_cubic-bezier(0.68,-0.55,0.265,1.55)];
    }

    .form-control input:focus+label span,
    .form-control input:valid+label span {
        @apply text-light-blue-500 -translate-y-8;
    }
</style>