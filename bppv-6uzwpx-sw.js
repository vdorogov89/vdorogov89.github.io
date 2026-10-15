const CACHE='bppv-6uzwpx-v1';
const CORE=['/bppv-6uzwpx.html','/bppv-6uzwpx.webmanifest','/bppv-icon-192.png','/bppv-icon-512.png','/bppv-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('bppv-6uzwpx-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url); if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone(); caches.open(CACHE).then(x=>x.put('/bppv-6uzwpx.html',c));} return res;}).catch(()=>caches.match('/bppv-6uzwpx.html')));return;}
 if(CORE.includes(u.pathname)) e.respondWith(caches.match(u.pathname).then(h=>h||fetch(r)));});
