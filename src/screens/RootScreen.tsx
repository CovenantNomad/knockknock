import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from '@/stores/AuthContext';
import RootNavigation from './RootNavigation/RootNavigation';
import SplashScreen from './SplashScreen';

const RootScreen = () => {
  const { initialized } = useContext(AuthContext);

  if (!initialized) {
    <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default RootScreen;
