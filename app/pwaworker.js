const CACHE_NAME = 'decensored';
const urlsToCache = [
    "./index.html",
	"./css/tailwind.css",
	"./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
	"./node_modules/web3/dist/web3.min.js",
	"./node_modules/identicon.js/pnglib.js",
	"./node_modules/identicon.js/identicon.js",
	"./node_modules/jquery/dist/jquery.min.js",
	"./node_modules/autosize/dist/autosize.min.js",
	"./node_modules/cssuseragent/cssua.js"
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
	  .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', async (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!CACHE_NAME.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(async () => {

    })
  );
});
