---
layout: null
---

importScripts("/assets/js/workbox-v3.6.2/workbox-sw.js");

workbox.setConfig({
  debug: false,
  modulePathPrefix: "/assets/js/workbox-v3.6.2/"
});

workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.suppressWarnings();
workbox.navigationPreload.enable();
workbox.routing.setDefaultHandler(workbox.strategies.networkFirst());

workbox.precaching.precacheAndRoute([
{% for post in site.posts %}
  {
    url: "{{ post.url }}",
    revision: "{{ "now" | date: "%s" }}"
  },
{% endfor %}
{% for page in site.pages %}
  {% if page.url %}
  {
    url: "{{ page.url }}",
    revision: "{{ "now" | date: "%s" }}"
  },
  {% endif %}
{% endfor %}
  {
    url: "/assets/js/bundle.js",
    revision: "{{ "now" | date: "%s" }}"
  }
]);

workbox.routing.registerRoute(
  /(.*)/,
  workbox.strategies.networkFirst({
    cacheName: "{{ site.site_name | slugify }}-cache-v1",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 24 * 60 * 60 // 10 Days
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);
