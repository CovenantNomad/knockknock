import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
}

const SectionContainer = ({ children }: ContainerProps) => {
  return (
    <View style={styles.container}>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default SectionContainer;
