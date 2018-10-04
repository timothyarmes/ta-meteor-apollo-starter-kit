/* eslint-disable */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

const APP_SHELL = '/app-shell';
const HASHED_CACHE = 'hashedCache';

// Precache all the files needed by the App Shell, as defined in workbox-config.js
// If any of these files are updated, run `npm run update-sw` to update this file automatically.
workbox.precaching.precacheAndRoute([]);

// Cache the App Shell route. We try to get latest from the network, fall back to cache for offline.
workbox.precaching.precache([APP_SHELL]);
workbox.routing.registerRoute(APP_SHELL, new workbox.strategies.StaleWhileRevalidate());

// Our App Shell, used by all navigation routes.
workbox.routing.registerNavigationRoute(APP_SHELL);

workbox.clientsClaim();

// Use our own cache for all hashed assets (Meteor generates the hashes for us)
workbox.routing.registerRoute(/\?hash=.*/, ({url, event, params}) => {
  caches.open(HASHED_CACHE).then((cache) => {
    const req = event.request.clone();

    return cache.match(req).then((cached) => {

      // Return the cached version if the hash is the same
      if (cached && hasSameHash(url.toString(), cached.url.toString())) {
        return cached;
      }

      // Try to fetch it....
      return fetch(req).then((response) => {
        const clonedResponse = response.clone();
        const contentType = clonedResponse.headers.get('content-type');
  
        if (!clonedResponse || clonedResponse.status !== 200 || clonedResponse.type !== 'basic') {
          return response;
        }
  
        // Remove all other versions of this file frome the cache
        const re = new RegExp(removeHash(url.toString()));
        caches.open(HASHED_CACHE).then(cache => cache.keys().then(keys => keys.forEach((asset) => {
          if (re.test(removeHash(asset.url.toString()))) {
            cache.delete(asset);
          }
        })));
  
        // Cache this version
        caches.open(HASHED_CACHE).then(cache => cache.put(event.request, clonedResponse));
        
        // Return it
        return response;
      }).catch(() => {
        return null;
      });
    });
  });
});

function removeHash(element) {
  if (typeof element === 'string') return element.split('?hash=')[0];
}

function hasHash(element) {
  if (typeof element === 'string') return /\?hash=.*/.test(element);
}

function hasSameHash(firstUrl, secondUrl) {
  if (typeof firstUrl === 'string' && typeof secondUrl === 'string') {
    return /\?hash=(.*)/.exec(firstUrl)[1] === /\?hash=(.*)/.exec(secondUrl)[1];
  }
}

// Push event listener aux function:
const showNotification = (evt) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const title = 'Push notification demo';
  const options = {
    body: evt.data && evt.data.text() ? evt.data.text() : 'Push message no payload',
    tag: 'demo',
    icon: '/images/apple-touch-icon.png',
    badge: '/images/apple-touch-icon.png',
    // Custom actions buttons
    actions: [
      { action: 'yes', title: 'I ♥ this app!' },
      { action: 'no', title: 'I don\'t like this app' },
    ],
  };

  evt.waitUntil(
    self.registration.showNotification(title, options),
  );
};

// When to Show Notifications:
// If the user is already using your application there is no need to display a
// notification. You can manage this logic on the server, but it is easier to
// do it in the push handler inside your service worker:
// the 'clients' global in the service worker lists all of the active push
// clients on this machine. If there are no clients active, the user must be
// in another app. We should show a notification in this case. If there are
// active clients it means that the user has your site open in one or more
// windows. The best practice is to relay the message to each of those windows.
// Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
// Source: https://developers.google.com/web/fundamentals/codelabs/push-notifications/

self.addEventListener('push', (evt) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${evt && evt.data}"`);

  // Comment out the following line in case you only want to display
  // notifications when the app isn't open
  showNotification(evt);

  clients.matchAll()
    .then((client) => {
      if (client.length === 0) {
        // Un-comment the following line in case you only want to display
        // notifications when the app isn't open
        // showNotification(evt);
      } else {
        // Send a message to the page to update the UI
        console.log('Application is already open!');
      }
    });
});

// The code below looks for the first window with 'visibilityState' set to
// 'visible'. If one is found it navigates that client to the correct URL and
// focuses the window. If a window that suits our needs is not found, it
// opens a new window.
// Source: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
// Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

self.addEventListener('notificationclick', (evt) => {
  console.log('[Service Worker] Notification click Received.');

  const appUrl = new URL('/', location).href;

  // Listen to custom action buttons in push notification
  if (evt.action === 'yes') {
    console.log('I ♥ this app!');
  } else if (evt.action === 'no') {
    console.log('I don\'t like this app');
  }

  evt.waitUntil(
    clients.matchAll()
      .then((clientsList) => {
        const client = clientsList.find(c => (
          c.visibilityState === 'visible'
        ));

        if (client !== undefined) {
          client.navigate(appUrl);
          client.focus();
        } else {
          // There are no visible windows. Open one.
          clients.openWindow(appUrl);
        }
      })
    ,
  );

  // Close all notifications (thisincludes any other notifications from the
  // same origin)
  // Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
  self.registration.getNotifications()
    .then((notifications) => {
      notifications.forEach((notification) => { notification.close(); });
    });
});
