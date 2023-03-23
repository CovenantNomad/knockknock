import Button from '@/components/Atoms/Button';
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import AuthContext from '@/stores/AuthContext';
import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  const { signOut } = useContext(AuthContext);
  return (
    <AppLayout>
      <Button label="로그아웃" onPress={signOut} />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default HomeScreen;
