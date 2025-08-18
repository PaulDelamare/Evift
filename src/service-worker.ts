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

     event.respondWith((async () => {
          try {
               const networkResponse = await fetch(event.request);
               if (event.request.method === 'GET' && networkResponse.ok) {
                    const cache = await caches.open(CACHE);
                    cache.put(event.request, networkResponse.clone());
               }
               return networkResponse;
          } catch (error) {
               self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                         client.postMessage({ type: 'OFFLINE' });
                    });
               });

               const cachedResponse = await caches.match(event.request);
               if (cachedResponse) {
                    return cachedResponse;
               }

               if (event.request.mode === 'navigate') {
                    return caches.match('/')
                         .then(response => response || new Response('Vous êtes hors ligne.', { status: 503, statusText: 'Offline' }));
               }
               return new Response('Vous êtes hors ligne.', { status: 503, statusText: 'Offline' });
          }
     })());
});

self.addEventListener('message', event => {
     if (event.data && event.data.type === 'SKIP_WAITING') {
          self.skipWaiting();
     }
});

// Command for generate img for download : npx @vite-pwa/assets-generator --preset minimal static/logo.svg (change logo to your logo)