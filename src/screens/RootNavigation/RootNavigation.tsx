import React, { useCallback, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigations/navigationTypes';

import SignInScreen from '../Auth/SignInScreen';
import SignUpScreen from '../Auth/SignUpScreen';
import AuthContext from '@/stores/AuthContext';
import HomeNavigation from '../Apps/Home/HomeNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { userInfo, isSignInLoading, isSignUpLoading } =
    useContext(AuthContext);

  const renderRootStack = useCallback(() => {
    if (userInfo !== null && !isSignInLoading && !isSignUpLoading) {
      return <Stack.Screen name="App" component={HomeNavigation} />;
    }

    return (
      <Stack.Group>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Group>
    );
  }, [userInfo, isSignUpLoading, isSignInLoading]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {renderRootStack()}
    </Stack.Navigator>
  );
};

export default RootNavigation;
