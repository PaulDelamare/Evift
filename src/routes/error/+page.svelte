<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-white">
    <div class="text-6xl font-extrabold text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4">
        {data.status}
    </div>
    <h1 class="text-3xl font-bold text-primary-500 mb-2">
        Oups, une erreur est survenue !
    </h1>
    <p class="text-lg text-secondary-500 mb-6">
        {data.message}
    </p>
    <a href="/" class="px-6 py-2 rounded-lg bg-primary-500 text-white font-semibold shadow hover:bg-secondary-500 transition">
        Retour à l'accueil
    </a>
</div>

<style>
.text-gradient {
    background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}
</style>