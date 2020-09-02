---
layout: blank
---

importScripts("/assets/js/workbox-v5.1.3/workbox-sw.js");

workbox.setConfig({
  debug: false,
  modulePathPrefix: "/assets/js/workbox-v5.1.3/"
});

// precache all mmy posts and pages + bundles.js
workbox.precaching.precacheAndRoute([
{% for post in site.posts %}{url: '{{ post.url }}', revision: '{{ "now" | date: "%s" }}' },
{% endfor %}
{% for page in site.pages %}{% if page.url %}{url: '{{ page.url }}', revision: '{{ "now" | date: "%s" }}' },{% endif %}
{% endfor %}
{url: '/assets/js/bundle.js', revision: '{{ "now" | date: "%s" }}' }
], {
  directoryIndex: null,
});

// cache images
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: '{{ site.site_name | slugify }}-cache-v1',
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
    cacheName: '{{ site.site_name | slugify }}-cache-v1',
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
