import { Alert } from 'react-native';
import {
  COLLCTION,
  deleteRoutineProps,
  inActiveRoutineProps,
  updateDailyRoutineByIdProp,
  updateRoutineProps,
} from '@/types/firebase/firebase';
import {
  FirebaseDailyRoutineType,
  FirebaseStaticType,
  RoutineStaticsType,
  SubmitRoutineType,
} from '@/types/routines/routineType';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

export const getRoutines = async (uid: string) => {
  let temp: FirebaseDailyRoutineType[] = [];
  const response = await firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.MYROUTINES)
    .get();

  response.forEach(doc => {
    let routine = {
      routineId: doc.id,
      isCompleted: false,
      ...doc.data(),
    };
    temp.push(routine as FirebaseDailyRoutineType);
  });

  return temp;
};

export const createRoutineFirebase = async (data: SubmitRoutineType) => {
  try {
    const nameTest = await firestore()
      .collection(COLLCTION.USERS)
      .doc(data.userId)
      .collection(COLLCTION.MYROUTINES)
      .where('name', '==', data.name)
      .get();

    const timeTest = await firestore()
      .collection(COLLCTION.USERS)
      .doc(data.userId)
      .collection(COLLCTION.MYROUTINES)
      .where('weekday', 'array-contains-any', data.weekday)
      .where('hour', '==', data.hour)
      .where('minute', '==', data.minute)
      .get();

    if (nameTest.empty && timeTest.empty) {
      const response = await firestore()
        .collection(COLLCTION.USERS)
        .doc(data.userId)
        .collection(COLLCTION.MYROUTINES)
        .add(data);

      if (data.hasNotification && data.notificationIds) {
        const reminder = {
          name: data.name,
          icon: data.icon,
          hour: data.hour,
          minute: data.minute,
          weekday: data.weekday,
          notificationIds: data.notificationIds,
          userId: data.userId,
          routineId: response.id,
          isActive: data.isActive,
        };

        await firestore()
          .collection(COLLCTION.USERS)
          .doc(data.userId)
          .collection(COLLCTION.SETTINGS)
          .doc('reminders')
          .collection(COLLCTION.REMINDERS)
          .doc(response.id)
          .set(reminder);
      }

      return {
        routineId: response.id,
      };
    } else {
      if (!nameTest.empty) {
        throw '같은 이름의 루틴이 있습니다';
      }
      if (!timeTest.empty) {
        throw '같은 시간에 루틴이 있습니다';
      }
    }
  } catch (error: any) {
    Alert.alert(error);
  }
};

export const updateRoutineFirebase = async ({
  data,
  routineId,
}: updateRoutineProps) => {
  try {
    const routineRef = firestore()
      .collection(COLLCTION.USERS)
      .doc(data.userId)
      .collection(COLLCTION.MYROUTINES)
      .doc(routineId);

    if (!(await routineRef.get()).exists) {
      throw '잘못된 접근입니다\n해당 루틴이 존재하지 않습니다';
    } else {
      if (data.isPeriodRoutine) {
        await routineRef.update({
          color: data.color,
          hasNotification: data.hasNotification,
          hour: data.hour,
          minute: data.minute,
          name: data.name,
          icon: data.icon,
          notificationIds: data.notificationIds,
          userId: data.userId,
          weekday: data.weekday,
          isActive: data.isActive,
          isPeriodRoutine: data.isPeriodRoutine,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      } else {
        await routineRef.update({
          color: data.color,
          hasNotification: data.hasNotification,
          hour: data.hour,
          minute: data.minute,
          name: data.name,
          icon: data.icon,
          notificationIds: data.notificationIds,
          userId: data.userId,
          weekday: data.weekday,
          isActive: data.isActive,
          isPeriodRoutine: data.isPeriodRoutine,
        });
      }

      const reminderRef = firestore()
        .collection(COLLCTION.USERS)
        .doc(data.userId)
        .collection(COLLCTION.SETTINGS)
        .doc('reminders')
        .collection(COLLCTION.REMINDERS)
        .doc(routineId);

      if ((await reminderRef.get()).exists) {
        await reminderRef.update({
          name: data.name,
          icon: data.icon,
          hour: data.hour,
          minute: data.minute,
          weekday: data.weekday,
          hasNotification: data.hasNotification,
          notificationIds: data.notificationIds,
          isActive: data.isActive,
          userId: data.userId,
          routineId: routineId,
        });
      } else {
        if (data.hasNotification && data.notificationIds) {
          const reminder = {
            name: data.name,
            icon: data.icon,
            hour: data.hour,
            minute: data.minute,
            weekday: data.weekday,
            hasNotification: data.hasNotification,
            notificationIds: data.notificationIds,
            isActive: data.isActive,
            userId: data.userId,
            routineId: routineId,
          };

          await firestore()
            .collection(COLLCTION.USERS)
            .doc(data.userId)
            .collection(COLLCTION.SETTINGS)
            .doc('reminders')
            .collection(COLLCTION.REMINDERS)
            .doc(routineId)
            .set(reminder);
        }
      }
      Array.from({ length: 14 }).map(async (_, i) => {
        let date = dayjs(dayjs()).subtract(i, 'day');
        let dayRef = firestore()
          .collection(COLLCTION.USERS)
          .doc(data.userId)
          .collection(COLLCTION.DAYS)
          .doc(date.format('YY-MM-DD'))
          .collection(COLLCTION.ROUTINES)
          .doc(routineId);
        if ((await dayRef.get()).exists) {
          if (!data.weekday.includes(date.get('day'))) {
            await dayRef.delete();
          } else {
            if (data.isPeriodRoutine) {
              await dayRef.update({
                color: data.color,
                hasNotification: data.hasNotification,
                hour: data.hour,
                minute: data.minute,
                name: data.name,
                icon: data.icon,
                notificationIds: data.notificationIds,
                userId: data.userId,
                weekday: data.weekday,
                isActive: data.isActive,
                isPeriodRoutine: data.isPeriodRoutine,
                startDate: data.startDate,
                endDate: data.endDate,
              });
            } else {
              await dayRef.update({
                color: data.color,
                hasNotification: data.hasNotification,
                hour: data.hour,
                minute: data.minute,
                name: data.name,
                icon: data.icon,
                notificationIds: data.notificationIds,
                userId: data.userId,
                weekday: data.weekday,
                isActive: data.isActive,
                isPeriodRoutine: data.isPeriodRoutine,
              });
            }
          }
        }
      });

      return true;
    }
  } catch (error: any) {
    console.error(error);
    Alert.alert(error);
  }
};

export const deleteRoutineFirebase = async ({
  userId,
  routineId,
}: deleteRoutineProps) => {
  try {
    if (userId) {
      const routineRef = firestore()
        .collection(COLLCTION.USERS)
        .doc(userId)
        .collection(COLLCTION.MYROUTINES)
        .doc(routineId);

      const checkExisted = await routineRef.get();

      if (checkExisted.exists) {
        await routineRef.delete();

        Array.from({ length: 14 }).map(async (_, i) => {
          let date = dayjs(dayjs()).subtract(i, 'day');
          let dayRef = firestore()
            .collection(COLLCTION.USERS)
            .doc(userId)
            .collection(COLLCTION.DAYS)
            .doc(date.format('YY-MM-DD'))
            .collection(COLLCTION.ROUTINES)
            .doc(routineId);
          await dayRef.delete();
        });

        return true;
      } else {
        Alert.alert('영적루틴이 존재하지 않습니다');
      }
    } else {
      Alert.alert('로그인 후 이용해주세요');
    }
  } catch (error) {
    console.error('@deleteRoutineFirebase: ', error);
    Alert.alert('삭제 중 에러가 발생했습니다. 개발자에게 알려주세요');
  }
};

export const inActiveRoutineFirebase = async ({
  userId,
  routineId,
}: inActiveRoutineProps) => {
  try {
    const routineRef = firestore()
      .collection(COLLCTION.USERS)
      .doc(userId)
      .collection(COLLCTION.MYROUTINES)
      .doc(routineId);

    if (!(await routineRef.get()).exists) {
      throw '잘못된 접근입니다\n해당 루틴이 존재하지 않습니다';
    } else {
      await routineRef.update({
        hasNotification: false,
        notificationIds: [],
        isActive: false,
      });

      Array.from({ length: 14 }).map(async (_, i) => {
        let date = dayjs(dayjs()).subtract(i, 'day');
        let dayRef = firestore()
          .collection(COLLCTION.USERS)
          .doc(userId)
          .collection(COLLCTION.DAYS)
          .doc(date.format('YY-MM-DD'))
          .collection(COLLCTION.ROUTINES)
          .doc(routineId);
        if ((await dayRef.get()).exists) {
          await dayRef.update({
            hasNotification: false,
            notificationIds: [],
            isActive: false,
          });
        }
      });
    }
  } catch (error: any) {
    console.error(error);
    Alert.alert(error);
  }
};

export const getRoutinesByDay = async (
  date: string,
  day: number,
  uid: string,
) => {
  const routineRef = firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.MYROUTINES)
    .where('isActive', '==', true)
    .where('weekday', 'array-contains', day);
  const routineResponse = await routineRef.get();
  let routineResult: FirebaseFirestoreTypes.DocumentData[] = [];
  routineResponse.forEach(doc => {
    routineResult.push({
      routineId: doc.id,
      isCompleted: false,
      ...doc.data(),
    });
  });

  const dayRef = firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.DAYS)
    .doc(date)
    .collection(COLLCTION.ROUTINES);
  let dayResponse = await dayRef.get();

  if (dayResponse.empty) {
    routineResult.map(
      async data =>
        await firestore()
          .collection(COLLCTION.USERS)
          .doc(uid)
          .collection(COLLCTION.DAYS)
          .doc(date)
          .collection(COLLCTION.ROUTINES)
          .doc(data.routineId)
          .set(data),
    );
    dayResponse = await dayRef.get();
  } else if (
    !dayResponse.empty &&
    dayResponse.isEqual(routineResponse) === false
  ) {
    const dayRoutineId = dayResponse.docs.map(doc => doc.id);
    const newRoutine = routineResponse.docs.filter(
      doc => !dayRoutineId.includes(doc.id),
    );
    newRoutine.map(
      async data =>
        await firestore()
          .collection(COLLCTION.USERS)
          .doc(uid)
          .collection(COLLCTION.DAYS)
          .doc(date)
          .collection(COLLCTION.ROUTINES)
          .doc(data.id)
          .set({
            routineId: data.id,
            isCompleted: false,
            ...data.data(),
          }),
    );
  }

  let dayResult: FirebaseDailyRoutineType[] = [];
  dayResponse.forEach(doc => {
    dayResult.push(doc.data() as FirebaseDailyRoutineType);
  });

  return dayResult;
};

export const checkDailyRoutineById = async ({
  uid,
  date,
  routineId,
  completed,
}: updateDailyRoutineByIdProp) => {
  const routineRef = firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.DAYS)
    .doc(date.format('YY-MM-DD'))
    .collection(COLLCTION.ROUTINES)
    .doc(routineId);
  const staticRef = firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.MYROUTINES)
    .doc(routineId)
    .collection(COLLCTION.STATICS)
    .doc(date.format('YYYY-MM-DD'));

  return firestore().runTransaction(async transaction => {
    transaction.update(routineRef, {
      isCompleted: !completed,
    });

    if (!completed) {
      const staticData = {
        year: date.get('year'),
        month: date.get('month'),
        date: date.get('date'),
        day: date.get('day'),
        dayOfYear: date.dayOfYear(),
        weekOfYear: date.week(),
      };
      transaction.set(staticRef, staticData);
    } else {
      transaction.delete(staticRef);
    }
  });
};

export const getRoutineStaticById = async (
  year: number,
  month: number,
  week: number,
  uid: string,
  routineId: string,
) => {
  const staticRef = firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.MYROUTINES)
    .doc(routineId)
    .collection(COLLCTION.STATICS);

  const staticResponse = await staticRef.get();
  if (staticResponse.empty) {
    return null;
  }

  const totalStatic = staticResponse.size;

  const yearlyResponse = await staticRef.where('year', '==', year).get();
  const yearlyStatic = yearlyResponse.size;

  const monthlyResponse = await staticRef
    .where('year', '==', year)
    .where('month', '==', month)
    .get();
  const monthlyStatic = monthlyResponse.size;

  const weeklyResponse = await staticRef
    .where('year', '==', year)
    .where('weekOfYear', '==', week)
    .get();
  const weeklyStatic = weeklyResponse.size;

  let weeklyResult: FirebaseStaticType[] = [];
  weeklyResponse.forEach(doc => {
    weeklyResult.push(doc.data() as FirebaseStaticType);
  });

  const resultData: RoutineStaticsType = {
    totalStatic,
    yearlyStatic,
    monthlyStatic,
    weeklyStatic,
    weeklyResult,
  };

  return resultData;
};

export const getMonthlyTrends = async (
  today: string,
  uid: string,
  routineId: string,
) => {
  const staticRef = firestore()
    .collection(COLLCTION.USERS)
    .doc(uid)
    .collection(COLLCTION.MYROUTINES)
    .doc(routineId)
    .collection(COLLCTION.STATICS);

  const lastFiveMonths: { year: number; month: number }[] = [];
  Array.from({ length: 5 }).map((_, i) => {
    const monthly = dayjs(today).subtract(i, 'month');
    lastFiveMonths.push({
      year: monthly.get('year'),
      month: monthly.get('month'),
    });
  });

  const lastFiveMonthResponse = lastFiveMonths.map(async lastMonth => {
    const response = await staticRef
      .where('year', '==', lastMonth.year)
      .where('month', '==', lastMonth.month)
      .get();
    const result = response.size;
    return { year: lastMonth.year, month: lastMonth.month, stats: result };
  });

  const lastFiveMonthResults = await Promise.all(lastFiveMonthResponse).then(
    result => {
      return result;
    },
  );

  const thisYearMonths: { year: number; month: number }[] = [];
  Array.from({ length: 12 }).map((_, i) => {
    thisYearMonths.push({
      year: Number(today.substring(0, 4)),
      month: i,
    });
  });

  const thisYearMonthResponse = thisYearMonths.map(async month => {
    const result = (
      await staticRef
        .where('year', '==', month.year)
        .where('month', '==', month.month)
        .get()
    ).size;

    return { ...month, stats: result };
  });

  const thisYearMonthResults = await Promise.all(thisYearMonthResponse).then(
    result => {
      return result;
    },
  );

  return {
    lastFiveMonthResults,
    thisYearMonthResults,
  };
};
