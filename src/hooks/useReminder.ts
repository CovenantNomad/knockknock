import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useRecoilState } from 'recoil';
import { notificationsState } from '@/stores/NotificationState';
import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import dayjs from 'dayjs';
import { getDayText } from '@/utils/dateUtils';

const useReminer = () => {
  const [channelId, setChannelId] = useState<string | null>(null);
  const [reminders, setReminders] = useRecoilState(notificationsState);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const id = await notifee.createChannel({
          id: 'KNOCK_KNOCK',
          name: 'KnockKnock Android Channel',
          importance: AndroidImportance.HIGH,
        });
        setChannelId(id);
      } else {
        setChannelId('ios-channel-id');
      }
    })();
  }, []);

  const addReminder = async (
    hour: string,
    minute: string,
    routinTitle: string,
    weekday: number,
  ) => {
    const date = dayjs().hour(Number(hour)).minute(Number(minute)).day(weekday);
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      throw new Error('Permission is denied');
    }

    if (Platform.OS === 'android') {
      if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
        throw new Error('Please allow setting alarms and reminder on settings');
      }
    }

    if (channelId === null) {
      throw new Error('Channel is not created');
    }

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.isBefore(dayjs())
        ? date.add(1, 'week').valueOf()
        : date.valueOf(),
      repeatFrequency: RepeatFrequency.WEEKLY,
    };

    // Create a trigger notification
    return await notifee.createTriggerNotification(
      {
        id: `${routinTitle}-${getDayText(weekday)}요일-알림`,
        title: `똑똑! ${routinTitle} 시간이예요`,
        body: '이 시간을 통해 주님과 좋은 교제 나누세요.\n 규칙적인 영적루틴이 영적생활을 더욱 견고하게 합니다.',
        android: {
          channelId: channelId,
        },
        data: {
          title: routinTitle,
          hour: hour,
          minute: minute,
          weekday: weekday,
        },
      },
      trigger,
    );
  };

  const loadReminders = useCallback(async () => {
    return await notifee.getTriggerNotifications();
  }, []);

  useEffect(() => {
    (async () => {
      const notifications = await loadReminders();
      setReminders(notifications);
    })();
  }, [loadReminders, setReminders]);

  const removeReminder = useCallback(async (id: string) => {
    await notifee.cancelTriggerNotification(id);
  }, []);

  const removeReminders = useCallback(async (notificationIds: string[]) => {
    await notifee.cancelTriggerNotifications(notificationIds);
  }, []);

  const removeAllReminder = useCallback(async () => {
    await notifee.cancelAllNotifications();
  }, []);

  return {
    channelId,
    reminders,
    addReminder,
    removeReminder,
    removeReminders,
    removeAllReminder,
  };
};

export default useReminer;
