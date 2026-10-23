const CACHE='mielo-k4r7tq-v1';
const CORE=['/mielo-k4r7tq.html','/mielo-k4r7tq.webmanifest','/mielo-icon-192.png','/mielo-icon-512.png','/mielo-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('mielo-k4r7tq-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url); if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone(); caches.open(CACHE).then(x=>x.put('/mielo-k4r7tq.html',c));} return res;}).catch(()=>caches.match('/mielo-k4r7tq.html')));return;}
 if(CORE.includes(u.pathname)) e.respondWith(caches.match(u.pathname).then(h=>h||fetch(r)));});
