// Workbox Service
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// Register Assets for Cache [Workbox]
if (workbox){
workbox.precaching.precacheAndRoute([
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: 'sites/home.html', revision: '1' },
  { url: 'sites/division.html', revision: '1' },
  { url: 'sites/favorite.html', revision: '1' },
  { url: 'assets/images/wallpaper.jpg', revision: '1' },
  { url: 'assets/images/favicon-192x192.png', revision: '1' },
  { url: 'assets/images/favicon-512x512.png', revision: '1' },
  { url: 'assets/css/icon.css', revision: '1' },
  { url: 'assets/css/materialize.min.css', revision: '1' },
  { url: 'assets/js/api.js', revision: '1' },
  { url: 'assets/js/idb.js', revision: '1' },
  { url: 'assets/js/nav.js', revision: '1' },
  { url: 'assets/js/sw-reg.js', revision: '1' },
  { url: 'assets/js/notif-api.js', revision: '1' },
  { url: 'assets/js/uint8array.js', revision: '1' },
  { url: 'assets/js/materialize.min.js', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
  { url: 'manifest.json', revision: '1' },
]);

// Cache Image with Selected Extension [Workbox]
workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ]
  })
);

// Cache Main Endpoint from Football API [Workbox]
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'Football Endpoint',
  })
)

// Cache CSS from Google Font [Workbox]
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Cache Static Font from Google CDN During the Allotted Time 
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

  // Outpout when Workbox Successfully
console.log(`Workbox Loaded Successfully`);
} else {

  // Outpout when Workbox Failed
  console.log(`Workbox Failed to Load`);
}

  // Push Notification
  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'assets/images/faqs.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });