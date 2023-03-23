import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OpenColor from 'open-color';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: OpenColor.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default AuthLayout;
