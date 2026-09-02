// Incrémente cette version à chaque mise à jour de l'app pour forcer
// le rafraîchissement du cache sur les téléphones déjà installés.
const CACHE = 'tontinepro-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(noms => Promise.all(
        noms.filter(n => n !== CACHE).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;

  // Réseau d'abord pour la page elle-même : l'utilisateur voit la dernière
  // version dès qu'il a du réseau, et le cache prend le relais hors ligne.
  if(event.request.mode === 'navigate'){
    event.respondWith(
      fetch(event.request)
        .then(reponse => {
          const copie = reponse.clone();
          caches.open(CACHE).then(c => c.put(event.request, copie));
          return reponse;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Cache d'abord pour le reste (icônes, manifest, polices).
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      return fetch(event.request).then(reponse => {
        if(reponse && reponse.status === 200 && reponse.type === 'basic'){
          const copie = reponse.clone();
          caches.open(CACHE).then(c => c.put(event.request, copie));
        }
        return reponse;
      }).catch(() => cached);
    })
  );
});
