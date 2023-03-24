import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
import HomeScreen from './HomeScreen';
import RoutineAddNavigation from './RoutineAddNavigation';
// import RoutineDetailNavigation from './RoutineDetailNavigation';
// import RoutineListScreen from './RoutineListScreen';
import SettingScreen from './Setting';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HomeRoutineAdd" component={RoutineAddNavigation} />
      {/* <Stack.Screen
        name="HomeRoutineDetail"
        component={RoutineDetailNavigation}
      /> */}
      {/* <Stack.Screen name="HomeRoutineList" component={RoutineListScreen} /> */}
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
