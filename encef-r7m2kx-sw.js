const CACHE='encef-r7m2kx-v4';
const CORE=['/encef-r7m2kx.html','/encef-r7m2kx.webmanifest','/encef-icon-192.png','/encef-icon-512.png','/encef-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('encef-r7m2kx-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url); if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone(); caches.open(CACHE).then(x=>x.put('/encef-r7m2kx.html',c));} return res;}).catch(()=>caches.match('/encef-r7m2kx.html')));return;}
 if(CORE.includes(u.pathname)) e.respondWith(caches.match(u.pathname).then(h=>h||fetch(r)));});
