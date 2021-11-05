const CACHE_NAME = "v1_cache_contador_app_vue"
const urlsToCache = [
    "./",
    "./img/favicon.ico",
    "./img/icon48.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon256.png",
    "./img/icon512.png",
    "./img/icon1024.png",
    "./img/icon2048.png",
    "./js/main.js",
    "./js/mount.js",
    "./css/normalize.css",
    "./css/styles.css",
    "https://unpkg.com/vue@next"
];

//chrome://serviceworker-internals

//agregamos las url a la cache
self.addEventListener("install", e => { 
    e.waitUntil( 
        caches.open(CACHE_NAME).then( 
            cache => cache.addAll(urlsToCache).then( 
                () => self.skipWaiting() 
            ).catch(
                error => console.log(error) 
            )
        )
    )
})

//actualiza la cache de manera automatica
self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

//maneja las peticiones del navegador
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){
                    return res
                }
                return fetch(e.request)   
            }

        )
    )
})