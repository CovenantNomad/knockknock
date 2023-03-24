import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
import RoutineAddScreen from './RoutineAddScreen';
import RoutineAddColorScreen from './RoutineAddColorScreen';

const Stack = createNativeStackNavigator<RoutineAddStackParamList>();

const RoutineAddNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen name="RoutineAddMain" component={RoutineAddScreen} />
      <Stack.Screen name="RoutineAddColor" component={RoutineAddColorScreen} />
    </Stack.Navigator>
  );
};

export default RoutineAddNavigation;
