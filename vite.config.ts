import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit(), purgeCss()],
    build: {
        target: ['es2022'], // Cible plus récente pour supporter top-level await
        minify: true
    },
    optimizeDeps: {
        // Exclure les dépendances qui pourraient causer des problèmes
        exclude: [
            'driver.js', // car vous l'utilisez et il pourrait causer des problèmes
            '@vinejs/vine' // même si vous ne l'utilisez pas directement
        ]
    },
    // Ajout pour gérer les modules Node.js qui pourraient être importés
    ssr: {
        noExternal: ['driver.js'] // Garder driver.js dans le bundle SSR
    }
});
