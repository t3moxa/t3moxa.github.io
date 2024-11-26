self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html' ,
                '/app.js' ,
                '/manifest.json' ,
                '/icons/icon96.png'
				'/icons/icon192.png'
				'/icons/icon512.png'
				'/icons/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});