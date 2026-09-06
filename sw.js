// Service worker: rede primeiro, cache só quando estiver offline.
// Subir a versão abaixo invalida o cache antigo nos celulares.
const CACHE = "outerdle-v8";
const FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/app.js",
  "./icon-192.png",
  "./manifest.webmanifest",
  "./assets/logo.png",
  "./assets/wallpaper.jpg",
  "./assets/campfire.jpg",
  "./assets/riebeck.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // fontes do Google etc. seguem direto
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // não guarda 404/500 no cache, senão fica servindo erro offline
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(async () => {
        const hit = await caches.match(e.request, { ignoreSearch: true });
        if (hit) return hit;
        // só navegação cai no index; css/js/imagem que faltou vira erro mesmo
        if (e.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      })
  );
});
