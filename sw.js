// Service worker: solo cachea el "app shell" para que el widget abra al instante.
// Las tasas de cambio se manejan (y cachean) directamente en index.html vía localStorage,
// así que las peticiones al API de cambio nunca pasan por acá (siempre van a red).

var CACHE = "convclp-shell-v6";
var SHELL = ["./", "./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE).then(function(cache){ return cache.addAll(SHELL); })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event){
  var url = event.request.url;

  // Nunca interceptar llamadas a APIs externas de tasas de cambio: siempre a red.
  if (event.request.method !== "GET" || url.indexOf(self.location.origin) !== 0) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached){
      var network = fetch(event.request).then(function(res){
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function(cache){ cache.put(event.request, copy); });
        }
        return res;
      }).catch(function(){ return cached; });
      // cache-first para que abra instantáneo; refresca en background
      return cached || network;
    })
  );
});
