import dayjs from 'dayjs';
import { SubmitRoutineType } from '../routines/routineType';

export enum COLLCTION {
  USERS = 'Users',
  BIBLECALENDAR = 'BibleCalendar',
  MYROUTINES = 'MyRoutines',
  ROUTINES = 'Routines',
  DAYS = 'Days',
  STATICS = 'Statics',
  SETTINGS = 'Settings',
  REMINDERS = 'Reminders',
}

export interface updateDailyRoutineByIdProp {
  uid: string;
  date: dayjs.Dayjs;
  routineId: string;
  completed: boolean;
}

export interface BibleType {
  content: string;
}

export interface updateRoutineProps {
  data: SubmitRoutineType;
  routineId: string;
}

export interface deleteRoutineProps {
  userId: string;
  routineId: string;
}

export interface inActiveRoutineProps {
  userId: string;
  routineId: string;
}
