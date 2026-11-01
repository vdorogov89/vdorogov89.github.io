const CACHE='nstat-w8r4ja-v3';
const CORE=['/nstat-w8r4ja.html','/nstat-w8r4ja.webmanifest','/nstat-icon-192.png','/nstat-icon-512.png','/nstat-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('nstat-w8r4ja-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url); if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone(); caches.open(CACHE).then(x=>x.put('/nstat-w8r4ja.html',c));} return res;}).catch(()=>caches.match('/nstat-w8r4ja.html')));return;}
 if(CORE.includes(u.pathname)) e.respondWith(caches.match(u.pathname).then(h=>h||fetch(r)));});
