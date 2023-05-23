// import { FirebaseRoutineType } from '@/types/routines/routineType';
import { TextInput } from 'react-native';
import notifee from '@notifee/react-native';

export const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const moveToNext = (nextRef: React.RefObject<TextInput>) => {
  nextRef?.current?.focus();
};

export function delay(t: number, v: Function) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

export async function bootstrap() {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log(
      'Notification caused application to open',
      initialNotification.notification,
    );
    console.log(
      'Press action used to open the app',
      initialNotification.pressAction,
    );
  }
}
