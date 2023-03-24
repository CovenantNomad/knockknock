import { atom } from 'recoil';
import { TriggerNotification } from '@notifee/react-native';

export const notificationsState = atom<TriggerNotification[]>({
  key: 'HOME/NOTIFICATIONS',
  default: [],
});
