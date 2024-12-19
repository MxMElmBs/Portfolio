self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll([
        "./", 
        "./css/style.css", 
        "./images/OIG12.jpg", 
        "./images/OIG11.jpg", 
        "./images/OIG1.jpg"
      ]); 
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
  