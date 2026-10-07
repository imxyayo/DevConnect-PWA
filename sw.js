// sw.js - Service Worker con precaché del App Shell

// 1. Nombre y versión de la caché estática
const CACHE_NAME = 'devconnect-shell-v1';

// 2. Recursos estáticos obligatorios
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './images/icon-192x192.png',
    './images/icon-512x512.png'
];

// INSTALL: guardamos los recursos estáticos
self.addEventListener('install', event => {
    console.log('SW: Guardando recursos estáticos en la caché...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW: Caché abierta:', CACHE_NAME);
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('SW: App Shell almacenado completo.');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('SW: Falló el precaché:', err);
                throw err; // para que se note si algo sale mal
            })
    );
});

// ACTIVATE
self.addEventListener('activate', event => {
    console.log('SW: Activado y listo.');
    event.waitUntil(self.clients.claim());
});

// FETCH: por ahora solo monitoreamos
self.addEventListener('fetch', event => {
    console.log('SW pidiendo:', event.request.url);
});