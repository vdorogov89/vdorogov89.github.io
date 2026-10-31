// Офлайн-работа дневника головной боли. Записи хранятся в localStorage и сюда не попадают.
const CACHE = 'diary-v11';
const CORE = ['/diary.html', '/diary-icon-192.png', '/diary-icon-512.png', '/diary-apple-icon.png', '/diary.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('diary-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Страница дневника: сначала сеть (чтобы обновления приходили сразу), без сети — сохранённая копия
  if (req.mode === 'navigate' && url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put('/diary.html', copy)); } return r; })
      .catch(() => caches.match('/diary.html')));
    return;
  }
  // Шрифты Google: из кэша, в фоне обновляем
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // Иконки и манифест: из кэша
  if (url.origin === location.origin && CORE.includes(url.pathname)) {
    e.respondWith(caches.match(url.pathname).then(hit => hit || fetch(req)));
  }
  // Остальное (счётчик Метрики и т.п.) — без вмешательства
});
