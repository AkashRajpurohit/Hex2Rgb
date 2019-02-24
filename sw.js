const appVersion = "v1.0.3";

// Files to cache
const files = [
	'./',
	'./index.html',
	'./css/styles.css',
	'./js/main.js',
	'./js/jquery.min.js',
	'./fonts/Arimo.ttf',
	'./icon/favicon.ico',
	'./icon/app-icon-96x96.png'
]

// Install
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(appVersion)
			.then(cache => {
				return cache.addAll(files)
			})
			.catch(err => console.log('Error adding files to cache', err))
	)
	console.info('SW installed')
	self.skipWaiting();
})

// Activate
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cache => {
						if(cache !== appVersion) {
							console.log("Deleting old caches", cache)
							return caches.delete(cache)
						}
					})
				)
			})
	)
	return self.clients.claim();
})

// Fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});