import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@/types/navigations/navigationTypes';
import SettingScreen from './SettingScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import WithdrawScreen from './WithdrawScreen';
import UpdateScreen from './UpdateScreen';
import ReminderScreen from './ReminderScreen';

const Stack = createNativeStackNavigator<SettingStackParamList>();

const SettingNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingMain" component={SettingScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="ReminderList" component={ReminderScreen} />
    </Stack.Navigator>
  );
};

export default SettingNavigation;
