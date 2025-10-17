const CACHE_NAME = 'adsi-suite-v1';
const urlsToCache = [
  '/',
  'ejecutiva.html',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Poppins:wght@700;800&display=swap',
  'freepik__the-style-is-candid-image-photography-with-natural__79998.png',
  'freepik__the-style-is-candid-image-photography-with-natural__80012.png',
  'freepik__the-style-is-candid-image-photography-with-natural__80016.png',
  'freepik__-prompt-experto-logotipo-kaiqi-prompt-versin-exten__80001.png',
  'freepik__a-highresolution-digital-screen-mockup-displaying-__80855.png',
  'freepik__-prompt-experto-logotipo-kaiqi-prompt-versin-exten__80003.png',
  'https://storage.googleapis.com/gemini-prod-us-west1-8833/i/52a8a7ca-1c1d-4876-8051-7eb92b8d002f.jpg',
  'https://storage.googleapis.com/gemini-prod-us-west1-8833/i/781878d2-43d9-4b68-8097-40285a81e938.jpg'
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
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
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

