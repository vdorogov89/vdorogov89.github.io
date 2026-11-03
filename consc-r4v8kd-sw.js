const CACHE='consc-r4v8kd-v10';
const CORE=['/consc-r4v8kd.html','/consc-r4v8kd.webmanifest','/consc-icon-192.png','/consc-icon-512.png','/consc-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('consc-r4v8kd-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url); if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone(); caches.open(CACHE).then(x=>x.put('/consc-r4v8kd.html',c));} return res;}).catch(()=>caches.match('/consc-r4v8kd.html')));return;}
 if(CORE.includes(u.pathname)) e.respondWith(caches.match(u.pathname).then(h=>h||fetch(r)));});
