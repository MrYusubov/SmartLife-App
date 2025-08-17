import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';

export async function ensureNotificationPermission() {
  if (!Device.isDevice) return false;
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    return req.status === 'granted';
  }
  return true;
}

export async function scheduleNoteReminder(title: string, body: string, date: Date) {
  const now = Date.now();
  const delay = date.getTime() - now;

  if (delay <= 0) {
    console.warn("Xatırlatma vaxtı keçib!");
    return;
  }

  console.log(`Bildiriş ${delay/1000} saniyə sonra göndəriləcək`);

  setTimeout(async () => {
    try {
      await axios.post('https://app.nativenotify.com/api/notification', {
        appId: 31761,
        appToken: "2yO6i7DdOlyvYJOmLgPFOl",
        title,
        body,
        dateSent: new Date().toISOString()
      });
      console.log("NativeNotify sorğusu göndərildi");
    } catch (err) {
      console.error(err);
    }
  }, delay);
}

