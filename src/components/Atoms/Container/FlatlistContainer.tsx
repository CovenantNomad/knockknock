import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface FlatlistContainerProps {
  children: React.ReactNode;
}

const FlatlistContainer = ({ children }: FlatlistContainerProps) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default FlatlistContainer;
