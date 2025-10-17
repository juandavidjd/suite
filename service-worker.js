const CACHE_NAME = 'adsi-suite-v2';
const urlsToCache = [
  './',
  './index.html',
  './offline.html',
  './site.webmanifest',
  './browserconfig.xml',
  './favicon.ico',
  './favicon-192.png',
  './favicon-512.png',
  './freepik__the-style-is-candid-image-photography-with-natural__79998.png',
  './freepik__the-style-is-candid-image-photography-with-natural__80012.png',
  './freepik__the-style-is-candid-image-photography-with-natural__80016.png',
  './freepik__-prompt-experto-logotipo-kaiqi-prompt-versin-exten__80001.png',
  './freepik__a-highresolution-digital-screen-mockup-displaying-__80855.png',
  './freepik__-prompt-experto-logotipo-kaiqi-prompt-versin-exten__80003.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Poppins:wght@700;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).catch(() => caches.match('./offline.html')))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

