import dayjs from 'dayjs';

export interface WeekdayType {
  id: number;
  title: string;
  selected: boolean;
}

export interface RoutineType {
  userId: string;
  name: string;
  icon: string;
  color: string;
  weekday: WeekdayType[];
  hour: string;
  minute: string;
  hasNotification: boolean;
  notificationIds?: string[];
  isActive: boolean;
  isPeriodRoutine: boolean;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
}

export interface SubmitRoutineType {
  userId: string;
  name: string;
  icon: string;
  color: string;
  weekday: number[];
  hour: string;
  minute: string;
  hasNotification: boolean;
  notificationIds?: string[];
  isActive: boolean;
  isPeriodRoutine: boolean;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
}

export interface FirebaseRoutineType extends SubmitRoutineType {
  routineId: string;
}

export interface FirebaseDailyRoutineType extends FirebaseRoutineType {
  isCompleted: boolean;
}

export interface FirebaseStaticType {
  year: number;
  month: number;
  date: number;
  day: number;
  dayOfYear: number;
  weekOfYear: number;
}

export interface RoutineStaticsType {
  totalStatic: number;
  yearlyStatic: number;
  monthlyStatic: number;
  weeklyStatic: number;
  weeklyResult: FirebaseStaticType[];
}

export interface monthlyTrendsType {
  year: number;
  month: number;
  stats: number;
}
