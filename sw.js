// sw.js - Service Worker con precaché del App Shell y estrategia Cache First

const CACHE_NAME = 'devconnect-shell-v1';

const STATIC_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './images/icon-192x192.png',
    './images/icon-512x512.png'
];

// INSTALL: Precaché de recursos
self.addEventListener('install', event => {
    console.log('SW: Guardando recursos estáticos en la caché...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW: Caché abierta:', CACHE_NAME);
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('SW: App Shell almacenado completo.x|');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('SW: Falló el precaché:', err);
                throw err;
            })
    );
});

// ACTIVATE: Tomar control de clientes inmediatamente
self.addEventListener('activate', event => {
    console.log('SW: Activado y listo.');
    event.waitUntil(self.clients.claim());
});

// FETCH: Estrategia Cache First
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el recurso está en la caché, se entrega desde ahí
                if (response) {
                    console.log('SW: Sirviendo desde Caché:', event.request.url);
                    return response;
                }
                
                // Si no está en caché, realiza la petición a la red
                console.log('SW: Buscando en red:', event.request.url);
                return fetch(event.request);
            })
            .catch(err => {
                console.error('SW: Error en fetch/caché:', err);
            })
    );
});