import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface ScrollViewContainerProps {
  children: React.ReactNode;
}

const ScrollViewContainer = ({ children }: ScrollViewContainerProps) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
