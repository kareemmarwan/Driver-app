import { messaging, getToken, onMessage } from './config';

export async function requestNotificationPermission(): Promise<string | null> {
  if (!messaging || !('Notification' in window)) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('FCM error:', error);
    return null;
  }
}

export function onMessageListener(): Promise<any> {
  return new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => resolve(payload));
  });
}
