importScripts('https://www.gstatic.com/firebasejs/9.x/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.x/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'إشعار جديد';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icons/icon-192x192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
