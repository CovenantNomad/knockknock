import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './RootNavigation/RootNavigation';

const RootScreen = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default RootScreen;
