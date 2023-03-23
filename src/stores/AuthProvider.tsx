import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import AuthContext from './AuthContext';
import { LoginFormType, User } from '@/types/auth/auth';
import { COLLCTION } from '@/types/firebase/firebase';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const signIn = useCallback(async ({ email, password }: LoginFormType) => {
    try {
      setIsSignInLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: '가입 된 유저가 없습니다',
          visibilityTime: 2000,
        });
      }

      if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: '잘못된 이메일 형식입니다',
          visibilityTime: 2000,
        });
      }

      if (error.code === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: '비밀번호가 틀렸습니다',
          visibilityTime: 2000,
        });
      }
    } finally {
      setIsSignInLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error: any) {
      console.log('@signOut: ', error);
      Alert.alert(error);
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      try {
        const { user: currentUser } =
          await auth().createUserWithEmailAndPassword(email, password);
        await currentUser.updateProfile({ displayName: username });
        await firestore().collection(COLLCTION.USERS).doc(currentUser.uid).set({
          userId: currentUser.uid,
          email,
          username,
        });
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: '같은 이메일이 있습니다',
            visibilityTime: 2000,
          });
        }

        if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: '잘못된 이메일 형식입니다',
            visibilityTime: 2000,
          });
        }

        if (error.code === 'auth/operation-not-allowed') {
          Toast.show({
            type: 'error',
            text1: '잘못된 접근입니다',
            visibilityTime: 2000,
          });
        }
      }
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async fbUser => {
      if (fbUser !== null) {
        setUserInfo({
          uid: fbUser.uid,
          email: fbUser.email ?? '',
          username: fbUser.displayName ?? '',
          profileUrl: fbUser.photoURL ?? '',
        });
      } else {
        setUserInfo(null);
      }
      SplashScreen.hide();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    return {
      userInfo,
      isSignInLoading,
      isSignUpLoading,
      setUserInfo,
      setIsSignUpLoading,
      signIn,
      signOut,
      signUp,
    };
  }, [userInfo, isSignInLoading, isSignUpLoading, signIn, signOut, signUp]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
