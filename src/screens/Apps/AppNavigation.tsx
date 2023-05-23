import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackParamList } from '@/types/navigations/navigationTypes';
import HomeNavigation from './Home/HomeNavigation';
// import WorshipScreen from './Worship';
// import BibleScreen from './Bible';
// import PrayerScreen from './Prayer';
import SettingNavigation from './Setting/SettingNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OpenColor from 'open-color';

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: OpenColor.blue[6],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen name="Worship" component={WorshipScreen} />
      <Tab.Screen name="Bible" component={BibleScreen} />
      <Tab.Screen name="Prayer" component={PrayerScreen} /> */}
      <Tab.Screen
        name="Setting"
        component={SettingNavigation}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
