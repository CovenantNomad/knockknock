import { FirebaseDailyRoutineType } from '../routines/routineType';

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
};

export type HomeStackParamList = {
  HomeMain: undefined;
  HomeRoutineAdd: undefined;
  HomeRoutineList: undefined;
  HomeRoutineDetail: {
    screen: string;
    params: { routine: FirebaseDailyRoutineType };
  };
  Setting: undefined;
};

export type RoutineAddStackParamList = {
  RoutineAddMain: undefined;
  RoutineAddColor: undefined;
};

export type RoutineDetailStackParamList = {
  RoutineDetailMain: { routine: FirebaseDailyRoutineType };
  RoutineEditMain: { routine: FirebaseDailyRoutineType };
  RoutineEditColor: undefined;
};
