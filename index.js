/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS) {
    console.log('알람 클릭');
    // await notifee.getInitialNotification();

    // if (initialNotification) {
    //   console.log(
    //     'Notification caused application to open',
    //     initialNotification.notification,
    //   );
    //   console.log(
    //     'Press action used to open the app',
    //     initialNotification.pressAction,
    //   );
    // }
  }
});

AppRegistry.registerComponent(appName, () => App);
