import dayjs from 'dayjs';

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
