// Blisko PWA v4.0.2: network-first for the app (always fresh index.html), cache only as offline fallback.
// API calls (Nominatim, Photon, OSRM, Overpass, GitHub raw) are never intercepted.
const C='blisko-v4.0.2',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})))).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C&&x!=C+'-ext').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET')return;
 if(u.origin==location.origin){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
 if(/unpkg\.com|tile\.openstreetmap\.org/.test(u.host)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(C+'-ext').then(c=>c.put(e.request,cp));return n})))}});
