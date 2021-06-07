---
layout: blank
---

importScripts("/assets/js/workbox-v6.1.5/workbox-sw.js");

workbox.setConfig({
  debug: false,
  modulePathPrefix: "/assets/js/workbox-v6.1.5/"
});

var CACHE_NAME='{{ site.site_name | slugify }}-cache';

// precache all mmy posts and pages + bundles.js
workbox.precaching.precacheAndRoute([
{% for post in site.posts %}{url: '{{ post.url }}', revision: '{{ "now" | date: "%s" }}' },
{% endfor %}{% for page in site.pages %}{% if page.url %}{url: '{{ page.url }}', revision: '{{ "now" | date: "%s" }}' },{% endif %}
{% endfor %}{url: '/assets/js/bundle.js', revision: '{{ "now" | date: "%s" }}' }
], {
  directoryIndex: null,
});

// cache images
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 24 * 60 * 60 // 10 Days
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  })
);

// cache styles
workbox.routing.registerRoute(
  ({request}) => request.destination === 'style',
  new workbox.strategies.CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 24 * 60 * 60 // 10 Days
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  })
);

var urlsToCache = [
{% for post in site.posts %}  '{{ post.url }}',
{% endfor %}{% for page in site.pages %}{% if page.url %}  '{{ page.url }}',{% endif %}
{% endfor %}  '/assets/js/bundle.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') {
    /* Only deal with GET requests */
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('message', (event) => {
  console.log('Message received');
  if (event.data && event.data.type === 'SKIP_WAITING') {
    return self.skipWaiting();
  }
});
