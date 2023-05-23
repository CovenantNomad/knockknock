import { useCallback, useContext } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
import { editRoutineState } from '@/stores/EditRoutineState';
import AuthContext from '@/stores/AuthContext';
//hooks
import useReminer from './useReminder';
//types
import {
  FirebaseRoutineType,
  SubmitRoutineType,
} from './../types/routines/routineType';
import { getDayText } from '@/utils/dateUtils';

const useRoutines = () => {
  const { userInfo } = useContext(AuthContext);
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const { createReminders, removeReminders } = useReminer();

  const onCreateRoutine = async () => {
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
        try {
          const reminders = await createReminders(
            createRoutine.hour,
            createRoutine.minute,
            createRoutine.name,
            createWeekday,
          );
          saveData = {
            ...saveData,
            notificationIds: reminders,
          };
        } catch {
          Toast.show({
            type: 'error',
            text1: '알람설정 중 오류가 발생하였습니다.',
          });
        }
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
      } else {
        return null;
      }
    } else {
      Toast.show({
        type: 'error',
        text1: '로그인 후 이용해주세요',
      });
      return;
    }
  };

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
        try {
          await removeReminders(routine.notificationIds);
          saveData = {
            ...saveData,
            notificationIds: [],
          };
        } catch {
          Toast.show({
            type: 'error',
            text1: '알람설정 중 오류가 발생하였습니다.',
          });
        }
      }
      //typeTwo (알람을 새롭게 설정하는 경우)
      if (!routine.hasNotification && editRoutine.hasNotification) {
        try {
          const updateReminders = await createReminders(
            editRoutine.hour,
            editRoutine.minute,
            editRoutine.name,
            editWeekday,
          );

          saveData = {
            ...saveData,
            notificationIds: updateReminders,
          };
        } catch {
          Toast.show({
            type: 'error',
            text1: '알람설정 중 오류가 발생하였습니다.',
          });
        }
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
          try {
            if (routine.notificationIds !== undefined) {
              await removeReminders(routine.notificationIds);
            }

            const updateReminders = await createReminders(
              editRoutine.hour,
              editRoutine.minute,
              editRoutine.name,
              editWeekday,
            );

            saveData = {
              ...saveData,
              notificationIds: updateReminders,
            };
          } catch {
            Toast.show({
              type: 'error',
              text1: '알람설정 중 오류가 발생하였습니다.',
            });
          }
        }
      }

      if (saveData !== null) {
        return saveData;
      } else {
        Toast.show({
          type: 'error',
          text1: '영적루틴을 업데이트 하지 못했습니다',
        });

        return null;
      }
    },
    [editRoutine],
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
          if (routine.notificationIds !== undefined) {
            await removeReminders(routine.notificationIds);
          }
          // await Promise.all(
          //   editRoutine.weekday
          //     .filter(day => day.selected === true)
          //     .map(async day => {
          //       await addReminder(
          //         createRoutine.hour,
          //         createRoutine.minute,
          //         createRoutine.name,
          //         day.id,
          //       );
          //     }),
          // );
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
    [editRoutine],
  );

  const onInactiveRoutine = async (routine: FirebaseRoutineType) => {
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
  };

  return {
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
