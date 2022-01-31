import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('./src-sw.js');

    wb.addEventListener('fetch', (event) => {
      event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches.match(event.request).then((cachedResponse) => {
          // выдаём кэш, если он есть
          if (cachedResponse) {
            return cachedResponse;
          }

          // иначе запрашиваем из сети как обычно
          return fetch(event.request);
        })
      );
    });
    wb.register();
  }
}
