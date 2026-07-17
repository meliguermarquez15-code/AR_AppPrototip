const CACHE_NAME = 'ar-scanner-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './targets.mind' // Tu base de datos de imágenes
];

// Instalar el Service Worker y guardar los archivos esenciales en la memoria caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Interceptar las peticiones para que la app cargue de inmediato
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
