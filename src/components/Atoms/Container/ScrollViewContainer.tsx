import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';

interface ScrollViewContainerProps {
  children: React.ReactNode;
}

const ScrollViewContainer = ({ children }: ScrollViewContainerProps) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={[styles.container, { paddingBottom: tabBarHeight }]}
      showsVerticalScrollIndicator={false}
      overScrollMode='always'
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default ScrollViewContainer;
