const cacheName = "V1";
const CACHE_CONTAINING_ERROR_MESSAGES = "Fetch Cache Error";

const cacheAssets = [
  "/static/js/*.js",
  "/static/css/*.css",
  "/static/media/*.jpg"
];

self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker :  Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  console.log("Service Worker : Activated");

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker : Clearing Old Cahce");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  // console.log("this public :"+event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response; // if valid response is found in cache return it
      } else {
        return fetch(event.request) //fetch from internet
          .then(function(res) {
            return caches.open(cacheName).then(function(cache) {
              cache.put(event.request.url, res.clone()); //save the response for future
              return res; // return the fetched data
            });
          })
          .catch(function(err) {
            return err;
            // fallback mechanism
            // return caches
            //   .open(CACHE_CONTAINING_ERROR_MESSAGES)
            //   .then(function(cache) {
            //     //return cache.match("/offline.html");
            //   });
          });
      }
    })
  );
});
