import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackParamList } from '@/types/navigations/navigationTypes';
import HomeNavigation from './Home/HomeNavigation';
// import WorshipScreen from './Worship';
// import BibleScreen from './Bible';
// import PrayerScreen from './Prayer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RouteProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigation} />
      {/* <Tab.Screen name="Worship" component={WorshipScreen} />
      <Tab.Screen name="Bible" component={BibleScreen} />
      <Tab.Screen name="Prayer" component={PrayerScreen} /> */}
    </Tab.Navigator>
  );
};

export default AppNavigation;
