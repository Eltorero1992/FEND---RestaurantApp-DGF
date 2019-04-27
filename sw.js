
// Creates name for cache

var staticCacheName = 'restaurantApp-static-v1';


// Registers service workers and sets scope to root

if('serviceWorker' in navigator) {
    navigator.serviceWorker
         .register('/sw.js', {scope : '/'})
         .then(function() {
          console.log("Service Worker Registered"); });
}

// Listens for service worker installation and add resources to cache
// TODO: The number of resources to load (although done async) takes a toll on the loading of the webapge

self.addEventListener('install',function(event){

	// console.log(event)

	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
	        '/',
		    '/js/dbhelper.js',
		    '/js/main.js',
		    '/js/restaurant_info.js',
		    '/img/1.jpg',
		    '/img/2.jpg',
		    '/img/3.jpg',
		    '/img/4.jpg',
		    '/img/5.jpg',
		    '/img/6.jpg',
		    '/img/7.jpg',
		    '/img/8.jpg',
		    '/img/9.jpg',
		    '/img/10.jpg',
		    '/data/restaurants.json',
		    '/css/',
		    '/css/styles.css',
		    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
		    'https://static-assets.mapbox.com/gl-pricing/dist/mapbox-gl.js',
		    'https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css',
		    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
		    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png'
		    ]);
		})
	);
});

// Listens for all fetch events and always retrieves information from cache
// TODO: Only retrieve info from cache when offline

self.addEventListener('fetch', function(event) {
	console.log('Caught request for ' + event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
	);
});