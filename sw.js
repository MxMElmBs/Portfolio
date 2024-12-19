self.addEventListener("install", e => {
    e.waitUntil(
      caches.open("static").then(cache => {
        return cache.addAll(["./", "./css/style.css", "./images/images/OIG (1) (2).jpg",
            "./images/images/OIG (1) (1).jpg", "./images/images/OIG (1).jpg"
        ]); // Mettre à jour les chemins des fichiers
      })
    );
  });
  
  self.addEventListener("fetch", e => {
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request);
      })
    );
  });
  