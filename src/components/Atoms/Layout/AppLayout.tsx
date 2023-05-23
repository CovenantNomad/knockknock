import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const AppLayout = ({ children, backgroundColor }: AppLayoutProps) => {
  return (
    <SafeAreaView
      style={[styles.layout, { backgroundColor: backgroundColor }]}
      edges={['top', 'right', 'left']}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    position: 'relative',
  },
});

export default AppLayout;
