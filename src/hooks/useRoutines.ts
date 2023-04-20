import { Alert } from 'react-native';
import {
  FirebaseRoutineType,
  SubmitRoutineType,
} from './../types/routines/routineType';
import { useRecoilState } from 'recoil';
import useReminer from './useReminder';
import { getDayText } from '@/utils/dateUtils';
import { useCallback, useContext } from 'react';
import AuthContext from '@/stores/AuthContext';
import { createRoutineState } from '@/stores/CreateRoutineState';
import { editRoutineState } from '@/stores/EditRoutineState';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const useRoutines = () => {
  const { userInfo } = useContext(AuthContext);
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const { channelId, addReminder, removeReminders } = useReminer();

  const createReminder = useCallback(() => {
    createRoutine.weekday
      .filter(day => day.selected === true)
      .map(async day => {
        await addReminder(
          createRoutine.hour,
          createRoutine.minute,
          createRoutine.name,
          day.id,
        );
      });
  }, [addReminder, createRoutine]);

  const updateReminder = useCallback(
    async (routine: FirebaseRoutineType) => {
      if (routine.notificationIds !== undefined) {
        await removeReminders(routine.notificationIds);
      }
      editRoutine.weekday
        .filter(day => day.selected === true)
        .map(async day => {
          await addReminder(
            editRoutine.hour,
            editRoutine.minute,
            editRoutine.name,
            day.id,
          );
        });
    },
    [addReminder, removeReminders, editRoutine],
  );

  const onCreateRoutine = useCallback(() => {
    if (userInfo) {
      const createWeekday = createRoutine.weekday
        .filter(item => item.selected === true)
        .map(item => item.id);
      let saveData: SubmitRoutineType = {
        userId: userInfo.uid,
        name: createRoutine.name,
        icon: createRoutine.icon,
        weekday: createWeekday,
        hour: createRoutine.hour,
        minute: createRoutine.minute,
        color: createRoutine.color || '#B0D2D4',
        hasNotification: createRoutine.hasNotification,
        notificationIds: [],
        isActive: createRoutine.isActive,
        isPeriodRoutine: createRoutine.isPeriodRoutine,
      };

      if (createRoutine.hasNotification) {
        createReminder();
        const notificationIds = createRoutine.weekday
          .filter(item => item.selected === true)
          .map(item => `${createRoutine.name}-${getDayText(item.id)}요일-알림`);
        saveData = {
          ...saveData,
          notificationIds: notificationIds,
        };
      }

      if (createRoutine.isPeriodRoutine) {
        saveData = {
          ...saveData,
          startDate: createRoutine.startDate,
          endDate: createRoutine.endDate,
        };
      }

      if (saveData !== null) {
        return saveData;
      }
    } else {
      Toast.show({
        type: 'error',
        text1: '로그인 후 이용해주세요',
      });
      return;
    }
  }, [userInfo, createRoutine, createReminder]);

  const onUpdateRoutine = useCallback(
    async (routine: FirebaseRoutineType) => {
      const editWeekday = editRoutine.weekday
        .filter(item => item.selected === true)
        .map(item => item.id);
      let saveData: SubmitRoutineType = {
        userId: routine.userId,
        name: editRoutine.name,
        icon: editRoutine.icon,
        weekday: editWeekday,
        hour: editRoutine.hour,
        minute: editRoutine.minute,
        color: editRoutine.color || '#B0D2D4',
        hasNotification: editRoutine.hasNotification,
        notificationIds: editRoutine.notificationIds,
        isActive: editRoutine.isActive,
        isPeriodRoutine: editRoutine.isPeriodRoutine,
      };

      if (editRoutine.isPeriodRoutine) {
        saveData = {
          ...saveData,
          startDate: editRoutine.startDate,
          endDate: editRoutine.endDate,
        };
      }

      //typeOne (알람을 설정했다가 해제하는 경우)
      if (
        routine.hasNotification &&
        routine.notificationIds !== undefined &&
        !editRoutine.hasNotification
      ) {
        await removeReminders(routine.notificationIds);
        saveData = {
          ...saveData,
          notificationIds: [],
        };
      }
      //typeTwo (알람을 새롭게 설정하는 경우)
      if (!routine.hasNotification && editRoutine.hasNotification) {
        await updateReminder(routine);
        const notificationIds = editRoutine.weekday
          .filter(item => item.selected === true)
          .map(item => `${editRoutine.name}-${getDayText(item.id)}요일-알림`);
        saveData = {
          ...saveData,
          notificationIds: notificationIds,
        };
      }

      //(알람 유지)
      if (routine.hasNotification && editRoutine.hasNotification) {
        // typeThree (루틴이름이나 요일이 변경된 경우)
        if (
          routine.name !== editRoutine.name ||
          routine.weekday !== editWeekday ||
          routine.hour !== editRoutine.hour ||
          routine.minute !== editRoutine.minute
        ) {
          await updateReminder(routine);
          const notificationIds = editRoutine.weekday
            .filter(item => item.selected === true)
            .map(item => `${editRoutine.name}-${getDayText(item.id)}요일-알림`);
          saveData = {
            ...saveData,
            notificationIds: notificationIds,
          };
        }
      }

      if (saveData !== null) {
        return saveData;
      } else {
        return;
      }
    },
    [editRoutine, createReminder, updateReminder, removeReminders],
  );

  const onActiveRoutine = useCallback(
    async (routine: FirebaseRoutineType) => {
      const editWeekday = editRoutine.weekday
        .filter(item => item.selected === true)
        .map(item => item.id);
      let saveData: SubmitRoutineType = {
        userId: routine.userId,
        name: editRoutine.name,
        icon: editRoutine.icon,
        weekday: editWeekday,
        hour: editRoutine.hour,
        minute: editRoutine.minute,
        color: editRoutine.color || '#B0D2D4',
        hasNotification: editRoutine.hasNotification,
        notificationIds: editRoutine.notificationIds,
        isActive: true,
        isPeriodRoutine: editRoutine.isPeriodRoutine,
      };
      if (!routine.isActive) {
        if (editRoutine.hasNotification) {
          await updateReminder(routine);
          const notificationIds = editRoutine.weekday
            .filter(item => item.selected === true)
            .map(item => `${editRoutine.name}-${getDayText(item.id)}요일-알림`);
          saveData = {
            ...saveData,
            notificationIds: notificationIds,
          };
          setEditRoutine({
            ...editRoutine,
            notificationIds: notificationIds,
            isActive: true,
          });
        }
        return saveData;
      } else {
        return;
      }
    },
    [editRoutine, createReminder],
  );

  const onInactiveRoutine = useCallback(
    async (routine: FirebaseRoutineType) => {
      if (routine.isActive) {
        if (routine.hasNotification && routine.notificationIds) {
          await removeReminders(routine.notificationIds);
        }
        setEditRoutine({
          ...editRoutine,
          hasNotification: false,
          notificationIds: [],
          isActive: false,
        });
      }
    },
    [removeReminders],
  );

  return {
    channelId,
    createRoutine,
    setCreateRoutine,
    editRoutine,
    setEditRoutine,
    onCreateRoutine,
    onUpdateRoutine,
    onActiveRoutine,
    onInactiveRoutine,
  };
};

export default useRoutines;
