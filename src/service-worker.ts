/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, version } from '$service-worker';

const CACHE = `cache-${version}`;

self.addEventListener('install', event => {
     event.waitUntil(
          caches.open(CACHE)
               .then(cache => cache.addAll([
                    '/',
                    ...build.filter(url => url.endsWith('.css') || url.endsWith('.js')) // Assets essentiels
               ]))
     );
});

self.addEventListener('activate', event => {
     event.waitUntil(
          (async () => {
               for (const key of await caches.keys()) {
                    if (key !== CACHE) {
                         await caches.delete(key);
                    }
               }
               await self.clients.claim();
          })()
     );
});

self.addEventListener('fetch', async event => {
     if (event.request.url.includes('/api/') ||
          event.request.url.includes('/uploads/')) {
          return;
     }

     event.respondWith((async () => {
          try {
               const response = await fetch(event.request);
               return response;
          } catch (error) {
               const cachedResponse = await caches.match(event.request);
               if (cachedResponse) {
                    return cachedResponse;
               }
               // Redirige vers la page d'erreur SvelteKit
               return Response.redirect('/error?status=400&message=Vous%20%C3%AAtes%20hors%20ligne', 302);
          }
     })());
});

self.addEventListener('message', event => {
     if (event.data && event.data.type === 'SKIP_WAITING') {
          self.skipWaiting();
     }
});

// Command for generate img for download : npx @vite-pwa/assets-generator --preset minimal static/logo.svg (change logo to your logo)