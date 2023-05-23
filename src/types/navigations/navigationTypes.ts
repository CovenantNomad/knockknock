import dayjs from 'dayjs';
import {
  FirebaseDailyRoutineType,
  FirebaseRoutineType,
} from '../routines/routineType';

export type RootStackParamList = {
  App: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Loading: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Worship: undefined;
  Bible: undefined;
  Prayer: undefined;
  Setting: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  HomeRoutineAdd: undefined;
  HomeRoutineList: undefined;
  HomeRoutineDetail: {
    screen: string;
    params: {
      routine: FirebaseDailyRoutineType;
      previousRoute: string;
    };
  };
};

export type SettingStackParamList = {
  SettingMain: undefined;
  ChangePassword: undefined;
  Withdraw: undefined;
  ReminderList: undefined;
  Update: undefined;
};

export type RoutineAddStackParamList = {
  RoutineAddMain: undefined;
  RoutineAddName: undefined;
  RoutineAddIcon: undefined;
  RoutineAddColor: undefined;
};

export type RoutineDetailStackParamList = {
  RoutineDetailMain: {
    routine: FirebaseDailyRoutineType;
    previousRoute: string;
  };
  RoutineEditMain: {
    routine: FirebaseDailyRoutineType;
    previousRoute: string;
  };
  RoutineEditName: undefined;
  RoutineEditIcon: undefined;
  RoutineEditColor: undefined;
};
