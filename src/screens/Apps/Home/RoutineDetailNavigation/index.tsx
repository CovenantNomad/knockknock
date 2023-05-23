import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutineDetailStackParamList } from '@/types/navigations/navigationTypes';
import RoutineDetailScreen from './RoutineDetailScreen';
import RoutineEditScreen from './RoutineEditScreen';
import RoutineEditNameScreen from './RoutineEditNameScreen';
import RoutineEditIconScreen from './RoutineEditIconScreen';
import RoutineEditColorScreen from './RoutineEditColorScreen';

const Stack = createNativeStackNavigator<RoutineDetailStackParamList>();

const RoutineDetailNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen name="RoutineDetailMain" component={RoutineDetailScreen} />
      <Stack.Screen name="RoutineEditMain" component={RoutineEditScreen} />
      <Stack.Screen
        name="RoutineEditName"
        component={RoutineEditNameScreen}
      />
      <Stack.Screen
        name="RoutineEditIcon"
        component={RoutineEditIconScreen}
      />
      <Stack.Screen
        name="RoutineEditColor"
        component={RoutineEditColorScreen}
      />
    </Stack.Navigator>
  );
};

export default RoutineDetailNavigation;
