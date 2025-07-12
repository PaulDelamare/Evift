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

self.addEventListener('fetch', event => {
     if (event.request.url.includes('/api/') ||
          event.request.url.includes('/uploads/')) {
          return;
     }

     event.respondWith(
          fetch(event.request)
               .catch(() => {
                    return caches.match(event.request)
                         .then(cachedResponse => {
                              return cachedResponse || new Response('Not found', { status: 404 });
                         });
               })
     );
});

self.addEventListener('message', event => {
     if (event.data && event.data.type === 'SKIP_WAITING') {
          self.skipWaiting();
     }
});

// Command for generate img for download : npx @vite-pwa/assets-generator --preset minimal static/logo.svg (change logo to your logo)